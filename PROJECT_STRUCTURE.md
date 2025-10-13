# 🏗️ プロジェクト構造

## 📁 ディレクトリ構成

```
美丽预约 (Meiliyuyue) - 美容院予約ポータル
│
├── 📂 src/                    # アプリケーションソースコード
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx          # トップページ
│   │   ├── layout.tsx        # 共通レイアウト
│   │   ├── globals.css       # グローバルスタイル
│   │   ├── admin/            # 管理画面
│   │   ├── search/           # サロン検索ページ
│   │   └── salon/[id]/       # サロン詳細ページ
│   │
│   ├── components/           # Reactコンポーネント
│   │   ├── Header.tsx        # ヘッダーコンポーネント
│   │   ├── Footer.tsx        # フッターコンポーネント
│   │   └── SalonCard.tsx     # サロンカードコンポーネント
│   │
│   ├── lib/                  # ユーティリティ・ヘルパー
│   │   └── mockData.ts       # サンプルデータ
│   │
│   └── types/                # TypeScript型定義
│       └── index.ts          # 共通型定義
│
├── 📂 public/                 # 静的ファイル
│   ├── *.svg                 # SVGアイコン
│   └── favicon.ico           # ファビコン
│
├── 📂 docs/                   # ドキュメント
│   ├── DEPLOYMENT.md         # デプロイ詳細ガイド
│   ├── QUICK_DEPLOY.md       # クイックデプロイガイド
│   ├── DEPLOY_STEPS.md       # ステップバイステップ手順
│   └── deploy-checklist.md  # デプロイチェックリスト
│
├── 📂 deployment/             # デプロイ設定
│   ├── Dockerfile            # Dockerイメージ定義
│   ├── cloudbuild.yaml       # Cloud Buildパイプライン
│   ├── app.yaml              # App Engine設定
│   ├── .dockerignore         # Docker除外ファイル
│   ├── Makefile              # ビルドコマンド集
│   │
│   ├── scripts/              # デプロイスクリプト
│   │   ├── setup-gcp.sh     # GCP初期設定
│   │   └── deploy-gcp.sh    # GCPデプロイ実行
│   │
│   └── terraform/            # Infrastructure as Code
│       ├── main.tf           # メインTerraform設定
│       ├── variables.tf      # 変数定義
│       └── terraform.tfvars.example  # 環境変数サンプル
│
├── 📂 .github/                # GitHub設定
│   └── workflows/            # GitHub Actions
│       └── deploy-gcp.yml   # 自動デプロイワークフロー
│
├── 📂 .vscode/                # VS Code設定
│   └── .devcontainer/        # Dev Container設定
│       └── devcontainer.json
│
├── 📄 next.config.ts          # Next.js設定
├── 📄 tsconfig.json           # TypeScript設定
├── 📄 eslint.config.mjs       # ESLint設定
├── 📄 postcss.config.mjs      # PostCSS設定
├── 📄 package.json            # npm依存関係
├── 📄 .env.example            # 環境変数サンプル
├── 📄 README.md               # プロジェクト概要
└── 📄 PROJECT_STRUCTURE.md    # このファイル
```

---

## 🎯 主要ファイルの役割

### アプリケーション

| ファイル | 説明 |
|---------|------|
| `src/app/page.tsx` | トップページ（ヒーローセクション、人気サロン） |
| `src/app/search/page.tsx` | サロン検索ページ（フィルター、一覧表示） |
| `src/app/salon/[id]/page.tsx` | サロン詳細ページ（情報、メニュー、予約） |
| `src/app/admin/page.tsx` | 管理画面（ダッシュボード、予約管理） |
| `src/app/layout.tsx` | 全ページ共通レイアウト（ヘッダー、フッター） |
| `src/app/globals.css` | グローバルスタイル（Tailwind、カスタムCSS） |

### コンポーネント

| ファイル | 説明 |
|---------|------|
| `src/components/Header.tsx` | ヘッダー（ナビゲーション、検索バー） |
| `src/components/Footer.tsx` | フッター（リンク、著作権情報） |
| `src/components/SalonCard.tsx` | サロンカード（サムネイル、評価、価格） |

### データ・型定義

| ファイル | 説明 |
|---------|------|
| `src/lib/mockData.ts` | サンプルデータ（サロン情報） |
| `src/types/index.ts` | TypeScript型定義（Salon、Service、Stylist） |

### 設定ファイル

| ファイル | 説明 |
|---------|------|
| `next.config.ts` | Next.js設定（画像最適化、ビルド設定） |
| `tsconfig.json` | TypeScript設定（パスエイリアス、コンパイルオプション） |
| `eslint.config.mjs` | ESLint設定（コード品質チェック） |
| `postcss.config.mjs` | PostCSS設定（Tailwind CSS処理） |
| `package.json` | npm依存関係とスクリプト |

---

## 🚀 よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# コードフォーマット
npm run lint
```

---

## 📝 コード変更の流れ

### 1. 新しいページを追加

```bash
# 例: /services ページを追加
src/app/services/page.tsx を作成
```

```typescript
export default function ServicesPage() {
  return <div>サービス一覧</div>
}
```

### 2. コンポーネントを追加

```bash
# 例: Buttonコンポーネントを追加
src/components/Button.tsx を作成
```

```typescript
export default function Button({ children, onClick }: Props) {
  return <button onClick={onClick}>{children}</button>
}
```

### 3. スタイルを変更

```bash
# グローバルスタイルを編集
src/app/globals.css を編集
```

### 4. データを変更

```bash
# サロンデータを編集
src/lib/mockData.ts を編集
```

---

## 🔧 管理画面のカスタマイズ

### ダッシュボードに新しいカードを追加

`src/app/admin/page.tsx` を編集：

```typescript
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {/* 既存のカード */}
  
  {/* 新しいカード */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-600">新規顧客</span>
      <Users className="w-5 h-5 text-purple-500" />
    </div>
    <p className="text-2xl font-bold">45</p>
    <p className="text-xs text-green-500">+12% 先月比</p>
  </div>
</div>
```

---

## 🎨 デザインのカスタマイズ

### カラーテーマを変更

`src/app/globals.css` の `:root` セクションを編集：

```css
:root {
  --primary: #ff2d55;      /* メインカラー */
  --secondary: #5856d6;    /* サブカラー */
  --accent: #ff9500;       /* アクセントカラー */
}
```

### フォントを変更

`src/app/layout.tsx` を編集：

```typescript
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })
```

---

## 📱 Vercelでのデプロイ

### 自動デプロイ

```bash
# 変更をコミット
git add .
git commit -m "Update: ..."

# GitHubにプッシュ
git push origin main

# Vercelが自動的にデプロイ！
```

### 環境変数の設定

Vercelダッシュボード → Settings → Environment Variables

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 🔗 リンク

- **本番サイト**: https://beauty-appointment-portal.vercel.app
- **GitHub**: https://github.com/OSAMU456/-
- **Vercel**: https://vercel.com/[your-username]/beauty-appointment-portal

---

## 💡 ヒント

- **開発中**: `npm run dev` でホットリロード有効
- **ビルド確認**: デプロイ前に `npm run build` でエラーチェック
- **型チェック**: TypeScriptの型エラーに注意
- **レスポンシブ**: モバイル表示も確認（Chrome DevTools）
