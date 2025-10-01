# デプロイチェックリスト / Deployment Checklist

このチェックリストは、Content Paletteアプリケーションを本番環境にデプロイするための手順を示します。

This checklist provides step-by-step instructions for deploying the Content Palette application to production.

---

## 📋 デプロイ前の準備 / Pre-Deployment Preparation

### ✅ 1. 開発環境の確認 / Development Environment Verification

- [ ] Node.js 20.x 以降がインストールされている / Node.js 20.x or later is installed
  ```bash
  node --version
  ```

- [ ] Google Cloud SDK (gcloud CLI) がインストールされている / Google Cloud SDK is installed
  ```bash
  gcloud --version
  ```

- [ ] Git がインストールされている / Git is installed
  ```bash
  git --version
  ```

### ✅ 2. ローカルビルドの確認 / Local Build Verification

- [ ] 依存関係をインストール / Install dependencies
  ```bash
  npm install
  ```

- [ ] リント検査が通る / Linting passes
  ```bash
  npm run lint
  ```

- [ ] ビルドが成功する / Build succeeds
  ```bash
  npm run build
  ```

- [ ] ローカルでアプリケーションが起動する / Application starts locally
  ```bash
  npm run dev
  # Open http://localhost:3000
  ```

---

## 🔐 Google Cloud のセットアップ / Google Cloud Setup

### ✅ 3. Google Cloud プロジェクトの作成 / Create Google Cloud Project

- [ ] Google Cloudアカウントにログイン / Login to Google Cloud account
  ```bash
  gcloud auth login
  ```

- [ ] 新しいプロジェクトを作成 / Create new project
  ```bash
  gcloud projects create content-palette-prod --name="Content Palette"
  ```

- [ ] プロジェクトを設定 / Set project
  ```bash
  gcloud config set project content-palette-prod
  ```

- [ ] 請求アカウントを有効化 / Enable billing
  - [Google Cloud Console](https://console.cloud.google.com/) にアクセス
  - プロジェクトの請求設定を確認
  - 無料枠を活用可能 / Free tier available

### ✅ 4. 必要なAPIの有効化 / Enable Required APIs

- [ ] 必要なAPIを有効化 / Enable necessary APIs
  ```bash
  gcloud services enable appengine.googleapis.com
  gcloud services enable cloudbuild.googleapis.com
  gcloud services enable secretmanager.googleapis.com
  gcloud services enable sqladmin.googleapis.com
  ```

---

## 🔑 API認証情報の設定 / API Credentials Setup

### ✅ 5. Google OAuth 2.0 の設定 / Google OAuth 2.0 Setup

- [ ] [Google Cloud Console](https://console.cloud.google.com/apis/credentials) で認証情報を作成
  - 認証情報を作成 → OAuth 2.0 クライアントID
  - アプリケーションの種類: ウェブアプリケーション
  - 承認済みのリダイレクトURI: `https://YOUR_APP_URL/api/auth/callback/google`

- [ ] クライアントIDとシークレットを記録 / Record client ID and secret

### ✅ 6. Instagram Graph API の設定 / Instagram Graph API Setup

- [ ] [Meta for Developers](https://developers.facebook.com/) でアプリを作成
- [ ] Instagram Graph APIを追加
- [ ] アクセストークンを取得
- [ ] App IDとApp Secretを記録

### ✅ 7. Threads API の設定 / Threads API Setup

- [ ] Metaの開発者アカウントでThreads APIアクセスを申請
- [ ] アクセストークンを取得
- [ ] App IDとApp Secretを記録

---

## 🔒 シークレットの設定 / Secret Configuration

### ✅ 8. Secret Manager にシークレットを追加 / Add Secrets to Secret Manager

- [ ] NEXTAUTH_SECRET を生成して追加 / Generate and add NEXTAUTH_SECRET
  ```bash
  openssl rand -base64 32
  echo -n "YOUR_GENERATED_SECRET" | gcloud secrets create NEXTAUTH_SECRET --data-file=-
  ```

- [ ] Google OAuth 認証情報を追加 / Add Google OAuth credentials
  ```bash
  echo -n "YOUR_GOOGLE_CLIENT_ID" | gcloud secrets create GOOGLE_CLIENT_ID --data-file=-
  echo -n "YOUR_GOOGLE_CLIENT_SECRET" | gcloud secrets create GOOGLE_CLIENT_SECRET --data-file=-
  ```

- [ ] Instagram API 認証情報を追加 / Add Instagram API credentials
  ```bash
  echo -n "YOUR_INSTAGRAM_APP_ID" | gcloud secrets create INSTAGRAM_APP_ID --data-file=-
  echo -n "YOUR_INSTAGRAM_APP_SECRET" | gcloud secrets create INSTAGRAM_APP_SECRET --data-file=-
  ```

- [ ] Threads API 認証情報を追加 / Add Threads API credentials
  ```bash
  echo -n "YOUR_THREADS_APP_ID" | gcloud secrets create THREADS_APP_ID --data-file=-
  echo -n "YOUR_THREADS_APP_SECRET" | gcloud secrets create THREADS_APP_SECRET --data-file=-
  ```

- [ ] Secret Manager の権限を確認 / Verify Secret Manager permissions
  ```bash
  gcloud secrets list
  ```

---

## 🗄️ データベースのセットアップ / Database Setup (Optional)

### ✅ 9. Cloud SQL インスタンスの作成 / Create Cloud SQL Instance

本番環境で PostgreSQL を使用する場合 / If using PostgreSQL in production:

- [ ] Cloud SQL インスタンスを作成 / Create Cloud SQL instance
  ```bash
  gcloud sql instances create content-palette-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=asia-northeast1
  ```

- [ ] データベースを作成 / Create database
  ```bash
  gcloud sql databases create contentpalette --instance=content-palette-db
  ```

- [ ] データベースユーザーを作成 / Create database user
  ```bash
  gcloud sql users create dbuser \
    --instance=content-palette-db \
    --password=SECURE_PASSWORD
  ```

- [ ] データベース接続文字列をSecret Managerに追加 / Add database URL to Secret Manager
  ```bash
  echo -n "postgresql://dbuser:SECURE_PASSWORD@/contentpalette?host=/cloudsql/content-palette-prod:asia-northeast1:content-palette-db" | gcloud secrets create DATABASE_URL --data-file=-
  ```

---

## 🚀 デプロイの実行 / Deployment Execution

### オプション A: Google App Engine へのデプロイ / Deploy to Google App Engine (Recommended)

#### ✅ 10. App Engine の初期化 / Initialize App Engine

- [ ] App Engine アプリケーションを作成 / Create App Engine application
  ```bash
  gcloud app create --region=asia-northeast1
  ```

#### ✅ 11. app.yaml の確認 / Verify app.yaml

- [ ] `app.yaml` ファイルの内容を確認 / Verify app.yaml content
  - ランタイム設定: `runtime: nodejs20`
  - インスタンスクラス: `instance_class: F2`
  - 自動スケーリング設定が適切か確認

#### ✅ 12. デプロイの実行 / Execute Deployment

- [ ] アプリケーションをデプロイ / Deploy application
  ```bash
  gcloud app deploy
  ```

- [ ] デプロイ完了を確認 / Verify deployment completion
  ```bash
  gcloud app browse
  ```

---

### オプション B: Cloud Run へのデプロイ / Deploy to Cloud Run

#### ✅ 13. Artifact Registry の設定 / Setup Artifact Registry

- [ ] Artifact Registry API を有効化 / Enable Artifact Registry API
  ```bash
  gcloud services enable artifactregistry.googleapis.com
  ```

- [ ] リポジトリを作成 / Create repository
  ```bash
  gcloud artifacts repositories create content-palette \
    --repository-format=docker \
    --location=asia-northeast1 \
    --description="Content Palette container images"
  ```

- [ ] Docker 認証を設定 / Configure Docker authentication
  ```bash
  gcloud auth configure-docker asia-northeast1-docker.pkg.dev
  ```

#### ✅ 14. Docker イメージのビルドとプッシュ / Build and Push Docker Image

- [ ] Docker イメージをビルド / Build Docker image
  ```bash
  docker build -t asia-northeast1-docker.pkg.dev/content-palette-prod/content-palette/app:latest .
  ```

- [ ] イメージをプッシュ / Push image
  ```bash
  docker push asia-northeast1-docker.pkg.dev/content-palette-prod/content-palette/app:latest
  ```

#### ✅ 15. Cloud Run にデプロイ / Deploy to Cloud Run

- [ ] Cloud Run にデプロイ / Deploy to Cloud Run
  ```bash
  gcloud run deploy content-palette \
    --image asia-northeast1-docker.pkg.dev/content-palette-prod/content-palette/app:latest \
    --platform managed \
    --region asia-northeast1 \
    --allow-unauthenticated \
    --set-secrets=NEXTAUTH_SECRET=NEXTAUTH_SECRET:latest,GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID:latest,GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET:latest
  ```

- [ ] デプロイされたURLを確認 / Verify deployed URL
  - コンソールに表示されるURLにアクセス

---

## ✅ デプロイ後の確認 / Post-Deployment Verification

### ✅ 16. 動作確認 / Functional Testing

- [ ] アプリケーションにアクセスできる / Application is accessible
  - App Engine: `https://content-palette-prod.appspot.com`
  - Cloud Run: デプロイ時に表示されたURL

- [ ] Google OAuth ログインが動作する / Google OAuth login works
- [ ] Google Sheets 接続が動作する / Google Sheets connection works
- [ ] SNSアカウント連携が動作する / SNS account linking works

### ✅ 17. ログとモニタリング / Logs and Monitoring

- [ ] ログを確認 / Check logs
  ```bash
  # App Engine
  gcloud app logs tail -s default
  
  # Cloud Run
  gcloud run services logs read content-palette --region=asia-northeast1
  ```

- [ ] エラーがないか確認 / Verify no errors

- [ ] [Cloud Monitoring](https://console.cloud.google.com/monitoring) でメトリクスを確認
  - レスポンスタイム
  - エラー率
  - リクエスト数

### ✅ 18. セキュリティ設定 / Security Configuration

- [ ] HTTPSが有効になっている / HTTPS is enabled
- [ ] 環境変数が正しく読み込まれている / Environment variables are loaded correctly
- [ ] APIキーが適切に保護されている / API keys are properly protected

---

## 🔄 継続的インテグレーション / Continuous Integration (Optional)

### ✅ 19. GitHub Actions の設定 / Setup GitHub Actions

- [ ] GitHub リポジトリの Secrets を設定 / Configure GitHub repository secrets
  - `GCP_PROJECT_ID`: Google Cloud プロジェクトID
  - `GCP_SA_KEY`: サービスアカウントキー (JSON形式)

- [ ] `.github/workflows/deploy.yml` を確認 / Verify deploy.yml
  - 自動デプロイが設定されている / Auto-deployment is configured
  - main ブランチへのプッシュ時にデプロイされる

---

## 📊 コストの監視 / Cost Monitoring

### ✅ 20. 予算アラートの設定 / Setup Budget Alerts

- [ ] [請求とコスト管理](https://console.cloud.google.com/billing) で予算を設定
  - 予算額: 例 $20/月
  - アラート閾値: 50%, 90%, 100%
  - 通知先メールアドレスを設定

- [ ] 無料枠の利用状況を確認 / Check free tier usage
  - App Engine: 28時間/日の無料インスタンス時間
  - Cloud SQL: db-f1-microは制限付き無料
  - Cloud Run: 月2百万リクエスト無料

---

## 🎉 デプロイ完了 / Deployment Complete!

すべてのチェックリストが完了したら、アプリケーションは本番環境で稼働しています！

Once all checklist items are complete, your application is running in production!

### 次のステップ / Next Steps

1. **ユーザーテスト** / User Testing
   - 実際のユーザーでテスト
   - フィードバックを収集

2. **パフォーマンス最適化** / Performance Optimization
   - Cloud Monitoring でメトリクスを確認
   - ボトルネックを特定して改善

3. **機能追加** / Feature Development
   - 新しい機能を開発
   - テスト環境でテスト後、本番環境にデプロイ

---

## 📚 参考資料 / Resources

- [README.md](./README.md) - プロジェクト概要
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 詳細なデプロイガイド
- [COPILOT_AGENT_INSTRUCTIONS.md](./COPILOT_AGENT_INSTRUCTIONS.md) - 開発ガイドライン
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🆘 トラブルシューティング / Troubleshooting

問題が発生した場合は、以下を確認してください：

If you encounter issues, check the following:

1. **ログを確認** / Check logs
   ```bash
   gcloud app logs read
   ```

2. **環境変数を確認** / Verify environment variables
   ```bash
   gcloud secrets list
   ```

3. **APIが有効化されているか確認** / Check if APIs are enabled
   ```bash
   gcloud services list --enabled
   ```

4. **権限を確認** / Verify permissions
   ```bash
   gcloud projects get-iam-policy content-palette-prod
   ```

5. [DEPLOYMENT.md](./DEPLOYMENT.md) のトラブルシューティングセクションを参照
