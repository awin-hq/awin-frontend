# AWÍN Frontend

A mobile-first web application for **AWÍN**, a digital credit management platform that helps Nigerian traders record credit sales, track repayments, and manage customer debt with confidence.

---

## About the Project

AWÍN digitizes the traditional notebook used by many small businesses to record sales on credit. It enables traders to:

- Record credit sales
- Track outstanding customer balances
- Record repayments
- View transaction history
- Receive payment reminders
- Generate business insights

The project is built with a **mobile-first** approach because the primary users are traders who operate mainly from their smartphones.

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React
- React Hook Form
- Zod

### Development Tools

- Git & GitHub
- ESLint
- Turbopack

---

## Project Structure

```
app/
│
├── (auth)/
│   ├── login/
│   ├── register/
│   └── forgot-password/
│
├── (dashboard)/
│   ├── dashboard/
│   ├── customers/
│   ├── credit-sales/
│   ├── repayments/
│   ├── reports/
│   └── settings/
│
├── api/
└── layout.tsx

components/
├── ui/
├── common/
├── forms/
├── navigation/
└── dashboard/

features/
├── auth/
├── customers/
├── credit-sales/
├── repayments/
└── reports/

hooks/
lib/
types/
utils/
constants/
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/awin-hq/awin-frontend.git
```

### 2. Navigate into the project

```bash
cd awin-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint.

---

## Git Workflow

We use Conventional Commits.

Examples:

```text
feat: add login page
feat: create dashboard layout
fix: correct validation issue
refactor: simplify auth hook
docs: update README
style: improve button spacing
chore: configure shadcn
```

---

## Branch Strategy

```
main
```

Production-ready code.

```
develop
```

Active development branch.

Feature branches should follow:

```
feature/login-page
feature/dashboard
feature/customers
```

---

## Coding Standards

- Use TypeScript.
- Build reusable components.
- Keep components small and focused.
- Prefer composition over duplication.
- Use feature-based organization.
- Mobile-first responsive design.
- Run `npm run lint` before committing.

---

## Design Principles

- Mobile-first
- Accessibility
- Simplicity
- Consistency
- Performance

---

## Roadmap

### Phase 1

- [ ] Authentication
- [ ] Dashboard
- [ ] Navigation

### Phase 2

- [ ] Customers
- [ ] Credit Sales
- [ ] Repayments

### Phase 3

- [ ] Reports
- [ ] Notifications
- [ ] Settings

### Phase 4

- [ ] API Integration
- [ ] Testing
- [ ] Deployment

---

## Contributing

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit using Conventional Commits.

```bash
git commit -m "feat: add your feature"
```

4. Push your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

## License

This project is currently private. Licensing information will be added before public release.

---

## Maintainers

- David Emulo — Product Designer & Frontend Developer

---

Built with ❤️ for Nigerian SMEs.