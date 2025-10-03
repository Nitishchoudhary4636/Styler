# 🚀 Vercel Deployment Steps for Styler E-commerce

## Step 1: Prepare Your Project
✅ All configuration files are ready!

## Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" 
3. Choose "Continue with GitHub" (recommended)
4. This will create your free Vercel account

## Step 3: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `styler-ecommerce`
4. Make it **Public** (required for free deployment)
5. Don't initialize with README (you have files already)
6. Click "Create repository"

## Step 4: Upload Your Project to GitHub

### Option A: Using GitHub Web Interface (Easiest)
1. In your new GitHub repository, click "uploading an existing file"
2. Drag and drop ALL files from your Styler folder:
   - All .html files (index.html, login.html, etc.)
   - All .js files (sript.js, api-config.js, etc.)  
   - style.css
   - package.json and vercel.json (we just created these)
   - Bags/ folder (drag the entire folder)
   - Shoes/ folder (drag the entire folder)
   - All other files except styler-backend folder
3. **IMPORTANT**: Do NOT upload the `styler-backend` folder
4. Write commit message: "Initial deployment setup"
5. Click "Commit changes"

### Option B: Using Git Commands (If you prefer terminal)
```bash
# Navigate to your Styler folder
cd "C:\Users\ASUS\Desktop\Styler"

# Initialize git (if not already done)
git init

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/styler-ecommerce.git

# Add all files except backend
git add *.html *.css *.js *.json *.md Bags/ Shoes/ *.webp *.jpg

# Commit files
git commit -m "Initial deployment setup"

# Push to GitHub
git push -u origin main
```

## Step 5: Deploy to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your `styler-ecommerce` repository
4. Vercel will automatically detect it's a static site
5. **Project Settings**:
   - Framework Preset: "Other"
   - Root Directory: `./` (default)
   - Build Command: Leave empty
   - Output Directory: `./` (default)
6. Click "Deploy"

## Step 6: Your Site is Live! 🎉
- Your site will be available at: `https://styler-ecommerce.vercel.app`
- Or a similar URL that Vercel provides
- It usually takes 1-2 minutes to deploy

## Step 7: Test Your Live Site
1. Visit your Vercel URL
2. Test all pages:
   - Homepage ✅
   - Products page ✅
   - Shoes page ✅
   - Login/Register ✅
   - Shopping cart ✅
   - Order placement ✅

## For Salesforce Marketing Cloud Testing
Your live site is now perfect for:
- Setting up tracking pixels
- Testing customer journeys
- A/B testing campaigns
- Collecting behavioral data
- Implementing conversion tracking

## Troubleshooting
If you encounter issues:
1. Check Vercel deployment logs in dashboard
2. Ensure all files were uploaded to GitHub
3. Verify package.json and vercel.json are in root directory
4. Contact me if you need help!

## Free Tier Limits (Vercel)
- ✅ Unlimited projects
- ✅ 100GB bandwidth per month
- ✅ Custom domain support
- ✅ Automatic HTTPS
- ✅ Global CDN

---
**Ready to deploy? Follow the steps above and your e-commerce site will be live in minutes!** 🚀