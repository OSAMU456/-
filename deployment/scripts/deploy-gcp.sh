#!/bin/bash

# Google Cloud Platform デプロイメントスクリプト
# Usage: ./scripts/deploy-gcp.sh [environment]

set -e

ENVIRONMENT=${1:-production}
PROJECT_ID=${GCP_PROJECT_ID:-"meiliyuyue-prod"}
REGION=${GCP_REGION:-"asia-northeast1"}
SERVICE_NAME="meiliyuyue-app"

echo "🚀 Starting deployment to Google Cloud Platform"
echo "Environment: $ENVIRONMENT"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    exit 1
fi

# Set project
echo "📝 Setting GCP project..."
gcloud config set project $PROJECT_ID

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .

# Push to Container Registry
echo "📤 Pushing image to Google Container Registry..."
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

# Deploy to Cloud Run
echo "🚢 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 2Gi \
  --cpu 2 \
  --min-instances 1 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production

# Get service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --region $REGION \
  --format 'value(status.url)')

echo ""
echo "✅ Deployment completed successfully!"
echo "🌐 Service URL: $SERVICE_URL"
echo ""
echo "Next steps:"
echo "1. Set up custom domain: gcloud run domain-mappings create --service $SERVICE_NAME --domain yourdomain.com --region $REGION"
echo "2. Configure secrets in Secret Manager"
echo "3. Set up Cloud SQL connection"
echo "4. Configure Cloud CDN for static assets"
