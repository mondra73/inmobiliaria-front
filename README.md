## Project overview

This frontend is part of a **private real estate management system** built for a licensed real estate broker.

It provides:
- A **public-facing website** to display available properties.
- A **restricted administrative dashboard** used internally to manage properties, clients, and operations.

The system is actively used in production and evolves based on real business needs.

---

## Core features

- Public property listings
- Detailed property views
- Hidden login access (`/login`)
- JWT-based authentication
- Role-based access control
- Protected routes for administrative views
- Full dashboard for internal management
- Image gallery management with Cloudinary
- Responsive UI for desktop and mobile
- SEO support (sitemap + robots)

---

## Authentication & authorization

- Authentication is handled using **JSON Web Tokens (JWT)**
- There is **no public registration flow**
- Users are created manually from the backend (e.g. via Postman)
- Only authenticated users can access the dashboard
- Administrative views require the **admin** role
- Route protection is enforced at the router level

This design keeps the platform private and prevents unauthorized access.

---

## Domain logic

The frontend reflects real-world real estate workflows:

- Public users can browse available properties
- Administrators can:
  - Create, edit, and delete properties
  - Manage image galleries
  - Manage clients
  - Associate clients with properties they want to buy, sell, or rent
- The dashboard centralizes all operational data used by the real estate agent

---

## Technical stack

- Vue 3 (Composition API)
- Vite
- Vue Router
- Vuetify 3
- Tailwind CSS
- Axios
- JWT-based authentication
- Cloudinary (media handling)

---

## Security note

- No credentials or secrets are committed to the repository
- Environment variables are handled via `.env` files (ignored by Git)
- Authentication tokens are handled securely on the client side
- Access to administrative views is restricted by role
