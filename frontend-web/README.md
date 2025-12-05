# Tagore University Management System - Web Frontend

React + TypeScript + Material-UI web application with all 7 user portals.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App will be available at `http://localhost:3001`

## 📦 Features

- ✅ **Authentication** - JWT-based login with role-based routing
- ✅ **Director Dashboard** - God-view with KPIs, charts, college map
- ✅ **Principal Dashboard** - College-specific management
- ✅ **Teacher Portal** - Attendance marking, marks entry
- ✅ **Student Portal** - Attendance tracker, marks, fees
- ✅ **Parent Portal** - Child performance, absence alerts
- ✅ **HR Portal** - Employee management, payroll
- ✅ **Accountant Portal** - Fee collection, reports
- ✅ **Real-time Updates** - WebSocket integration
- ✅ **Responsive Design** - Mobile, tablet, desktop

## 🗂️ Project Structure

```
frontend-web/
├── src/
│   ├── pages/
│   │   ├── auth/           # Login page
│   │   ├── director/       # Director dashboard
│   │   ├── principal/      # Principal dashboard
│   │   ├── teacher/        # Teacher portal
│   │   ├── student/        # Student portal
│   │   ├── parent/         # Parent portal
│   │   ├── hr/             # HR portal
│   │   └── accountant/     # Accountant portal
│   ├── layouts/            # Dashboard layout
│   ├── stores/             # Zustand state management
│   ├── services/           # API services
│   ├── theme.ts            # Material-UI theme
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Design System

Based on Material Design 3 specifications from `ui-designs/UI_UX_SPECIFICATIONS.md`

### Colors
- **Primary**: #1565C0 (Tagore Blue)
- **Secondary**: #FFA726 (Academic Gold)
- **Success**: #43A047
- **Error**: #E53935

### Typography
- Font Family: Roboto
- Weights: 300, 400, 500, 700

## 📡 API Integration

Configure backend URL in `.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🔐 Authentication Flow

1. User enters credentials → POST `/auth/login`
2. Server returns JWT tokens + user info
3. Tokens stored in Zustand + localStorage (persisted)
4. All API requests include `Authorization: Bearer <token>`
5. Auto token refresh on 401 errors

## 🚀 Build for Production

```bash
npm run build
```

Output in `dist/` folder, ready for deployment.

## 📚 Tech Stack

- React 18
- TypeScript
- Material-UI (MUI) v5
- React Router v6
- TanStack Query (React Query)
- Zustand (State Management)
- Axios
- Socket.io Client
- Recharts (Charts)
- date-fns
- Vite

## 🐳 Docker Build

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "preview"]
```

## 👥 Role-Based Routing

| Role | RoleID | Route | Dashboard |
|------|--------|-------|-----------|
| Director | 1 | `/director` | God-view across all colleges |
| Principal | 2 | `/principal` | College-specific |
| Teacher | 4 | `/teacher` | Attendance + Marks |
| Student | 5 | `/student` | Performance tracking |
| Parent | 6 | `/parent` | Child monitoring |
| HR | 7 | `/hr` | Employee management |
| Accountant | 8 | `/accountant` | Finance |

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: 960px - 1280px
- **Wide**: > 1280px

## 🐛 Troubleshooting

### Module not found errors
```bash
npm install
```

### API connection errors
Check `VITE_API_URL` in `.env` and ensure backend is running

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 License

Proprietary - Tagore Group of Colleges
