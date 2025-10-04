# Google Cloud Platform デプロイメントガイド

## 概要

このドキュメントは、美丽预约（Meiliyuyue）アプリケーションをGoogle Cloud Platform（GCP）にデプロイする手順を説明します。

## アーキテクチャ

### 使用するGCPサービス

1. **Cloud Run** - Next.jsアプリケーションのホスティング
2. **Cloud SQL (PostgreSQL)** - データベース
3. **Cloud Storage** - 静的アセット（画像、CSS、JSなど）
4. **Cloud CDN** - コンテンツ配信ネットワーク
5. **Cloud Build** - CI/CDパイプライン
6. **Secret Manager** - 機密情報の管理
7. **Container Registry** - Dockerイメージの保存

### リージョン設定

- **推奨リージョン**: `asia-northeast1` (東京)
  - 福岡に最も近い
  - 中国からのアクセスも考慮
- **代替リージョン**: `asia-northeast2` (大阪)

## 前提条件

1. Google Cloud Platformアカウント
2. gcloud CLIのインストール
3. Terraformのインストール（インフラストラクチャ管理用）
4. Dockerのインストール（ローカルテスト用）

## セットアップ手順

### 1. GCPプロジェクトの作成

```bash
# gcloud CLIでログイン
gcloud auth login

# 新しいプロジェクトを作成
gcloud projects create meiliyuyue-prod --name="美丽预约 Production"

# プロジェクトを設定
gcloud config set project meiliyuyue-prod

# 課金アカウントを有効化（必須）
gcloud beta billing projects link meiliyuyue-prod --billing-account=YOUR_BILLING_ACCOUNT_ID
```

### 2. 必要なAPIの有効化

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  containerregistry.googleapis.com \
  sqladmin.googleapis.com \
  compute.googleapis.com \
  dns.googleapis.com \
  storage.googleapis.com \
  secretmanager.googleapis.com
```

### 3. Terraformでインフラストラクチャを構築

```bash
cd terraform

# terraform.tfvarsファイルを作成
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvarsを編集してプロジェクトIDなどを設定

# Terraform初期化
terraform init

# インフラストラクチャプラン確認
terraform plan

# インフラストラクチャ構築
terraform apply
```

### 4. 環境変数の設定

```bash
# Secret Managerに環境変数を追加
gcloud secrets create DATABASE_URL --data-file=- <<EOF
postgresql://username:password@/dbname?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME
EOF

gcloud secrets create NEXTAUTH_SECRET --data-file=- <<EOF
$(openssl rand -base64 32)
EOF

gcloud secrets create NEXTAUTH_URL --data-file=- <<EOF
https://meiliyuyue.com
EOF
```

### 5. Cloud Buildでデプロイ

```bash
# Cloud Buildトリガーを作成（GitHubリポジトリと連携）
gcloud builds submit --config=cloudbuild.yaml .

# または、手動でビルド＆デプロイ
gcloud builds submit --tag gcr.io/PROJECT_ID/meiliyuyue-app
gcloud run deploy meiliyuyue-app \
  --image gcr.io/PROJECT_ID/meiliyuyue-app \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated
```

### 6. カスタムドメインの設定

```bash
# Cloud Runサービスにカスタムドメインをマッピング
gcloud run domain-mappings create \
  --service meiliyuyue-app \
  --domain meiliyuyue.com \
  --region asia-northeast1

# DNSレコードを設定（Cloud DNSまたは外部DNSプロバイダー）
# 表示されたCNAMEレコードをDNS設定に追加
```

## デプロイオプション

### オプション1: Cloud Run（推奨）

**メリット:**
- サーバーレス（自動スケーリング）
- 使用した分だけ課金
- 管理が簡単
- コールドスタート対策（min-instances設定）

**コスト見積もり:**
- 小規模: $20-50/月
- 中規模: $100-300/月
- 大規模: $500-1,000/月

### オプション2: App Engine

```bash
# App Engineでデプロイ
gcloud app deploy app.yaml
```

**メリット:**
- 完全マネージド
- 自動スケーリング
- 簡単なデプロイ

### オプション3: Google Kubernetes Engine (GKE)

大規模運用向け（トラフィックが非常に多い場合）

## データベース設定

### Cloud SQL接続

```bash
# Cloud SQL Proxyを使用してローカルから接続
cloud_sql_proxy -instances=PROJECT_ID:REGION:INSTANCE_NAME=tcp:5432

# データベースマイグレーション実行
npm run db:migrate
npm run db:seed
```

### バックアップ設定

- 自動バックアップ: 毎日3:00 JST
- Point-in-time recovery: 有効
- バックアップ保持期間: 30日

## CDN設定

### Cloud Storage + Cloud CDN

```bash
# 静的アセットをCloud Storageにアップロード
gsutil -m rsync -r public/ gs://meiliyuyue-static-assets/

# バケットを公開設定
gsutil iam ch allUsers:objectViewer gs://meiliyuyue-static-assets
```

### Next.js設定

`next.config.ts`でCDNパスを設定:

```typescript
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.meiliyuyue.com' 
    : '',
  images: {
    domains: ['storage.googleapis.com', 'cdn.meiliyuyue.com'],
  },
};
```

## モニタリング＆ログ

### Cloud Logging

```bash
# ログを確認
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=meiliyuyue-app" --limit 50
```

### Cloud Monitoring

```bash
# アラートポリシーを作成
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="High Error Rate" \
  --condition-display-name="Error rate > 5%" \
  --condition-threshold-value=0.05
```

## セキュリティ

### IAM設定

```bash
# Cloud Runサービスアカウントに権限付与
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SERVICE_ACCOUNT@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

### SSL/TLS証明書

Cloud Runは自動的にSSL証明書を発行・更新します。

### ファイアウォール

Cloud Armorを使用してDDoS攻撃から保護:

```bash
# セキュリティポリシーを作成
gcloud compute security-policies create meiliyuyue-security-policy \
  --description="Security policy for Meiliyuyue"

# ルールを追加（中国からのアクセスを許可）
gcloud compute security-policies rules create 1000 \
  --security-policy=meiliyuyue-security-policy \
  --expression="origin.region_code == 'CN' || origin.region_code == 'JP'" \
  --action=allow
```

## パフォーマンス最適化

### 1. Cloud CDN設定

- Cache-Control ヘッダーの最適化
- Gzip/Brotli圧縮の有効化
- HTTP/2、HTTP/3の有効化

### 2. データベース最適化

- Connection pooling
- Read replicaの使用（大規模時）
- インデックスの最適化

### 3. 画像最適化

- Next.js Image Optimizationの使用
- WebPフォーマットの使用
- Cloud Storageでの自動リサイズ

## コスト管理

### 予算アラート設定

```bash
# 予算を設定
gcloud billing budgets create \
  --billing-account=BILLING_ACCOUNT_ID \
  --display-name="Meiliyuyue Monthly Budget" \
  --budget-amount=500USD \
  --threshold-rule=percent=50 \
  --threshold-rule=percent=80 \
  --threshold-rule=percent=100
```

### コスト見積もり（月額）

**小規模（〜1,000ユーザー/日）**
- Cloud Run: $30
- Cloud SQL: $50
- Cloud Storage + CDN: $20
- **合計: 約 $100/月**

**中規模（〜10,000ユーザー/日）**
- Cloud Run: $150
- Cloud SQL: $150
- Cloud Storage + CDN: $100
- **合計: 約 $400/月**

**大規模（〜100,000ユーザー/日）**
- Cloud Run: $800
- Cloud SQL: $500
- Cloud Storage + CDN: $500
- **合計: 約 $1,800/月**

## トラブルシューティング

### よくある問題

1. **Cold Start問題**
   - Solution: `--min-instances=1`を設定

2. **データベース接続エラー**
   - Solution: Cloud SQL Proxyの確認、IAM権限の確認

3. **画像が表示されない**
   - Solution: CORS設定、Cloud Storageの権限確認

### ログ確認コマンド

```bash
# エラーログのみ表示
gcloud logging read "resource.type=cloud_run_revision AND severity>=ERROR" --limit 20

# 特定の時間範囲のログ
gcloud logging read "resource.type=cloud_run_revision" --limit 50 \
  --format="table(timestamp, severity, textPayload)"
```

## CI/CDパイプライン

GitHub ActionsまたはCloud Buildを使用した自動デプロイ:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GCP
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: google-github-actions/setup-gcloud@v0
      - run: gcloud builds submit --config=cloudbuild.yaml
```

## サポート

問題が発生した場合:
1. ログを確認: `gcloud logging read`
2. Cloud Console でサービスの状態確認
3. GCP サポートに問い合わせ

## 参考リンク

- [Cloud Run ドキュメント](https://cloud.google.com/run/docs)
- [Cloud SQL ドキュメント](https://cloud.google.com/sql/docs)
- [Next.js デプロイメントガイド](https://nextjs.org/docs/deployment)
