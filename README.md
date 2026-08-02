# AWÍN Frontend

A mobile-first web application for **AWÍN**, a digital credit management platform that helps traders record credit sales, monitor repayments, and manage customer debt efficiently.

---

# About

AWÍN replaces the traditional debt notebook with a modern digital solution designed for Nigerian SMEs.

With AWÍN, traders can:

- Record credit sales
- Track customer balances
- Record repayments
- View transaction history
- Receive repayment reminders
- Generate business insights

The application is designed mobile-first because the majority of users operate primarily from smartphones.

---

# Tech Stack

## Framework

- Next.js 16 (App Router)
- React 19
- TypeScript

## UI

- CSS Modules
- Tailwind CSS v4
- shadcn/ui
- Lucide React

## Forms

- React Hook Form
- Zod

## Development

- ESLint
- Turbopack
- Git & GitHub

---

# Current Progress

## ✅ Authentication

Completed screens include:

- Login
- Register
- Phone Number
- OTP Verification
- Create PIN
- Registration Success
- Forgot Password
- Reset Password

Authentication components are fully reusable and follow the AWÍN design system.

---

# Project Structure

```text
app/
│
├── (auth)
│   ├── login/
│   ├── register/
│   ├── phone/
│   ├── otp/
│   ├── create-pin/
│   ├── pin-loading/
│   ├── forgot-password/
│   ├── reset-password/
│   └── success/
│
├── (dashboard)
│   ├── dashboard/
│   ├── customers/
│   ├── credit-sales/
│   ├── repayments/
│   ├── reports/
│   └── settings/
│
├── layout.tsx
└── page.tsx

components/
features/
lib/
services/
styles/
types/
utils/
public/
```

---

# Design System

Reusable components include:

## Buttons

- Primary Button

## Inputs

- Text Input
- Password Input
- Phone Input
- Password Strength Indicator

## Authentication

- Logo
- Auth Header
- Auth Switch
- Back Button

These components are designed to be reusable throughout the application.

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/awin-hq/awin-frontend.git
```

## 2. Navigate into the project

```bash
cd awin-frontend
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# Available Scripts

## Development

```bash
npm run dev
```

Starts the local development server.

## Production Build

```bash
npm run build
```

Creates a production build.

## Start Production

```bash
npm run start
```

Runs the production server.

## Lint

```bash
npm run lint
```

Runs ESLint across the project.

---

# Development Workflow

The project follows a **feature-based architecture**.

Each feature contains:

- UI
- Components
- Styling
- Business Logic

Reusable UI components are placed inside the global **components** directory, while page-specific functionality lives inside **features**.

Development follows a **mobile-first** approach before desktop enhancements.

---

# Git Workflow

This project uses **Conventional Commits**.

## Examples

```text
feat(auth): add login page
feat(customers): create customer table
fix(auth): resolve password validation
refactor(forms): simplify input components
style(button): update spacing
docs: update README
chore: configure eslint
```

---

# Branch Strategy

## main

Production-ready code.

## develop

Active development branch.

### Feature Branches

```text
feature/auth
feature/dashboard
feature/customers
feature/credit-sales
feature/repayments
feature/reports
```

---

# Coding Standards

- TypeScript first
- Build reusable components
- Keep components small and focused
- Avoid duplicated UI
- Feature-based architecture
- Mobile-first development
- Semantic HTML
- CSS Modules for component styling
- Run `npm run lint` before committing

---

# Development Principles

- 📱 Mobile First
- 🧩 Component Reusability
- ♿ Accessibility
- ✨ Simplicity
- ⚡ Performance
- 🏗 Clean Architecture
- 🎨 Consistent Design System

---

# Roadmap

## ✅ Phase 1

- Authentication
- Design System
- Reusable Form Components

## 🚧 Phase 2

- Dashboard
- Sidebar
- Navigation
- Dashboard Widgets

## ⏳ Phase 3

- Customers
- Credit Sales
- Repayments

## ⏳ Phase 4

- Reports
- Settings
- Notifications

## ⏳ Phase 5

- Backend Integration
- API Layer
- Authentication
- Testing
- Deployment

---

# Contributing

## 1. Fork the repository

## 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

## 3. Commit your changes

```bash
git commit -m "feat: your feature"
```

## 4. Push your branch

```bash
git push origin feature/your-feature
```

## 5. Open a Pull Request

---

# Maintainer

<!-- **David Emulo**

Frontend Engineer -->

---

Built with ❤️ for Nigerian SMEs.