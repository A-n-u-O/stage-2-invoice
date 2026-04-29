# Frontend Wizards Stage 2 - Invoice Management App

A fully responsive, accessible, and feature-rich Invoice Management Application built for the Frontend Wizards Stage 2 Task. This application allows users to create, read, update, and delete invoices, manage draft/pending/paid statuses, and seamlessly switch between light and dark themes.

**Live Demo:** [Insert Vercel/Netlify Link Here]
**Figma Design:** [Insert Airtable/Figma Link Here]

##  Tech Stack

* **Framework:** React 18 + Vite (TypeScript)
* **Styling:** Tailwind CSS (v3)
* **Form Management & Validation:** React Hook Form + Zod
* **Icons & Utils:** Lucide React, date-fns
* **Data Persistence:** Browser `localStorage`

## Setup Instructions

To run this project locally, ensure you have Node.js installed, then follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [Insert Repository Link]
   cd stage-2-invoice
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port specified in your terminal).

##  Architecture Explanation

The application is structured to strictly separate concerns, ensuring scalability and readability:

* **Global State & Persistence (`/hooks/useInvoices.ts`):** A custom React hook acts as the central data store. It handles all CRUD operations and automatically syncs the state with the browser's `localStorage` to ensure data persists across sessions.
* **Theme Management (`/context/ThemeContext.tsx`):** A globally available Context API provider that manages the Light/Dark mode toggle, automatically applying the `dark` class to the HTML root and persisting user preference in `localStorage`.
* **Component-Based Routing (`App.tsx`):** Instead of using a heavy router library like React Router for a two-view application, `App.tsx` manages the view state, conditionally rendering the `<InvoiceList />` or `<InvoiceDetail />` to create a seamless SPA experience.
* **UI Components:** * The form is isolated within an `InvoiceForm` component and rendered inside a custom `Drawer` that slides in from the left to match the strict Figma specifications.
  * Form validation is strictly enforced using `Zod` schemas to guarantee data integrity before updating the global state.

##  Trade-offs

* **Local Storage vs. Real Backend:** To prioritize frontend logic, complex UI interactions, and state management within the task deadline, I opted to use `localStorage` for data persistence rather than spinning up a full Node/Express backend. This ensures a fast, client-side experience for the reviewer while demonstrating full CRUD logic.
* **Tailwind v3 vs. v4:** The project was initially scaffolded with Vite 8 and the new Tailwind v4 alpha. Due to peer dependency clashes and Vite cache instability with the experimental v4 plugin, I downgraded to the stable Tailwind v3. This traded the newest engine for immediate development stability and guaranteed build success.
* **State Management:** I utilized native React Context and custom hooks instead of Redux Toolkit. Given the scope of the app, Redux would have introduced unnecessary boilerplate.

##  Accessibility Notes

Accessibility was a priority throughout development, ensuring the app is usable for everyone:

* **Semantic HTML:** Utilized proper semantic tags like `<main>`, `<aside>`, and native `<form>` elements.
* **Keyboard Navigation:** The sliding Drawer and all Modals trap focus appropriately. Users can navigate form fields, checkboxes, and buttons entirely via the `Tab` key.
* **Escape Key Handling:** The Drawer and Modal components listen for the `Escape` key to close gracefully.
* **Color Contrast:** Meticulously followed the Figma design system to ensure all text, status badges, and background combinations meet WCAG AA contrast standards in both Light and Dark modes.
* **Aria Labels:** Icon-only interactive elements (like the Theme Toggle and Delete buttons) include descriptive `aria-labels` for screen readers.

##  Improvements Beyond Requirements

* **Zod Schema Validation:** Integrated strict Zod schema validation to handle edge cases (like preventing negative quantities or empty item lists) providing a bulletproof form experience.
* **Custom Dropdown Logic:** Built a bespoke, multi-select Checkbox Dropdown for the status filter to perfectly match the Figma UI, avoiding the limitations of standard native `<select>` elements.
```
