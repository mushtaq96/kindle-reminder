# kindle-reminder

📱 Your personal Kindle highlights companion - sending your favorite moments directly to your inbox

[![GitHub Actions Status](https://github.com/mushtaq96/kindle-reminder/workflows/Build/badge.svg)](https://github.com/mushtaq96/kindle-reminder/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## What is it?

A privacy-focused service that delivers your Kindle highlights right to your email inbox. No third-party services, no data sharing - just your highlights, your way.

## Features

✨ **Privacy First**

- Your highlights stay private
- No external services involved
- Runs entirely on GitHub's infrastructure

📧 **Customizable Notifications**

- Choose your email frequency
- Select how many highlights you want
- Personalize the email format

📱 **Easy Setup**

- No server required
- Automatic updates
- Simple configuration

## Getting Started

### 1. Setup Your Repository

```bash
# Fork this repository
git clone https://github.com/yourusername/kindle-reminder.git
cd kindle-reminder
```

### 2. Configure Your Kindle File

```bash
# Replace with your Kindle clippings
cp path/to/your/My\ Clippings.txt .
git add .
git commit -m "Add Kindle clippings"
git push
```

### 3. Enable GitHub Actions

- Go to your repository's Actions tab
- Enable workflows for your fork

### 4. Secure Your Email

- Enable 2FA on your Gmail account
- Generate an app password
- Store these in your repository secrets:
  ```plaintext
  SENDER_EMAIL=your-email@gmail.com
  SENDER_APP_PASSWORD=your-app-password
  RECEIVING_EMAIL=your-email@example.com
  NO_OF_HIGHLIGHTS=3  # Optional, defaults to 3
  ```

## Customization

### Email Frequency

Edit `.github/workflows/main.yml`:

```yaml
on:
  schedule:
    - cron: "0 4 * * *" # Runs daily at 4 AM
```

### Email Format

Modify `src/mail.ts` to customize the email template.

### System Design

![Workflow](workflow.png)

## Contributing

Contributions are welcome! Submit a pull request with:

- Clear feature description
- Updated documentation
- Test cases
- Type definitions

## License

MIT License - see [LICENSE](LICENSE) for details.
