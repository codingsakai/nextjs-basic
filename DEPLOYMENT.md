# Free Deployment Guide (Foodie FOMO)

This project can be deployed for free using Vercel's hobby tier.

## Prerequisites

- A GitHub account
- A Vercel account (free)

## Steps

1. Push this codebase to a GitHub repository.
2. Sign in to Vercel and import the GitHub repository.
3. Confirm build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` (default)
   - **Install Command**: `npm install` (default)
4. Deploy.
5. After deployment, open your Vercel URL and test:
   - Restaurant list renders.
   - "Use my location" updates nearest ordering.
   - Map section displays nearest recommendation.

## Custom domain (optional)

You can connect a custom domain in Vercel for free and keep SSL enabled automatically.

## Troubleshooting

- If geolocation does not work, ensure browser location permissions are allowed for your deployed domain.
- If map iframe appears blank, refresh once and confirm network access to `openstreetmap.org`.
