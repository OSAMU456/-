# Copilot Coding Agent Instructions

## Overview
This repository is configured to work optimally with GitHub Copilot's coding agent. The following guidelines and best practices are provided to ensure smooth collaboration and efficient automation.

## Best Practices

### 1. Clear Task Descriptions
- Always provide clear, concise, and actionable task descriptions in issues and pull requests.
- Specify the desired outcome, relevant files, and any constraints or requirements.

### 2. Branching Strategy
- Use feature branches for new features and bug fixes.
- Name branches descriptively, e.g., `feature/add-login`, `fix/typo-in-readme`.

### 3. Pull Requests
- Open pull requests early for visibility and feedback.
- Link related issues and provide context for the changes.
- Use draft PRs for work in progress.

### 4. Code Reviews
- Review code for clarity, maintainability, and adherence to project standards.
- Provide constructive feedback and request changes if necessary.

### 5. Commit Messages
- Write clear and descriptive commit messages.
- Use the imperative mood (e.g., "Add authentication middleware").

### 6. Automated Testing
- Ensure all tests pass before merging.
- Add new tests for new features and bug fixes.

### 7. Documentation
- Update documentation for any user-facing or developer-facing changes.
- Keep `README.md` and other docs up to date.

### 8. Security and Secrets
- Never commit secrets or sensitive information.
- Use environment variables and secret management tools.

### 9. Copilot Coding Agent Usage
- When requesting Copilot agent tasks, use the `#github-pull-request_copilot-coding-agent` hashtag in issues or PRs.
- Provide all necessary context and requirements for the agent to complete the task.

## References
- [Best practices for Copilot coding agent in your repository](https://gh.io/copilot-coding-agent-tips)

---

For more information, see the official documentation linked above.
