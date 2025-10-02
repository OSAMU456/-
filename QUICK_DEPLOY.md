# 🚀 クイックデプロイガイド

このプロジェクトをGoogle Cloud Platformにデプロイする最速の方法です。

## 📋 前提条件チェックリスト

- [ ] Google Cloudアカウント（無料トライアルOK）
- [ ] GitHubアカウント
- [ ] クレジットカード（GCP課金用）

## 🎯 3ステップでデプロイ

### ステップ 1: GCPプロジェクトを作成

1. [Google Cloud Console](https://console.cloud.google.com) を開く
2. 「プロジェクトを作成」をクリック
3. プロジェクト名: `meiliyuyue-prod` を入力
4. 「作成」をクリック
5. **プロジェクトIDをメモ** （例: `meiliyuyue-prod-123456`）

### ステップ 2: Cloud Shellでセットアップ

GCP Consoleの右上にある「Cloud Shellをアクティブにする」をクリックし、以下のコマンドを実行:

```bash
# プロジェクトIDを設定（自分のIDに置き換え）
export PROJECT_ID="meiliyuyue-prod-123456"
gcloud config set project $PROJECT_ID

# 必要なAPIを有効化
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  containerregistry.googleapis.com \
  secretmanager.googleapis.com

# サービスアカウント作成
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions"

# 権限付与
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
gcloud iam service-accounts keys create ~/key.json \
  --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com

# キーの内容を表示（次のステップでコピーします）
cat ~/key.json
```

**重要**: 表示されたJSON全体をコピーしてください（`{` から `}` まで）

### ステップ 3: GitHub Secretsを設定

1. このGitHubリポジトリを開く
2. `Settings` > `Secrets and variables` > `Actions` に移動
3. `New repository secret` をクリックして以下を追加:

#### Secret 1
- **Name**: `GCP_PROJECT_ID`
- **Value**: あなたのプロジェクトID（例: `meiliyuyue-prod-123456`）

#### Secret 2
- **Name**: `GCP_SA_KEY`
- **Value**: ステップ2でコピーしたJSONキー全体

4. `Add secret` をクリック

## 🎉 デプロイ実行！

GitHub Secretsが設定できたら:

```bash
# このコマンドを実行（またはGitHub UIから）
git add .
git commit -m "Deploy to GCP"
git push origin main
```

または、GitHub UIから:
1. リポジトリの `Actions` タブを開く
2. `Deploy to Google Cloud` ワークフローを選択
3. `Run workflow` をクリック

## 📊 デプロイの進行状況を確認

- GitHubの `Actions` タブでワークフローの実行状況を確認
- 約5-10分でデプロイ完了

## 🌐 デプロイ後のURL確認

デプロイ完了後、Cloud Consoleで:
1. `Cloud Run` に移動
2. `meiliyuyue-app` サービスをクリック
3. URLが表示されます（例: `https://meiliyuyue-app-xxxxx.run.app`）

## 🔧 トラブルシューティング

### ビルドが失敗する

```bash
# GitHub Actionsのログを確認
# Actions タブ > 失敗したワークフロー > ログを表示
```

### 403エラー（権限不足）

```bash
# サービスアカウントの権限を再確認
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:github-actions@$PROJECT_ID.iam.gserviceaccount.com"
```

### 課金が有効になっていない

1. GCP Console > お支払い
2. 課金アカウントをプロジェクトにリンク

## 💡 次のステップ

デプロイ成功後:

1. **カスタムドメインの設定**
   ```bash
   gcloud run domain-mappings create \
     --service meiliyuyue-app \
     --domain yourdomain.com \
     --region asia-northeast1
   ```

2. **環境変数の設定**（必要に応じて）
   ```bash
   # Secret Managerに環境変数を追加
   echo -n "your-secret-value" | \
     gcloud secrets create SECRET_NAME --data-file=-
   ```

3. **モニタリングの設定**
   - GCP Console > Cloud Run > メトリクス

## 💰 コスト見積もり

無料枠を超えた場合の概算:
- 小規模（1日100アクセス）: **約 ¥300-500/月**
- 中規模（1日1,000アクセス）: **約 ¥3,000-5,000/月**
- 大規模（1日10,000アクセス）: **約 ¥30,000-50,000/月**

無料枠内で試せます！

## 📞 ヘルプが必要？

- [詳細デプロイガイド](./DEPLOY_STEPS.md)を参照
- [GCPサポート](https://cloud.google.com/support)に問い合わせ
- [GitHub Issues](https://github.com/OSAMU456/-/issues)で質問

---

**これだけです！** 3ステップでデプロイ完了 🎉
