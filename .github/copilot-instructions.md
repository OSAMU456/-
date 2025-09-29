# Copilot Instructions for Inbound Marketing Website

This repository is for building an inbound marketing website (インバンドの集客を目的としたウェブサイト構築). 

## Project Context

- **Purpose**: Inbound marketing website development
- **Language**: Japanese project with potential bilingual content
- **Target**: Lead generation and customer acquisition
- **Focus**: SEO-optimized, conversion-focused web development

## Coding Guidelines

### General Principles
- Write clean, maintainable, and well-documented code
- Follow modern web development best practices
- Prioritize performance, accessibility, and SEO
- Use semantic HTML and proper markup structure
- Implement responsive design principles

### Technology Stack Preferences
- **Frontend**: Modern HTML5, CSS3, JavaScript (ES6+)
- **Frameworks**: Consider React, Vue.js, or vanilla JS based on project needs
- **Styling**: CSS Grid/Flexbox, consider Tailwind CSS or styled-components
- **Build Tools**: Webpack, Vite, or similar modern bundlers
- **Package Manager**: npm or yarn

### Code Style
- Use consistent indentation (2 spaces)
- Follow conventional naming conventions (camelCase for JS, kebab-case for CSS)
- Write descriptive variable and function names in English
- Add JSDoc comments for functions and classes
- Use TypeScript when possible for better type safety

### File Organization
```
/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   └── assets/
├── public/
├── docs/
└── tests/
```

### Performance & SEO
- Optimize images and assets
- Implement lazy loading where appropriate
- Use proper meta tags and structured data
- Ensure fast loading times (Core Web Vitals)
- Implement proper heading hierarchy (H1-H6)
- Use alt text for images
- Implement proper URL structure

### Accessibility
- Follow WCAG 2.1 guidelines
- Use proper ARIA labels and roles
- Ensure keyboard navigation support
- Maintain proper color contrast ratios
- Test with screen readers

### Marketing Features
- Implement conversion tracking (Google Analytics, etc.)
- Add lead capture forms with proper validation
- Include social media integration
- Implement A/B testing capabilities
- Add email marketing integration
- Include call-to-action (CTA) components

### Japanese Localization
- Support Japanese text properly (UTF-8 encoding)
- Consider vertical text layouts where appropriate
- Use appropriate fonts for Japanese text
- Implement proper date/time formatting for Japan
- Consider cultural UX patterns for Japanese users

### Testing
- Write unit tests for utility functions
- Include integration tests for forms and key user flows
- Test on multiple browsers and devices
- Validate HTML and CSS
- Test performance on various network conditions

### Documentation
- Write clear README files with setup instructions
- Document API endpoints and data structures
- Include component documentation
- Maintain changelog for releases
- Document deployment processes

### Security
- Sanitize user inputs
- Use HTTPS everywhere
- Implement proper CORS policies
- Secure form submissions
- Follow OWASP guidelines

## Comments and Communication
- Write commit messages in English for consistency
- Use descriptive branch names
- Document complex business logic
- Explain marketing-specific implementations
- Reference relevant analytics or conversion goals in code comments

## Common Patterns for This Project
- Landing pages with clear value propositions
- Contact forms with lead capture
- Blog/content management capabilities
- Social proof sections (testimonials, case studies)
- Newsletter signup components
- Analytics and tracking implementations