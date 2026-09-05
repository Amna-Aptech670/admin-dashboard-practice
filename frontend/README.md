# Admin Dashboard

A responsive e-commerce admin dashboard built with React and Vite, featuring user authentication, product management, and dark/light theme support.

## Features

- **Authentication** — Signup, login, and logout flow with session persistence and protected routes
- **Product Management** — Add, list, and view product details, with an editable product form
- **Theme Toggle** — Dark/light mode switch
- **Responsive Sidebar Navigation** — Collapsible, offcanvas sidebar with a mobile trigger, built with shadcn/ui
- **Toast Notifications** — User feedback for actions like login, signup via Sonner
- **Custom 404 Page** — Graceful handling of unmatched routes
- **Loading & Error States** — Loading indicators for async data fetching

## Tech Stack

- **Framework:** React (Vite)
- **Routing:** React Router
- **Styling:** Tailwind CSS, shadcn/ui
- **HTTP Client:** Axios
- **Notifications:** Sonner
- **Icons:** Lucide React
- **API:** RESTful API (mockapi.io)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

1. Clone the repository
```bash
   git clone <your-repo-url>
   cd admin-dashboard
```

2. Install dependencies
```bash
   npm install
```

3. Start the development server
```bash
   npm run dev
```

### Build for Production

```bash
npm run build
```



## Notes

- Authentication and user/product data are handled through [mockapi.io](https://mockapi.io), a mock REST API service. This project uses it for demo purposes only — there is no real backend, password hashing, or session/token-based security. It is not intended for production use as-is.

## Author

**Amna Idrees**
