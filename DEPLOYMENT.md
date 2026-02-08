# 🚀 GitHub Pages Deployment Guide for Kalyxon

Complete step-by-step guide to deploy Kalyxon to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your machine
- Node.js 16+ and npm installed
- This project folder ready

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `kalyxon`
3. **Description**: "A sophisticated learning platform for DSA, C++, JavaScript, OOP and more"
4. **Visibility**: Public
5. Click **Create repository**

## Step 2: Initialize Git Locally

In your project directory:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Kalyxon learning platform"

# Rename branch to main (if on master)
git branch -M main

# Add remote
git remote add origin https://github.com/kalyxon/kalyxon.git

# Push to GitHub
git push -u origin main
```

## Step 3: Setup gh-pages Package

The `gh-pages` package is already in `package.json`. Just install dependencies:

```bash
npm install
```

## Step 4: Build and Deploy

### First Time Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Build the project to `dist/` folder
2. Create a `gh-pages` branch
3. Push the build to GitHub

### Subsequent Deployments

After making changes:

```bash
# Quick deploy command
npm run deploy

# Or manually:
npm run build
npm run deploy
```

## Step 5: Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll to **Pages** section (left sidebar)
4. Under "Source", select **Deploy from a branch**
5. Select branch: `gh-pages`
6. Select folder: `/ (root)`
7. Click **Save**

**Wait 1-2 minutes** for the site to deploy.

## Step 6: Access Your Site

Your site will be live at:

```
https://kalyxon.github.io/kalyxon
```

## 🔄 Update Workflow

After making changes to your tutorials:

```bash
# 1. Add your changes
git add .

# 2. Commit
git commit -m "Add new tutorial: Topic Name"

# 3. Push to main branch
git push

# 4. Deploy to gh-pages
npm run deploy
```

## 🎯 Verifying Deployment

### Check Deployment Status

1. Go to your repository
2. Click **Actions** tab
3. Look for workflow run
4. Green checkmark = successful ✅

### Check the Live Site

Visit `https://kalyxon.github.io/kalyxon` and verify:
- [ ] Header loads correctly
- [ ] Logo and navigation visible
- [ ] Can sign in
- [ ] Tutorials load
- [ ] Code blocks display correctly
- [ ] Responsive on mobile

## 🐛 Troubleshooting

### Site Shows 404

**Problem**: GitHub Pages not configured correctly

**Solution**:
```bash
# Check vite.config.js has correct base:
# base: '/kalyxon/'

# Rebuild and redeploy
npm run build
npm run deploy

# Wait 2-3 minutes and refresh
```

### Changes Not Showing

**Problem**: Browser cache or old deployment

**Solution**:
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# Or clear cache and hard refresh
```

### Deploy Command Fails

**Problem**: gh-pages package issues

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try deploying again
npm run deploy
```

### Site Takes Long to Load

**Problem**: GitHub Pages caching

**Solution**:
- Wait 5 minutes
- Hard refresh browser
- Check browser console for errors (F12)

### Can't Push to GitHub

**Problem**: Authentication issue

**Solution**:
```bash
# Check remote is correct
git remote -v

# If wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/kalyxon/kalyxon.git

# Try pushing again
git push -u origin main
```

## 📊 How It Works

```
┌─────────────────┐
│  Your Local PC  │
│  (Edit Files)   │
└────────┬────────┘
         │ git push
         ↓
┌─────────────────┐
│   GitHub Repo   │
│  (main branch)  │
└────────┬────────┘
         │ npm run deploy
         ↓
┌─────────────────┐
│  GitHub Pages   │
│ (gh-pages build)│
└────────┬────────┘
         │ https://kalyxon.github.io/kalyxon
         ↓
┌─────────────────┐
│   Your Website  │
│  (Live Online)  │
└─────────────────┘
```

## 🔐 Security

- All code is open-source on GitHub
- No sensitive data is stored
- Site is static (no backend)
- HTTPS enabled by default
- No cookies or tracking

## 📈 Monitor Your Site

### GitHub Actions

Monitor deployment in **Actions** tab:
1. Click **Actions**
2. Look for latest workflow
3. Check if ✅ or ❌

### Performance

Check site speed at [PageSpeed Insights](https://pagespeed.web.dev/):
- Enter: `https://kalyxon.github.io/kalyxon`
- Target score: 95+

## 🎓 Next Steps

After deployment:

1. **Add more tutorials**: Update `src/data/tutorials.js`
2. **Customize styling**: Edit `src/styles/App.css`
3. **Share the link**: `https://kalyxon.github.io/kalyxon`
4. **Invite others**: Let friends learn from your content

## 💡 Pro Tips

### Automated Deployments

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy -- --nojekyll
```

### Custom Domain

To use a custom domain:
1. Add CNAME file to `public/` folder
2. Configure DNS records
3. Update GitHub Pages settings

### Faster Deployments

Use `gh-pages` CLI directly:

```bash
npm run predeploy && npx gh-pages -d dist
```

## 📞 Getting Help

If deployment fails:

1. **Check GitHub status**: [githubstatus.com](https://www.githubstatus.com/)
2. **Review error logs**: Actions tab
3. **Check configuration**: vite.config.js
4. **Verify package.json**: scripts section
5. **Read GitHub Pages docs**: [docs.github.com](https://docs.github.com/en/pages)

## 🎉 Success!

Once deployed, your site is live and accessible to anyone with the link!

**Share**: `https://kalyxon.github.io/kalyxon` with friends and fellow learners

---

**Need help?** Check the main README.md or create an issue on GitHub.

Happy deploying! 🚀
