# 🌸 美丽预约 (Meiliyuyue) - Beauty Salon Appointment Portal

福岡の美容院予約ポータル - 中国人観光客向けの多言語対応予約システム

🌐 **本番サイト**: https://beauty-appointment-portal.vercel.app  
📋 **管理画面**: https://beauty-appointment-portal.vercel.app/admin

---

## ✨ 主な機能

- 🏪 **サロン検索**: 福岡の人気美容院を閲覧
- 🔍 **詳細フィルター**: サービス、価格、評価で絞り込み
- 📅 **簡単予約**: シンプルな予約システム
- 🌙 **ダークモード**: 美しいダークテーマ対応
- 📱 **レスポンシブ**: すべてのデバイスで快適
- 🎨 **モダンUI**: 洗練されたインターフェース
- 🌏 **多言語対応**: 中国語・日本語対応

---

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15.5.4 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン**: Lucide React
- **デプロイ**: Vercel

---

## 🚀 クイックスタート

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/OSAMU456/-.git
cd -
```

2. 依存関係をインストール:
```bash
npm install
```

3. 開発サーバーを起動:
```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

---

## 📁 プロジェクト構造

詳細な構造は [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) を参照してください。

```
📦 美丽预约
├── 📂 src/              # アプリケーションコード
│   ├── app/            # ページ（Next.js App Router）
│   ├── components/     # Reactコンポーネント
│   ├── lib/           # ユーティリティ・データ
│   └── types/         # TypeScript型定義
├── 📂 public/          # 静的ファイル
├── 📂 docs/            # ドキュメント
├── 📂 deployment/      # デプロイ設定
└── 📂 .vscode/         # VS Code設定
```

---

## 📜 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm start` | 本番サーバー起動 |
| `npm run lint` | コードチェック |

---

## 🚀 デプロイ

### Vercel（推奨）

このプロジェクトはVercelで簡単にデプロイできます：

```bash
# 変更をコミット
git add .
git commit -m "Update: ..."

# GitHubにプッシュ（自動デプロイ）
git push origin main
```

Vercelが自動的にデプロイを検出し、約1-2分で完了します。

### Google Cloud Platform

GCPへのデプロイ手順は [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) を参照してください。

---

## 📋 管理画面

**アクセス**: `/admin`

### 管理機能
- 📅 予約管理
- ✂️ サービス管理
- 👥 スタッフ管理
- 📊 統計ダッシュボード

詳しい使い方は [`docs/ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md) を参照してください。

---

## 📚 ドキュメント

| ファイル | 説明 |
|---------|------|
| [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) | プロジェクト構造の詳細 |
| [`docs/ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md) | 管理画面の使い方 |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | デプロイ詳細ガイド |
| [`docs/QUICK_DEPLOY.md`](docs/QUICK_DEPLOY.md) | クイックデプロイ |

---

## 🎯 主要ページ

| ページ | URL | 説明 |
|--------|-----|------|
| トップ | `/` | ヒーロー、人気サロン |
| 検索 | `/search` | サロン一覧、フィルター |
| サロン詳細 | `/salon/[id]` | サロン情報、予約 |
| 管理画面 | `/admin` | ダッシュボード |

---

## 🔧 カスタマイズ

### サロン情報の変更
`src/lib/mockData.ts` を編集

### スタイルの変更
`src/app/globals.css` を編集

### ページの追加
`src/app/新しいページ/page.tsx` を作成

詳細は [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) を参照してください。

---

## 🆘 トラブルシューティング

### ビルドエラー
```bash
npm run build
```
でエラーを確認

### ポートが使用中
```bash
# 別のポートで起動
PORT=3001 npm run dev
```

### キャッシュクリア
```bash
rm -rf .next
npm run dev
```

---

## 📄 ライセンス

MIT

---

## 🤝 貢献

プルリクエストを歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

---

## 📞 サポート

質問や問題がある場合は、GitHubでIssueを開いてください。

---

**🎉 美丽预约へようこそ！福岡で最高の美容院体験を提供します。**

## 项目概述 (Project Overview)

「美丽预约」是专为访日・在日中国人打造的美容室检索・预约门户网站。我们的目标是消除语言障碍，为日本美容室提供新的获客渠道。

### 主要功能 (Main Features)

**用户功能 (User Features):**
- 微信等社交媒体登录 (WeChat & SNS Login)
- 多样化搜索功能：地区、当前位置、中文服务人员 (Advanced Search: Area, Location, Chinese-speaking Staff)
- 沙龙、员工、发型详细信息查看 (Detailed Salon, Staff & Style Information)
- 实时在线预约功能 (Real-time Online Booking)

**商家功能 (Business Features):**
- 沙龙信息管理系统 (Salon Information Management)
- 员工出勤状态更新 (Staff Schedule Management)
- 发型作品上传管理 (Style Portfolio Management)
- 预约状况日历管理 (Booking Calendar Management)

### 技术特点 (Technical Features)

- 移动优先设计 (Mobile-First Design)
- 简体中文界面 (Simplified Chinese Interface)
- 响应式布局 (Responsive Layout)
- 现代化技术栈 (Modern Tech Stack)

## 开始使用 (Getting Started)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 技术栈 (Tech Stack)

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Infrastructure**: Google Cloud Platform

### Google Cloud Platform インフラ

- **Hosting**: Cloud Run (サーバーレスコンテナ)
- **Database**: Cloud SQL (PostgreSQL 15)
- **Storage**: Cloud Storage + Cloud CDN
- **CI/CD**: Cloud Build / GitHub Actions
- **Secrets**: Secret Manager
- **Monitoring**: Cloud Logging & Monitoring
- **Region**: asia-northeast1 (東京)

## ☁️ Google Cloud デプロイメント

### 初回セットアップ

```bash
# GCPプロジェクトとインフラをセットアップ
./scripts/setup-gcp.sh

# 環境変数を設定
cp .env.example .env
# .envファイルを編集してGCP設定を追加
```

### デプロイ方法

#### オプション1: デプロイスクリプト使用

```bash
./scripts/deploy-gcp.sh
```

#### オプション2: Cloud Build使用

```bash
gcloud builds submit --config=cloudbuild.yaml
```

#### オプション3: Terraform使用

```bash
cd terraform
terraform init
terraform apply
```

### 詳細なデプロイ手順

詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

## 部署目标 (Deployment Target)

初期将在福岡等主要城市展开，未来计划扩展至全日本。
(Initially targeting major cities like Fukuoka, with plans to expand nationwide)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
