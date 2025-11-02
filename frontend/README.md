# GDG-podcast (frontend)

## 📁 Folder Structure

```
src/
│
├── assets/                  # Static files (images, fonts, icons, etc.)
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/              # Reusable UI components (buttons, inputs, cards)
│   ├── common/              # Shared between multiple pages
│   ├── layout/              # Navbar, Sidebar, Footer, etc.
│   └── ui/                  # Small atomic components (e.g., Button, Modal)
│
├── features/                # Specific features/modules of your app
│   ├── auth/                # Login, register, reset password
│   ├── dashboard/
│   ├── profile/
│   └── ...
│
├── pages/                   # Page-level components (connected to routes)
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Login.tsx
│   └── ...
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   └── useFetch.ts
│
├── context/                 # React Context API (global state)
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── services/                # API calls or external service logic
│   ├── api/
│   │   ├── authApi.ts
│   │   ├── userApi.ts
│   │   └── ...
│   └── axiosInstance.ts     # Configured Axios instance
│
├── store/                   # Redux or Zustand store (if used)
│   └── userSlice.ts
│
├── utils/                   # Helper functions
│   ├── formatDate.ts
│   ├── validation.ts
│   └── constants.ts
│
├── styles/                  # Global styles
│   ├── index.css
│   └── tailwind.css
│
├── routes/                  # App routes
│   └── AppRoutes.tsx
│
├── App.tsx
└── main.tsx                 # React root (or index.js)
```
