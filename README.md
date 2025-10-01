# Content Palette - AI SNS Auto-Posting Application

Content Palette is an AI-powered social media automation tool that helps you manage and optimize your SNS posts using Google Sheets as a content management system.

## 🌟 Features

### Core Features (High Priority)
- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 📊 **Google Sheets Integration** - Import and manage content from Google Spreadsheets
- 📱 **SNS Account Linking** - Connect your social media accounts (Instagram, Threads, Facebook)
- ⏰ **Auto-posting Scheduler** - Schedule posts automatically based on spreadsheet data
- 👀 **Post Preview** - Preview how posts will look before publishing

### Priority Platforms
- **Instagram** 📸 - Primary platform for visual content
- **Threads** 💬 - Primary platform for text-based conversations
- **Facebook** 👥 - Additional platform support

### AI Features (Medium Priority)
- 📈 **Performance Analytics** - Track engagement, likes, comments, and shares
- 🎯 **Engagement Prediction** - AI-powered prediction of post performance
- 💡 **Optimal Posting Suggestions** - AI recommendations for best posting times
- 🔍 **Content Optimization** - Suggestions for hashtags and content improvements

### Additional Features (Low Priority)
- 📅 **Calendar View** - Visual scheduling interface
- 🔔 **Notifications** - Email alerts for posting status
- 🎨 **Advanced UI/UX** - Intuitive and beautiful interface

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: SQLite with Prisma ORM (Development) / PostgreSQL (Production)
- **Integrations**: Google Sheets API, Instagram Graph API, Threads API
- **Scheduling**: Node-cron for automated posting
- **Deployment**: Google Cloud Platform (App Engine / Cloud Run)

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or later
- npm or yarn
- Google Cloud account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd content-palette
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your API credentials
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment to Google Cloud Platform

Content Palette is optimized for deployment on Google Cloud Platform. 

### 📖 Deployment Documentation

- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment checklist (日本語/English)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide with detailed instructions

### Quick Deploy Options

#### Option 1: Google App Engine (Recommended)
```bash
gcloud app deploy
```

#### Option 2: Cloud Run (Container-based)
```bash
docker build -t content-palette .
gcloud run deploy content-palette --image content-palette
```

### Required Setup

1. **Google Cloud Project**
   - Create a new project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable billing (free tier available)

2. **API Credentials**
   - Google OAuth 2.0 credentials
   - Instagram Graph API access
   - Threads API access

3. **Environment Variables**
   - Set up secrets in Google Cloud Secret Manager
   - Configure OAuth callback URLs

**Ready to deploy?** Follow the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for a guided deployment process.

## 📋 Environment Variables

Copy `.env.example` to `.env.local` and configure:

### Required Variables
- `NEXTAUTH_SECRET` - Authentication secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `INSTAGRAM_APP_ID` - Instagram app ID
- `INSTAGRAM_APP_SECRET` - Instagram app secret
- `THREADS_APP_ID` - Threads app ID
- `THREADS_APP_SECRET` - Threads app secret

### Production Variables
- `DATABASE_URL` - PostgreSQL connection string (for production)
- `NEXTAUTH_URL` - Your deployed application URL
- `GCP_PROJECT_ID` - Google Cloud project ID

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```

## 📱 Platform Support

### Instagram (Priority)
- Post scheduling and automation
- Image and video support
- Caption and hashtag optimization
- Analytics and insights

### Threads (Priority)
- Text post automation
- Thread support (multiple connected posts)
- Engagement tracking
- Best time to post analysis

### Facebook
- Page post automation
- Multi-format content support
- Audience insights

## 🎯 User Journey

1. **Sign In** with Google account
2. **Connect Google Sheets** containing your content calendar
3. **Link Social Accounts** (Instagram, Threads, Facebook)
4. **Review & Schedule** posts automatically from spreadsheet
5. **Monitor Performance** with AI-powered analytics

## 📊 Cost Estimation (Google Cloud)

### Small Scale (10,000 requests/month)
- App Engine: $0-5/month
- Cloud SQL: $0-7/month
- Total: **~$7-12/month**

### Medium Scale (100,000 requests/month)
- App Engine: $20-50/month
- Cloud SQL: $25/month
- Total: **~$50-80/month**

*Free tier can support initial deployment under $10/month*

## 🔐 Security

- OAuth 2.0 authentication
- Environment-based configuration
- API credential encryption
- Secure session management
- HTTPS-only in production

## 📚 Documentation

### Deployment & Setup
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Step-by-step deployment checklist (日本語/English)
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete GCP deployment instructions (日本語/English)
- [COPILOT_AGENT_INSTRUCTIONS.md](./COPILOT_AGENT_INSTRUCTIONS.md) - Guidelines for GitHub Copilot development

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [Threads API](https://developers.facebook.com/docs/threads)

## 🤝 Support

For questions or issues:
1. Follow the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for deployment
2. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
3. Review Google Cloud Platform documentation
4. Check API provider documentation (Instagram, Threads, etc.)

## 📝 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js, TypeScript, and Google Cloud Platform**
