# Foodie FOMO

A location-aware foodie app built with Next.js that helps users discover nearby restaurants, view a map for the nearest recommendation, and see one special dish from each place.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy for free (recommended: Vercel)

### Option 1: One-click deploy

Use the button below after pushing this repo to GitHub.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo-name)

> Replace `your-username/your-repo-name` with your real GitHub repository path.

### Option 2: Vercel dashboard (no CLI required)

1. Create a free account at [vercel.com](https://vercel.com).
2. Click **Add New → Project**.
3. Import this GitHub repository.
4. Keep default settings (Framework: **Next.js**).
5. Click **Deploy**.

Vercel will give you a free live URL like:

`https://foodie-fomo-yourname.vercel.app`

### Option 3: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

## Notes

- The app uses browser geolocation. If location permission is denied, it falls back to default restaurant ordering.
- The embedded map uses OpenStreetMap, so no paid API key is required.

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
