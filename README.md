# Content Palette - AI SNS Auto-Posting Application

Content Palette is an AI-powered social media automation tool that helps you manage and optimize your SNS posts using Google Sheets as a content management system.

## Features

### Core Features (High Priority)
- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 📊 **Google Sheets Integration** - Import and manage content from Google Spreadsheets
- 📱 **SNS Account Linking** - Connect your social media accounts (Twitter/X, Instagram)
- ⏰ **Auto-posting Scheduler** - Schedule posts automatically based on spreadsheet data
- 👀 **Post Preview** - Preview how posts will look before publishing

### AI Features (Medium Priority)
- 📈 **Performance Analytics** - Track engagement, likes, comments, and shares
- 🎯 **Engagement Prediction** - AI-powered prediction of post performance
- 💡 **Optimal Posting Suggestions** - AI recommendations for best posting times
- 🔍 **Content Optimization** - Suggestions for hashtags and content improvements

### Additional Features (Low Priority)
- 📅 **Calendar View** - Visual scheduling interface
- 🔔 **Notifications** - Email alerts for posting status
- 🎨 **Advanced UI/UX** - Intuitive and beautiful interface

## Technology Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: SQLite with Prisma ORM
- **Integrations**: Google Sheets API, Twitter API, Instagram API
- **Scheduling**: Node-cron for automated posting

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
