# 302 Starter 🚀

English | [简体中文](./README_zh.md) | [日本語](./README_ja.md)

A modern web application starter template based on Next.js 14, integrating the latest frontend technology stack and best practices.

## ✨ About 302.AI ✨
[302.AI](https://302.ai) is a pay-as-you-go AI application platform, bridging the gap between AI capabilities and practical implementation.
1. 🧠 Comprehensive AI capabilities: Incorporates the latest in language, image, audio, and video models from leading AI brands.
2. 🚀 Advanced application development: We build genuine AI products, not just simple chatbots.
3. 💰 No monthly fees: All features are pay-per-use, fully accessible, ensuring low entry barriers with high potential.
4. 🛠 Powerful admin dashboard: Designed for teams and SMEs - managed by one, used by many.
5. 🔗 API access for all AI features: All tools are open-source and customizable (in progress).
6. 💡 Powerful development team: Launching 2-3 new applications weekly with daily product updates. Interested developers are welcome to contact us.

## 📖 Project Introduction

This is a feature-rich Next.js starter template that adopts the App Router architecture and integrates multiple practical features such as 302AI authentication, internationalization, theme switching, and form handling. The project is developed using TypeScript, ensuring code type safety and maintainability.

## 📁 Project Structure

```
src/
├── actions/      # Server actions
├── api/          # API routes
├── app/          # Next.js app router
├── components/   # React components
├── constants/    # Constants
├── hooks/        # Custom React Hooks
├── i18n/         # Internationalization
├── lib/          # Libraries
├── services/     # Services
├── stores/       # State management
├── styles/       # Styles
└── utils/        # Utilities
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Radix UI
- **State Management**: Jotai
- **Form Handling**: React Hook Form
- **HTTP Client**: ky
- **i18n**: next-intl
- **Theming**: next-themes
- **Code Standards**: ESLint, Prettier
- **Commit Standards**: Husky, Commitlint

## 🚀 Installation & Setup

### ⚙️ Requirements

- Node.js 18.17 or higher
- pnpm 8.0 or higher

### 📥 Installation Steps

1. Clone the project
```bash
git clone [repository-url]
cd 302-starter
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment
```bash
cp .env.example .env.local
```
Modify the environment variables in `.env.local` as needed.

4. Start development server
```bash
pnpm dev
```

5. Build for production
```bash
pnpm build
pnpm start
```

## ✨ Key Features

- 🔐 302AI Authentication
- 🌐 Internationalization
- 🎨 Light/Dark Theme
- 📝 Form Validation
- 🔒 Type-safe API Calls
- 📦 Modular Components
- 🚀 Optimized Build
- 🔧 Complete Development Toolchain

## 📐 Code Standards

The project uses ESLint and Prettier for code formatting and standards:

- ✅ ESLint: Code quality
- 🎨 Prettier: Code formatting
- 🔄 Husky: Git hooks
- 📝 Commitlint: Commit message standards

Run code check:
```bash
pnpm lint
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 Commit Convention

The project follows [Conventional Commits](https://www.conventionalcommits.org/), with the following format:

```
type(scope): description

[optional body]

[optional footer]
```

Common types:
- ✨ feat: New features
- 🐛 fix: Bug fixes
- 📚 docs: Documentation
- 💄 style: Code style
- ♻️ refactor: Code refactoring
- ✅ test: Testing
- 🔧 chore: Build process or tools

## ❓ FAQ

### Q: How to add new language support?
A: Add translation files in the `messages` directory and configure in `constants/values.ts`.

### Q: How to customize themes?
A: Modify theme configuration in `tailwind.config.ts`.

## 💬 Support

- 🐛 Submit Issues
- 📧 Contact Maintenance Team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
