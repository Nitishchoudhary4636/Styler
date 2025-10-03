# ✅ Railway Deployment Checklist

## Phase 1: Backend Setup (5-10 minutes)

### Step 1: Create GitHub Repository for Backend
- [ ] Go to GitHub.com
- [ ] Create new repository: `styler-backend`
- [ ] Make it **Public** (required for Railway free tier)
- [ ] Upload these files from your `styler-backend` folder:
  - [ ] All files in `src/` folder (your Java code)
  - [ ] `pom.xml`
  - [ ] `railway.json` 
  - [ ] `Procfile`
  - [ ] `.gitignore`
  - [ ] `README.md` (optional)

### Step 2: Deploy on Railway  
- [ ] Go to [railway.app](https://railway.app)
- [ ] Click "Login with GitHub"
- [ ] Click "New Project"
- [ ] Choose "Deploy from GitHub repo"
- [ ] Select your `styler-backend` repository
- [ ] Wait for deployment (2-3 minutes)

### Step 3: Add Database
- [ ] In Railway project dashboard
- [ ] Click "New" → "Database" → "Add PostgreSQL" 
- [ ] Database is ready instantly!

### Step 4: Copy Backend URL
- [ ] In Railway dashboard, copy your backend URL
- [ ] Should look like: `https://styler-backend-production-abc123.up.railway.app`
- [ ] Save this URL - you'll need it for frontend!

---

## Phase 2: Frontend Setup (5 minutes)

### Step 5: Update Frontend Configuration
- [ ] Open `api-config.js` in your Styler folder
- [ ] Find this line: `return window.BACKEND_URL || 'https://your-backend-url-here.up.railway.app';`
- [ ] Replace with your actual Railway URL: `return window.BACKEND_URL || 'https://styler-backend-production-abc123.up.railway.app';`
- [ ] Save the file

### Step 6: Create GitHub Repository for Frontend
- [ ] Create new repository: `styler-frontend`
- [ ] Upload ALL files from Styler folder EXCEPT:
  - [ ] ❌ Don't upload `styler-backend` folder
  - [ ] ❌ Don't upload `*.bat` files
  - [ ] ✅ Upload everything else (HTML, CSS, JS, images, config files)

### Step 7: Deploy Frontend on Vercel
- [ ] Go to [vercel.com](https://vercel.com)  
- [ ] Login with GitHub
- [ ] Click "New Project"
- [ ] Import your `styler-frontend` repository
- [ ] Click "Deploy"
- [ ] Get your live URL: `https://styler-frontend.vercel.app`

---

## Phase 3: Testing (2 minutes)

### Step 8: Test Your Live Site
Visit your Vercel URL and test:
- [ ] Homepage loads correctly
- [ ] User registration works (data goes to Railway database)
- [ ] Login works (checks Railway database)
- [ ] Add items to cart
- [ ] Place an order (stored in Railway database)
- [ ] View order history (retrieved from Railway database)
- [ ] Test from different browsers/devices (shared accounts!)

---

## 🎯 Success Criteria

When everything works, you'll have:
✅ **Live e-commerce website** on Vercel  
✅ **Real database** with shared user accounts  
✅ **Cloud backend** handling all API requests  
✅ **Professional setup** ready for Salesforce Marketing Cloud  
✅ **$0 monthly cost** (free tiers)  

---

## 🆘 Need Help?

**If you get stuck on any step:**
1. Check the detailed guide in `RAILWAY_DEPLOYMENT.md`
2. Ask me for help with the specific step
3. I can guide you through any issues!

**Your complete e-commerce platform will be live in about 15 minutes! 🚀**