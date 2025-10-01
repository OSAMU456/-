# GitHub Copilot Coding Agent Instructions

This document contains instructions and best practices for GitHub Copilot Coding Agent when working with this repository.

## Project Overview

Content Palette is an AI-powered social media automation tool built with:
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (dev) / PostgreSQL (production) with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Google Cloud Platform (App Engine / Cloud Run)

## Development Guidelines

### Code Style
- Follow TypeScript strict mode conventions
- Use functional components with React hooks
- Maintain consistent ESLint configuration
- Use Tailwind CSS for styling (no inline styles unless necessary)
- Keep components small and focused on single responsibility

### File Structure
- `/app` - Next.js 15 app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and API clients
- `/prisma` - Database schema and migrations
- `/public` - Static assets

### Testing and Quality
- Run `npm run lint` before committing changes
- Ensure `npm run build` succeeds without errors
- Test API routes locally before deployment
- Verify database migrations work correctly

### Environment Variables
- Never commit secrets or API keys
- Use `.env.local` for local development
- Reference `.env.example` for required variables
- Use Google Cloud Secret Manager for production secrets

## Deployment

### Prerequisites
- Google Cloud account with billing enabled
- gcloud CLI installed and authenticated
- API credentials configured (Google OAuth, Instagram, Threads)

### Deployment Options

#### Option 1: Google App Engine (Recommended)
```bash
npm install
npm run build
gcloud app deploy
```

#### Option 2: Cloud Run
```bash
docker build -t content-palette .
gcloud run deploy content-palette --image content-palette
```

### Important Notes
- Always update environment variables in Secret Manager before deployment
- Test deployments in a staging environment first
- Monitor logs after deployment for errors
- Refer to [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

## API Integration Guidelines

### Google Sheets API
- Use service accounts for automated access
- Implement proper error handling for quota limits
- Cache spreadsheet data appropriately

### Social Media APIs
- Handle rate limits gracefully
- Implement retry logic with exponential backoff
- Store tokens securely in the database

### Authentication
- Use NextAuth.js for all authentication flows
- Implement proper session management
- Validate tokens on every API request

## Best Practices

### Security
- Validate all user inputs
- Use parameterized queries for database operations
- Implement CSRF protection on forms
- Enable HTTPS-only in production

### Performance
- Optimize images before upload
- Use Next.js image optimization
- Implement proper caching strategies
- Minimize API calls with batching

### Error Handling
- Log errors with sufficient context
- Provide user-friendly error messages
- Implement proper error boundaries in React
- Monitor error rates in production

## Common Tasks

### Adding a New API Route
1. Create file in `/app/api/[name]/route.ts`
2. Implement proper authentication checks
3. Add error handling and validation
4. Test with various input scenarios
5. Update API documentation if needed

### Adding a New Page
1. Create file in `/app/[name]/page.tsx`
2. Implement proper metadata for SEO
3. Add loading and error states
4. Ensure responsive design
5. Test navigation and back/forward behavior

### Database Changes
1. Update schema in `prisma/schema.prisma`
2. Run `npx prisma generate` to update client
3. Create migration with `npx prisma migrate dev`
4. Test migration on clean database
5. Update production database carefully

## Troubleshooting

### Build Failures
- Check Node.js version (requires 20.x)
- Clear `.next` cache and rebuild
- Verify all dependencies are installed
- Check for TypeScript errors

### Deployment Issues
- Verify gcloud authentication
- Check project configuration
- Review app.yaml settings
- Examine deployment logs

### Runtime Errors
- Check environment variables are set
- Verify database connection
- Review API credentials
- Check service quotas

## Resources

- [README.md](./README.md) - Project overview and quick start
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide (Japanese/English)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Support

For issues or questions:
1. Check existing documentation first
2. Review error logs and stack traces
3. Consult Google Cloud Platform documentation
4. Verify API provider documentation
