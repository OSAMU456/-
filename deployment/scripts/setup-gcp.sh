#!/bin/bash

# Google Cloud Platform セットアップスクリプト
# Usage: ./scripts/setup-gcp.sh

set -e

echo "🔧 Setting up Google Cloud Platform infrastructure"
echo ""

# Variables
PROJECT_ID=${GCP_PROJECT_ID:-"meiliyuyue-prod"}
REGION=${GCP_REGION:-"asia-northeast1"}
DB_INSTANCE_NAME="meiliyuyue-db-instance"
DB_NAME="meiliyuyue_production"
BUCKET_NAME="${PROJECT_ID}-static-assets"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    exit 1
fi

# Authenticate
echo "🔐 Please authenticate with your Google account..."
gcloud auth login

# Set project
echo "📝 Setting project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔌 Enabling required APIs..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  containerregistry.googleapis.com \
  sqladmin.googleapis.com \
  compute.googleapis.com \
  dns.googleapis.com \
  storage.googleapis.com \
  secretmanager.googleapis.com

echo "✅ APIs enabled successfully"

# Create Cloud Storage bucket for static assets
echo "📦 Creating Cloud Storage bucket..."
gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$BUCKET_NAME/ || echo "Bucket already exists"
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME/

echo "✅ Storage bucket created: gs://$BUCKET_NAME"

# Create Cloud SQL instance
echo "💾 Creating Cloud SQL instance (this may take several minutes)..."
gcloud sql instances create $DB_INSTANCE_NAME \
  --database-version=POSTGRES_15 \
  --tier=db-custom-2-7680 \
  --region=$REGION \
  --availability-type=regional \
  --storage-type=SSD \
  --storage-size=20GB \
  --backup-start-time=03:00 \
  --enable-bin-log \
  --maintenance-window-day=SUN \
  --maintenance-window-hour=04 \
  || echo "Database instance already exists"

echo "✅ Cloud SQL instance created: $DB_INSTANCE_NAME"

# Create database
echo "🗄️  Creating database..."
gcloud sql databases create $DB_NAME \
  --instance=$DB_INSTANCE_NAME \
  || echo "Database already exists"

echo "✅ Database created: $DB_NAME"

# Create database user
echo "👤 Creating database user..."
DB_PASSWORD=$(openssl rand -base64 32)
gcloud sql users create meiliyuyue_app \
  --instance=$DB_INSTANCE_NAME \
  --password=$DB_PASSWORD \
  || echo "User already exists"

echo "✅ Database user created"

# Store database password in Secret Manager
echo "🔐 Storing database password in Secret Manager..."
echo -n $DB_PASSWORD | gcloud secrets create db-password \
  --data-file=- \
  --replication-policy=automatic \
  || gcloud secrets versions add db-password --data-file=- <<< $DB_PASSWORD

echo "✅ Database password stored in Secret Manager"

# Create NextAuth secret
echo "🔑 Creating NextAuth secret..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo -n $NEXTAUTH_SECRET | gcloud secrets create NEXTAUTH_SECRET \
  --data-file=- \
  --replication-policy=automatic \
  || gcloud secrets versions add NEXTAUTH_SECRET --data-file=- <<< $NEXTAUTH_SECRET

echo "✅ NextAuth secret created"

# Get Cloud SQL connection name
CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE_NAME \
  --format='value(connectionName)')

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Configuration Summary:"
echo "  Project ID: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Cloud SQL Instance: $DB_INSTANCE_NAME"
echo "  Connection Name: $CONNECTION_NAME"
echo "  Database: $DB_NAME"
echo "  Storage Bucket: gs://$BUCKET_NAME"
echo ""
echo "📝 Next steps:"
echo "1. Update your .env file with the connection details"
echo "2. Run database migrations"
echo "3. Deploy your application: ./scripts/deploy-gcp.sh"
echo ""
echo "💡 Database connection string:"
echo "  postgresql://meiliyuyue_app:[password]@/$DB_NAME?host=/cloudsql/$CONNECTION_NAME"
