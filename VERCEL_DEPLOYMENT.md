# 🚀 Deploying Droply to Vercel - Complete Guide

This guide will walk you through deploying your Droply application to Vercel step by step.

---

## Prerequisites

Before you begin, ensure you have:

- ✅ A Vercel account ([Sign up here](https://vercel.com/signup))
- ✅ Your GitHub repository pushed to `main` branch
- ✅ All API keys ready (Clerk, NeonDB, ImageKit)

---

## Step 1: Connect Your Repository to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com](https://vercel.com)
   - Click **"Add New..."** → **"Project"**

2. **Import Git Repository**
   - Click **"Import Git Repository"**
   - Select **GitHub** as your provider
   - Authorize Vercel to access your GitHub account if prompted

3. **Select Your Repository**
   - Find and select **`Priyap1038/Droply`**
   - Click **"Import"**

4. **Configure Project**
   - **Project Name:** `droply` (or your preferred name)
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

5. **Set Production Branch**
   - Under **Git** settings, ensure **Production Branch** is set to `main`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project directory
cd c:\Users\Priya\.gemini\antigravity\playground\velvet-kuiper\drop-ly

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## Step 2: Configure Environment Variables

You need to add all environment variables from your `.env.local` file to Vercel.

### How to Add Environment Variables in Vercel:

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**

2. Add each variable one by one:

#### Database Configuration

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `DATABASE_URL` | Your NeonDB connection string | Production, Preview, Development |

#### Clerk Authentication

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key | Production, Preview, Development |
| `CLERK_SECRET_KEY` | Your Clerk secret key | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` | Production, Preview, Development |

#### ImageKit Configuration

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY` | Your ImageKit public key | Production, Preview, Development |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL endpoint | Production, Preview, Development |
| `IMAGEKIT_PUBLIC_KEY` | Your ImageKit public key | Production, Preview, Development |
| `IMAGEKIT_PRIVATE_KEY` | Your ImageKit private key | Production, Preview, Development |

#### App Configuration

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL (e.g., `https://droply.vercel.app`) | Production |
| `NEXT_PUBLIC_APP_URL` | `https://your-preview-url.vercel.app` | Preview |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Development |

### Quick Copy Template

```env
# Database
DATABASE_URL=your_neondb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## Step 3: Deploy

### First Deployment

1. After adding all environment variables, click **"Deploy"**
2. Vercel will start building your application
3. Wait for the build to complete (usually 2-5 minutes)

### Monitor Build Progress

You can watch the build logs in real-time:
- Click on the deployment in progress
- View the **"Building"** tab to see logs
- Check for any errors or warnings

---

## Step 4: Update Clerk Redirect URLs

After deployment, you need to update Clerk with your Vercel URL:

1. **Go to Clerk Dashboard**
   - Visit [https://dashboard.clerk.com](https://dashboard.clerk.com)
   - Select your application

2. **Update URLs**
   - Go to **"Paths"** or **"URLs"** settings
   - Add your Vercel deployment URL to:
     - **Authorized redirect URLs**
     - **Authorized origins**
   
   Example:
   ```
   https://droply.vercel.app
   https://droply.vercel.app/sign-in
   https://droply.vercel.app/sign-up
   ```

---

## Step 5: Verify Deployment

### Check Application Status

1. **Visit Your Deployment URL**
   - Vercel will provide a URL like: `https://droply.vercel.app`
   - Open it in your browser

2. **Test Core Features**
   - ✅ Homepage loads correctly
   - ✅ Sign up / Sign in works
   - ✅ Dashboard is accessible
   - ✅ File upload works
   - ✅ File download works
   - ✅ Database operations work

### Check Deployment Logs

If something doesn't work:
1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Check **"Functions"** tab for runtime logs
4. Check **"Building"** tab for build logs

---

## Troubleshooting

### Build Fails with "Invalid runtime" Error

**Solution:** Already fixed in your code! The runtime is now set to `"nodejs"` instead of `"node.js"`.

### Deprecated Package Warnings

**Solution:** Already fixed! We removed `@nextui-org/react` and migrated to `@heroui`.

### Environment Variables Not Working

**Solution:**
1. Verify all variables are added in Vercel dashboard
2. Ensure they're enabled for "Production" environment
3. Redeploy after adding variables

### Database Connection Fails

**Solution:**
1. Check your `DATABASE_URL` is correct
2. Ensure NeonDB allows connections from Vercel IPs
3. Verify the connection string includes `?sslmode=require`

### Clerk Authentication Fails

**Solution:**
1. Update Clerk dashboard with your Vercel URL
2. Verify all Clerk environment variables are set
3. Check that redirect URLs match exactly

### ImageKit Upload Fails

**Solution:**
1. Verify all ImageKit keys are correct
2. Check ImageKit dashboard for API usage limits
3. Ensure CORS is configured in ImageKit settings

---

## Continuous Deployment

Once set up, Vercel will automatically deploy:
- **Production:** When you push to `main` branch
- **Preview:** When you create a pull request

To manually trigger a deployment:
1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click **"Redeploy"** on any deployment

---

## Custom Domain (Optional)

To add a custom domain:

1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

---

## Monitoring & Analytics

Vercel provides built-in monitoring:

- **Analytics:** Track page views and performance
- **Logs:** View function execution logs
- **Speed Insights:** Monitor Core Web Vitals

Access these from your project dashboard.

---

## Need Help?

- **Vercel Documentation:** [https://vercel.com/docs](https://vercel.com/docs)
- **Vercel Support:** [https://vercel.com/support](https://vercel.com/support)
- **GitHub Issues:** [https://github.com/Priyap1038/Droply/issues](https://github.com/Priyap1038/Droply/issues)

---

**🎉 Congratulations! Your Droply application is now live on Vercel!**
