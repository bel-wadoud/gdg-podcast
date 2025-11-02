# GDG-podcast (frontend)

## Folder structure

src/
│
├── assets/ # Static files (images, fonts, icons, etc.)
│ ├── images/
│ ├── icons/
│
│
├── components/ # Reusable UI components (buttons, inputs, cards)
│ ├── common/ # Shared between multiple pages
│ ├── layout/ # Navbar, Sidebar, Footer, etc.
│ └── ui/ # Small atomic components (e.g., Button, Modal)
│
├── features/ # Specific features/modules of your app
│ ├── auth/ # Login, register, reset password
│ ├── dashboard/
│ ├── profile/
│ └── ...
│
├── pages/ # Page-level components (connected to routes)
│ ├── Home.tsx
│ ├── About.tsx
│ ├── Login.tsx
│ └── ...
│
├── hooks/ # Custom React hooks
│ ├── useAuth.ts
│ └── useFetch.ts
│
├── context/ # React Context API (global state)
│ ├── AuthContext.tsx
│ └── ThemeContext.tsx
│
├── services/ # API calls or external service logic
│ ├── api/
│ │ ├── authApi.ts
│ │ ├── userApi.ts
│ │ └── ...
│ └── axiosInstance.ts # Configured Axios instance
│
├── styles/ # Global styles
│ ├── index.css
│ └── tailwind.css
│
├── routes/ # App routes
│ └── AppRoutes.tsx
│
├── App.tsx
└── main.tsx # React root (or index.js)
