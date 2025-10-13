# Makefile for 美丽预约 (Meiliyuyue) deployment

.PHONY: help build dev test deploy deploy-gcp setup-gcp clean

# デフォルトターゲット
help:
	@echo "美丽预约 (Meiliyuyue) - デプロイメントコマンド"
	@echo ""
	@echo "利用可能なコマンド:"
	@echo "  make dev           - 開発サーバー起動"
	@echo "  make build         - 本番ビルド"
	@echo "  make test          - テスト実行"
	@echo "  make setup-gcp     - GCPインフラセットアップ"
	@echo "  make deploy-gcp    - GCPへデプロイ"
	@echo "  make deploy        - フルデプロイ（ビルド+デプロイ）"
	@echo "  make clean         - ビルドファイル削除"
	@echo ""

# 開発サーバー起動
dev:
	npm run dev

# 本番ビルド
build:
	@echo "🔨 本番環境用ビルドを実行中..."
	npm run build
	@echo "✅ ビルド完了"

# テスト実行
test:
	@echo "🧪 テストを実行中..."
	npm run lint
	@echo "✅ テスト完了"

# GCPインフラセットアップ
setup-gcp:
	@echo "🔧 GCPインフラをセットアップ中..."
	@if [ ! -f scripts/setup-gcp.sh ]; then \
		echo "❌ scripts/setup-gcp.sh が見つかりません"; \
		exit 1; \
	fi
	chmod +x scripts/setup-gcp.sh
	./scripts/setup-gcp.sh
	@echo "✅ セットアップ完了"

# GCPへデプロイ
deploy-gcp:
	@echo "🚀 GCPへデプロイ中..."
	@if [ ! -f scripts/deploy-gcp.sh ]; then \
		echo "❌ scripts/deploy-gcp.sh が見つかりません"; \
		exit 1; \
	fi
	chmod +x scripts/deploy-gcp.sh
	./scripts/deploy-gcp.sh
	@echo "✅ デプロイ完了"

# フルデプロイ（ビルド+テスト+デプロイ）
deploy: build test deploy-gcp
	@echo "🎉 すべてのデプロイ処理が完了しました！"

# Dockerイメージをビルド
docker-build:
	@echo "🐳 Dockerイメージをビルド中..."
	docker build -t meiliyuyue-app:latest .
	@echo "✅ Dockerイメージのビルド完了"

# Dockerイメージをテスト
docker-run:
	@echo "🐳 Dockerコンテナを起動中..."
	docker run -p 3000:3000 meiliyuyue-app:latest

# ビルドファイル削除
clean:
	@echo "🧹 ビルドファイルを削除中..."
	rm -rf .next
	rm -rf out
	rm -rf node_modules/.cache
	@echo "✅ クリーンアップ完了"

# 依存関係のインストール
install:
	@echo "📦 依存関係をインストール中..."
	npm install
	@echo "✅ インストール完了"

# ログ確認（GCP）
logs:
	@echo "📋 GCPログを確認中..."
	gcloud logging read "resource.type=cloud_run_revision" --limit 50 --format="table(timestamp,severity,textPayload)"

# サービスステータス確認
status:
	@echo "📊 サービスステータスを確認中..."
	gcloud run services describe meiliyuyue-app --region asia-northeast1 --format="table(status.url,status.conditions[0].status)"
