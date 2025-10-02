# デプロイメント手順書

## 🚀 Google Cloud Platform へのデプロイ

このプロジェクトをGCPにデプロイする手順を説明します。

## 前提条件

- Google Cloud Platform アカウント
- 課金が有効化されたGCPプロジェクト
- GitHubリポジトリ

## 📝 ステップ 1: GCP プロジェクトの準備

### 1.1 GCP コンソールでプロジェクトを作成

```bash
# ブラウザでGCPコンソールを開く
https://console.cloud.google.com

# 新しいプロジェクトを作成
プロジェクト名: meiliyuyue-prod
プロジェクトID: meiliyuyue-prod (または利用可能なID)
```

### 1.2 課金を有効化

1. GCPコンソール > 「お支払い」
2. 課金アカウントをプロジェクトにリンク

### 1.3 必要なAPIを有効化

GCPコンソールで以下のAPIを有効化:
- Cloud Run API
- Cloud Build API
- Container Registry API
- Secret Manager API
- Cloud SQL Admin API

または、Cloud Shellで:
```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  containerregistry.googleapis.com \
  secretmanager.googleapis.com \
  sqladmin.googleapis.com
```

## 📝 ステップ 2: GitHub Secretsの設定

### 2.1 サービスアカウントの作成

```bash
# Cloud Shellで実行
PROJECT_ID="your-project-id"

# サービスアカウント作成
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions"

# 必要な権限を付与
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# サービスアカウントキーを作成
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com

# key.jsonの内容を表示（これをGitHub Secretsにコピー）
cat key.json
```

### 2.2 GitHub Secretsを設定

GitHubリポジトリの Settings > Secrets and variables > Actions で以下を追加:

- `GCP_PROJECT_ID`: GCPプロジェクトID
- `GCP_SA_KEY`: サービスアカウントキーの内容（key.jsonの全内容）

## 📝 ステップ 3: Cloud SQL のセットアップ（オプション）

データベースが必要な場合:

```bash
# Cloud SQL インスタンス作成
gcloud sql instances create meiliyuyue-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-northeast1

# データベース作成
gcloud sql databases create meiliyuyue_prod \
  --instance=meiliyuyue-db

# ユーザー作成
gcloud sql users create meiliyuyue_user \
  --instance=meiliyuyue-db \
  --password=YOUR_SECURE_PASSWORD

# 接続名を取得
gcloud sql instances describe meiliyuyue-db \
  --format="value(connectionName)"
```

## 📝 ステップ 4: Secret Manager に環境変数を保存

```bash
# データベースURL
echo -n "postgresql://username:password@/dbname?host=/cloudsql/PROJECT_ID:REGION:INSTANCE" | \
  gcloud secrets create DATABASE_URL --data-file=-

# NextAuth Secret
echo -n "$(openssl rand -base64 32)" | \
  gcloud secrets create NEXTAUTH_SECRET --data-file=-

# NextAuth URL
echo -n "https://your-domain.com" | \
  gcloud secrets create NEXTAUTH_URL --data-file=-
```

## 📝 ステップ 5: 手動デプロイ（初回）

### オプション A: Cloud Build を使用

```bash
# ローカルまたはCloud Shellで実行
gcloud builds submit --config=cloudbuild.yaml
```

### オプション B: Docker + Cloud Run を使用

```bash
# Dockerイメージをビルド
docker build -t gcr.io/PROJECT_ID/meiliyuyue-app .

# Container Registryにプッシュ
docker push gcr.io/PROJECT_ID/meiliyuyue-app

# Cloud Runにデプロイ
gcloud run deploy meiliyuyue-app \
  --image gcr.io/PROJECT_ID/meiliyuyue-app \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 2Gi \
  --cpu 2 \
  --min-instances 1 \
  --max-instances 10
```

## 📝 ステップ 6: GitHub Actions での自動デプロイ

GitHub Secretsが設定されていれば、`main`ブランチへのプッシュで自動デプロイされます。

```bash
git add .
git commit -m "Deploy to GCP"
git push origin main
```

GitHub Actions の実行状況を確認:
- リポジトリ > Actions タブ

## 📝 ステップ 7: カスタムドメインの設定（オプション）

```bash
# ドメインをマッピング
gcloud run domain-mappings create \
  --service meiliyuyue-app \
  --domain meiliyuyue.com \
  --region asia-northeast1

# 表示されたDNSレコードをドメインプロバイダーに設定
```

## 🔍 デプロイ後の確認

### サービスURLの確認

```bash
gcloud run services describe meiliyuyue-app \
  --region asia-northeast1 \
  --format="value(status.url)"
```

### ログの確認

```bash
# エラーログを確認
gcloud logging read "resource.type=cloud_run_revision AND severity>=ERROR" \
  --limit 20 \
  --format="table(timestamp,severity,textPayload)"

# 全ログを確認
gcloud logging read "resource.type=cloud_run_revision" \
  --limit 50
```

### アプリケーションの動作確認

ブラウザでサービスURLを開いて、以下を確認:
- [ ] トップページが表示される
- [ ] 検索ページが動作する
- [ ] 美容室詳細ページが表示される
- [ ] 管理者ページが動作する
- [ ] レスポンシブデザインが正しく動作する

## 🔄 更新のデプロイ

コードを更新してデプロイする場合:

```bash
# 変更をコミット
git add .
git commit -m "Update: 新機能追加"

# mainブランチにプッシュ（自動デプロイ）
git push origin main
```

または手動でデプロイ:

```bash
gcloud builds submit --config=cloudbuild.yaml
```

## 📊 モニタリング

### Cloud Console でモニタリング

1. GCP Console > Cloud Run
2. サービスを選択
3. 「メトリクス」タブで確認:
   - リクエスト数
   - レイテンシ
   - エラー率
   - インスタンス数

### アラート設定

```bash
# エラー率が5%を超えたらアラート
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="High Error Rate" \
  --condition-threshold-value=0.05
```

## 💰 コスト管理

### 予算アラート設定

```bash
gcloud billing budgets create \
  --billing-account=BILLING_ACCOUNT_ID \
  --display-name="Monthly Budget" \
  --budget-amount=10000JPY \
  --threshold-rule=percent=80
```

### コスト確認

GCP Console > お支払い > レポート

## 🐛 トラブルシューティング

### デプロイが失敗する場合

```bash
# ビルドログを確認
gcloud builds list --limit=5
gcloud builds log BUILD_ID
```

### アプリケーションが起動しない場合

```bash
# Cloud Runのログを確認
gcloud logging read "resource.type=cloud_run_revision" \
  --limit 100 \
  --format="table(timestamp,severity,textPayload)"
```

### 503 エラーが発生する場合

- Cold startの問題: `--min-instances=1` を設定
- メモリ不足: `--memory=2Gi` に増やす
- タイムアウト: `--timeout=300` を設定

## 📚 参考リンク

- [Cloud Run ドキュメント](https://cloud.google.com/run/docs)
- [Cloud Build ドキュメント](https://cloud.google.com/build/docs)
- [Secret Manager](https://cloud.google.com/secret-manager/docs)
- [Next.js デプロイメント](https://nextjs.org/docs/deployment)

## ✅ チェックリスト

デプロイ前に確認:
- [ ] GCPプロジェクト作成完了
- [ ] 課金有効化
- [ ] 必要なAPI有効化
- [ ] サービスアカウント作成
- [ ] GitHub Secrets設定
- [ ] `cloudbuild.yaml` 確認
- [ ] `Dockerfile` 確認
- [ ] 環境変数設定（Secret Manager）
- [ ] ローカルでビルド成功確認

デプロイ後に確認:
- [ ] サービスURLでアクセス可能
- [ ] すべてのページが表示される
- [ ] エラーログを確認
- [ ] パフォーマンステスト
- [ ] モバイル表示確認
- [ ] カスタムドメイン設定（必要な場合）
- [ ] モニタリング設定
- [ ] バックアップ設定

---

## 🎉 デプロイ完了！

問題がなければ、アプリケーションは以下のURLでアクセス可能です:
- https://meiliyuyue-app-[random].run.app

次のステップ:
1. カスタムドメインの設定
2. Cloud CDNの有効化
3. データベースマイグレーション
4. 本番データの投入
5. パフォーマンスチューニング
