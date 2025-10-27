# Frontend Development Guide

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create .env file:

```bash
cp .env.example .env
```

3. Run development server:

```bash
npm run dev
```

4. Open browser at: http://localhost:5173

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   └── LoadingSpinner.tsx
│
├── pages/          # Page components
│   ├── TheoryPage.tsx
│   ├── MapPage.tsx
│   ├── ForumPage.tsx
│   └── PostDetailPage.tsx
│
├── services/       # API services
│   └── api.ts
│
├── types/          # TypeScript type definitions
│   └── index.ts
│
├── config/         # Configuration files
│   └── api.ts
│
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **React Leaflet** - Maps
- **Recharts** - Charts
- **Lucide React** - Icons

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

## Styling

Using TailwindCSS utility classes.

### Color Palette

- Primary: `primary-500` (#2D9CDB)
- Gray: `gray-50` to `gray-900`
- Success: `green-500`
- Warning: `orange-500`
- Danger: `red-500`

### Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## API Integration

All API calls go through `src/services/api.ts`.

Example usage:

```typescript
import ApiService from "@/services/api";

// Get posts
const posts = await ApiService.getPosts();

// Create post
const newPost = await ApiService.createPost({
  title: "My Post",
  content: "Content here",
});
```

## Components Guide

### Layout

Main layout wrapper with navbar.

### Navbar

Fixed navigation with responsive design.

### LoadingSpinner

Show during async operations.

## Pages Guide

### TheoryPage

- Displays theory sections
- Supports multiple media types
- Fetches from `/api/theory/sections/`

### MapPage

- Interactive Vietnam map
- Markers for case studies
- Detail panel on marker click

### ForumPage

- Three tabs: Dashboard, Forum, Solutions
- Charts using Recharts
- Post list with voting

### PostDetailPage

- Full post content
- Vote buttons
- Comments section

## Type Safety

All API responses are typed in `src/types/index.ts`.

Use TypeScript interfaces for props and state.

## Best Practices

1. Use functional components with hooks
2. Keep components small and focused
3. Extract reusable logic to custom hooks
4. Use TypeScript for type safety
5. Follow TailwindCSS utility-first approach
6. Handle loading and error states
7. Optimize images and assets

## Build for Production

```bash
npm run build
```

Output in `dist/` directory.

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

Set environment variables in dashboard.
