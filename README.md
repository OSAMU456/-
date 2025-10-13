# 美丽预约 (Beautiful Appointment)

A beauty salon booking portal designed for Chinese visitors and residents in Japan. This platform bridges the language barrier and provides a seamless booking experience for beauty services.

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
