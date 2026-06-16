# Vercel Deployment Guide — Pawan Kumar Portfolio

Follow these step-by-step instructions to deploy your premium interactive portfolio to Vercel.

---

## ⚡ Prerequisites
Make sure you have:
1. A **Vercel account** (sign up at [vercel.com](https://vercel.com) using your GitHub account).
2. The codebase successfully pushed to GitHub (completed: [github.com/pawan646435/Portfolio](https://github.com/pawan646435/Portfolio)).

---

## 🚀 Deployment Steps

### Step 1: Create a Vercel Project
1. Log in to the **Vercel Dashboard**.
2. Click the **"Add New..."** button in the top right, then select **"Project"**.

### Step 2: Import Your Repository
1. Under **"Import Git Repository"**, select your GitHub account.
2. Locate the repository named `Portfolio` (or search for `pawan646435/Portfolio`).
3. Click **"Import"**.

### Step 3: Configure Project Settings
Vercel will automatically detect that this is a **Next.js** application. Keep the default settings:
- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (default)
- **Build & Development Settings**: Keep defaults (Vercel will run `next build` automatically).

### Step 4: Configure Environment Variables
This portfolio does not require any environment variables to run. Simply proceed with the default settings.

### Step 5: Deploy! 🎉
1. Click the **"Deploy"** button.
2. Vercel will install dependencies, build the application (using Turbopack), and generate the static pages.
3. Once completed (usually takes less than 2 minutes), you will receive a congratulations screen and a live deployment URL (e.g., `portfolio-xxx.vercel.app`).

---

## 🌐 Custom Domain Setup (Optional)
If you want to map a custom domain (e.g., `pawankumar.dev` or similar) to your new portfolio:
1. Go to your project page on Vercel.
2. Navigate to **Settings** → **Domains**.
3. Type your custom domain name and click **"Add"**.
4. Configure the **CNAME** or **A Records** on your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.) pointing to Vercel's servers as prompted by Vercel.

---

## 🔄 Automatic Redeployments
Now that your GitHub repository is connected to Vercel, every time you make changes locally and push them (`git push`), Vercel will automatically trigger a new production build and redeploy the changes seamlessly!
