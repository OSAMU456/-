# Google Cloud Platform デプロイガイド / GCP Deployment Guide

このガイドでは、Content PaletteアプリケーションをGoogle Cloud Platform (GCP) にデプロイする方法を説明します。

This guide explains how to deploy the Content Palette application to Google Cloud Platform (GCP).

## 前提条件 / Prerequisites

1. **Google Cloudアカウント** / Google Cloud Account
   - [Google Cloud Console](https://console.cloud.google.com/) にアクセスできること
   - 請求先アカウントが設定されていること（無料枠もあります）

2. **必要なツール** / Required Tools
   - [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs/install)
   - Node.js 20.x 以降
   - Git

## デプロイ方法 / Deployment Methods

### オプション1: Google App Engine（推奨）/ Option 1: Google App Engine (Recommended)

Google App Engineは完全マネージド型のサーバーレスプラットフォームで、自動スケーリングとメンテナンスフリーです。

#### ステップ1: プロジェクトのセットアップ / Step 1: Project Setup

```bash
# Google Cloud SDKのインストール確認
gcloud --version

# Google Cloudにログイン
gcloud auth login

# 新しいプロジェクトを作成（または既存のプロジェクトを選択）
gcloud projects create content-palette-prod --name="Content Palette"

# プロジェクトを設定
gcloud config set project content-palette-prod

# App Engineアプリケーションを初期化
gcloud app create --region=asia-northeast1
```

#### ステップ2: 環境変数の設定 / Step 2: Environment Variables Setup

Google Cloud Consoleで環境変数を設定します：

1. [Secret Manager](https://console.cloud.google.com/security/secret-manager) にアクセス
2. 以下のシークレットを作成：

```bash
# NEXTAUTH_SECRET の生成
openssl rand -base64 32

# Secret Managerにシークレットを追加
echo -n "YOUR_NEXTAUTH_SECRET" | gcloud secrets create NEXTAUTH_SECRET --data-file=-
echo -n "YOUR_GOOGLE_CLIENT_ID" | gcloud secrets create GOOGLE_CLIENT_ID --data-file=-
echo -n "YOUR_GOOGLE_CLIENT_SECRET" | gcloud secrets create GOOGLE_CLIENT_SECRET --data-file=-
echo -n "YOUR_INSTAGRAM_APP_ID" | gcloud secrets create INSTAGRAM_APP_ID --data-file=-
echo -n "YOUR_INSTAGRAM_APP_SECRET" | gcloud secrets create INSTAGRAM_APP_SECRET --data-file=-
```

#### ステップ3: app.yamlの更新 / Step 3: Update app.yaml

プロジェクトに含まれている `app.yaml` ファイルを確認し、必要に応じて更新します。

#### ステップ4: デプロイ / Step 4: Deploy

```bash
# 依存関係をインストール
npm install

# プロダクションビルド
npm run build

# Google App Engineにデプロイ
gcloud app deploy

# デプロイされたアプリケーションを開く
gcloud app browse
```

### オプション2: Cloud Run（コンテナベース）/ Option 2: Cloud Run (Container-based)

Cloud Runはコンテナ化されたアプリケーションを実行するサーバーレスプラットフォームです。

#### ステップ1: Dockerfileの作成 / Step 1: Create Dockerfile

プロジェクトに `Dockerfile` が含まれています。

#### ステップ2: Container Registryへのプッシュ / Step 2: Push to Container Registry

```bash
# Artifact Registryを有効化
gcloud services enable artifactregistry.googleapis.com

# リポジトリを作成
gcloud artifacts repositories create content-palette \
  --repository-format=docker \
  --location=asia-northeast1 \
  --description="Content Palette container images"

# Docker認証の設定
gcloud auth configure-docker asia-northeast1-docker.pkg.dev

# イメージをビルド
docker build -t asia-northeast1-docker.pkg.dev/content-palette-prod/content-palette/app:latest .

# イメージをプッシュ
docker push asia-northeast1-docker.pkg.dev/content-palette-prod/content-palette/app:latest
```

#### ステップ3: Cloud Runにデプロイ / Step 3: Deploy to Cloud Run

```bash
gcloud run deploy content-palette \
  --image asia-northeast1-docker.pkg.dev/content-palette-prod/content-palette/app:latest \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --set-env-vars NEXTAUTH_URL=https://YOUR_CLOUD_RUN_URL \
  --set-secrets NEXTAUTH_SECRET=NEXTAUTH_SECRET:latest,GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID:latest,GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET:latest
```

### オプション3: Cloud Functions（サーバーレス関数）/ Option 3: Cloud Functions

小規模な展開やAPIエンドポイントのみの場合に適しています。

## データベースの設定 / Database Setup

### Cloud SQL（PostgreSQL推奨）/ Cloud SQL (PostgreSQL Recommended)

```bash
# Cloud SQLインスタンスを作成
gcloud sql instances create content-palette-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-northeast1

# データベースを作成
gcloud sql databases create contentpalette --instance=content-palette-db

# データベースユーザーを作成
gcloud sql users create dbuser \
  --instance=content-palette-db \
  --password=SECURE_PASSWORD
```

### Prismaの設定 / Prisma Configuration

`.env.production` ファイルを作成：

```env
DATABASE_URL="postgresql://dbuser:SECURE_PASSWORD@/contentpalette?host=/cloudsql/content-palette-prod:asia-northeast1:content-palette-db"
```

## APIの設定 / API Configuration

### Google OAuth 2.0

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) にアクセス
2. 認証情報を作成 → OAuth 2.0 クライアントID
3. アプリケーションの種類: ウェブアプリケーション
4. 承認済みのリダイレクトURI: 
   - `https://YOUR_APP_URL/api/auth/callback/google`
5. クライアントIDとシークレットをSecret Managerに保存

### Instagram Graph API

1. [Meta for Developers](https://developers.facebook.com/) にアクセス
2. アプリを作成
3. Instagram Graph APIを追加
4. アクセストークンを取得してSecret Managerに保存

### Threads API

1. Metaの開発者アカウントでThreads APIアクセスを申請
2. アクセストークンを取得
3. Secret Managerに保存

## セキュリティ設定 / Security Configuration

### ファイアウォールルール / Firewall Rules

```bash
# App Engineのファイアウォールルールを設定
gcloud app firewall-rules create 0 \
  --action allow \
  --source-range "*" \
  --priority 100
```

### IAMの設定 / IAM Configuration

```bash
# サービスアカウントを作成
gcloud iam service-accounts create content-palette-sa \
  --display-name="Content Palette Service Account"

# 必要な権限を付与
gcloud projects add-iam-policy-binding content-palette-prod \
  --member="serviceAccount:content-palette-sa@content-palette-prod.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"
```

## モニタリング / Monitoring

### Cloud Loggingの設定 / Cloud Logging Setup

```bash
# ログを確認
gcloud app logs tail -s default

# または Cloud Consoleで確認
# https://console.cloud.google.com/logs
```

### Cloud Monitoringの設定 / Cloud Monitoring Setup

1. [Cloud Monitoring](https://console.cloud.google.com/monitoring) にアクセス
2. アラートポリシーを設定
3. 稼働時間チェックを設定

## コスト最適化 / Cost Optimization

### 無料枠の活用 / Free Tier Usage

- App Engine: 28時間/日の無料インスタンス時間
- Cloud SQL: db-f1-microインスタンスは制限付き無料
- Cloud Run: 月2百万リクエスト無料
- Cloud Storage: 5GBの標準ストレージ無料

### 推奨設定 / Recommended Settings

```yaml
# app.yaml での自動スケーリング設定
automatic_scaling:
  min_idle_instances: 0  # コスト削減のため0に設定
  max_idle_instances: 1
  min_pending_latency: 30ms
  max_pending_latency: automatic
```

## トラブルシューティング / Troubleshooting

### よくある問題 / Common Issues

1. **デプロイエラー**
   ```bash
   # ログを確認
   gcloud app logs read
   ```

2. **データベース接続エラー**
   - Cloud SQLインスタンスが実行中か確認
   - 接続文字列が正しいか確認

3. **環境変数が読み込まれない**
   - Secret Managerの権限を確認
   - app.yamlの設定を確認

## サポート / Support

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

## 自動デプロイ（CI/CD）/ Automated Deployment (CI/CD)

GitHub Actionsを使用した自動デプロイは `.github/workflows/deploy.yml` を参照してください。

---

## 概算コスト / Estimated Costs

**小規模運用（月間10,000リクエスト）**
- App Engine: $0-5/月
- Cloud SQL (db-f1-micro): $0-7/月
- Secret Manager: $0.06/月
- **合計: 約$7-12/月**

**中規模運用（月間100,000リクエスト）**
- App Engine: $20-50/月
- Cloud SQL (db-g1-small): $25/月
- その他サービス: $5/月
- **合計: 約$50-80/月**

無料枠を活用することで、初期は$10以下で運用可能です。
