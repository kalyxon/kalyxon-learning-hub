# ✅ Installation & Deployment Checklist

Complete checklist to set up and deploy Kalyxon successfully.

## 📋 Pre-Installation Checklist

### System Requirements
- [ ] Have Node.js 16+ installed (`node --version`)
- [ ] Have npm 8+ installed (`npm --version`)
- [ ] Have Git installed (`git --version`)
- [ ] Have GitHub account created
- [ ] Have 500MB free disk space

### Files & Resources
- [ ] All project files downloaded/extracted
- [ ] Project folder named "kalyxon"
- [ ] No spaces or special characters in path
- [ ] Read README.md and QUICKSTART.md

## 🔧 Installation Steps

### 1. Initial Setup (5 minutes)

- [ ] Open terminal/command prompt
- [ ] Navigate to project folder: `cd kalyxon`
- [ ] Run: `npm install`
- [ ] Wait for all dependencies to install
- [ ] No errors in console (warnings OK)

### 2. Test Local Development (2 minutes)

- [ ] Run: `npm run dev`
- [ ] Browser opens automatically
- [ ] See Kalyxon homepage
- [ ] Can navigate between pages
- [ ] Code blocks display correctly
- [ ] Sign in works with any username
- [ ] Progress page loads
- [ ] Stop dev server (Ctrl+C)

### 3. Verify Build (2 minutes)

- [ ] Run: `npm run build`
- [ ] `dist/` folder created
- [ ] Files in dist/ folder
- [ ] Build completes without errors

## 🌐 GitHub Setup

### 1. Create Repository (2 minutes)

- [ ] Go to [github.com/new](https://github.com/new)
- [ ] Repository name: `kalyxon`
- [ ] Set to **Public** (important for GitHub Pages)
- [ ] **Don't** initialize with README
- [ ] Click **Create repository**
- [ ] Note the repository URL (you'll need it)

### 2. Configure Git Locally (3 minutes)

In your terminal:

```bash
# Initialize git
git init

# Set username and email (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add files
git add .

# Create commit
git commit -m "Initial commit: Kalyxon learning platform"

# Rename branch to main
git branch -M main

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/kalyxon.git

# Push to GitHub
git push -u origin main
```

- [ ] Command completes successfully
- [ ] No authentication errors
- [ ] Files appear on GitHub website

### 3. Deploy to GitHub Pages (3 minutes)

- [ ] Run: `npm run deploy`
- [ ] Waits 30-60 seconds
- [ ] Completes with success message
- [ ] Check GitHub repository → Actions tab
- [ ] Green checkmark ✅ on latest workflow

### 4. Enable GitHub Pages (2 minutes)

- [ ] Go to GitHub repository
- [ ] Click **Settings** tab
- [ ] Scroll to **Pages** section (left sidebar)
- [ ] Source: **Deploy from a branch**
- [ ] Branch: **gh-pages**
- [ ] Folder: **/ (root)**
- [ ] Click **Save**
- [ ] Wait 2-3 minutes

### 5. Verify Live Website (2 minutes)

- [ ] Go to: `https://USERNAME.github.io/kalyxon`
- [ ] Page loads successfully
- [ ] See Kalyxon homepage
- [ ] Not showing 404 error
- [ ] Can navigate site
- [ ] Sign in works
- [ ] Tutorials load with syntax highlighting

## 🎨 Customization Checklist

### Basic Customizations

- [ ] Change accent color in `src/styles/App.css`
- [ ] Update logo text in `src/App.jsx`
- [ ] Update site title in `index.html`
- [ ] Add your favicon (optional)
- [ ] Review tutorials in `src/data/tutorials.js`

### Test After Customization

- [ ] Run: `npm run dev`
- [ ] Changes appear in browser
- [ ] Stop dev server (Ctrl+C)
- [ ] Run: `npm run build`
- [ ] Run: `npm run deploy`
- [ ] Changes appear on GitHub Pages (wait 2 min)

## 📝 Add Your First Tutorial

### Quick Tutorial Addition

- [ ] Open `src/data/tutorials.js`
- [ ] Find `tutorialData` array
- [ ] Copy a tutorial object
- [ ] Change id, title, category, difficulty
- [ ] Update content field with your markdown
- [ ] Save file
- [ ] Test locally with `npm run dev`
- [ ] Deploy: `git add . && git commit -m "Add tutorial" && git push && npm run deploy`
- [ ] Verify on live website

### Tutorial Content Checklist

- [ ] Tutorial has H1 heading
- [ ] Sections use H2 headings
- [ ] Code blocks have language specified (\`\`\`cpp, \`\`\`js, etc)
- [ ] Links work (or are markdown formatted)
- [ ] Tables are properly formatted
- [ ] Images use full URLs
- [ ] No broken syntax highlighting

## 🔍 Quality Assurance

### Desktop Testing

- [ ] [ ] Chrome/Chromium: Site works
- [ ] [ ] Firefox: Site works
- [ ] [ ] Safari: Site works
- [ ] [ ] Microsoft Edge: Site works
- [ ] [ ] All buttons clickable
- [ ] [ ] All links work
- [ ] [ ] Code highlights correctly

### Mobile Testing

- [ ] [ ] Responsive on small phones
- [ ] [ ] Navigation sidebar works
- [ ] [ ] Tutorials readable on mobile
- [ ] [ ] Code blocks scroll properly
- [ ] [ ] Sign in works on mobile
- [ ] [ ] Progress page displays correctly

### Content Testing

- [ ] [ ] All tutorials appear in sidebar
- [ ] [ ] Tutorial content loads
- [ ] [ ] Code syntax highlighting works
- [ ] [ ] Copy button on code blocks works
- [ ] [ ] Markdown formatting correct
- [ ] [ ] Tables display properly
- [ ] [ ] Links are clickable

### Functionality Testing

- [ ] [ ] Can sign in (any username)
- [ ] [ ] Can select tutorials
- [ ] [ ] Can mark tutorials complete
- [ ] [ ] Can view progress page
- [ ] [ ] Progress tracking works
- [ ] [ ] Achievements appear
- [ ] [ ] Category breakdown shows
- [ ] [ ] Can navigate between pages

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All files committed to git
- [ ] No uncommitted changes
- [ ] Tested locally with `npm run dev`
- [ ] No console errors
- [ ] Build succeeds with `npm run build`

### Deployment Steps

- [ ] Run: `npm run build`
- [ ] Verify dist/ folder created
- [ ] Run: `npm run deploy`
- [ ] Wait for completion
- [ ] Check GitHub Actions for success
- [ ] Wait 2-3 minutes
- [ ] Refresh live website
- [ ] Verify changes appear

### Post-Deployment

- [ ] Check GitHub Actions green ✅
- [ ] Visit GitHub Pages URL
- [ ] Site loads without 404
- [ ] All content displays
- [ ] No broken images/links
- [ ] Mobile view works

## 🐛 Troubleshooting Checklist

### Site Not Loading

- [ ] Check GitHub Pages URL is correct
- [ ] URL matches: `https://USERNAME.github.io/kalyxon`
- [ ] GitHub Pages enabled in Settings
- [ ] gh-pages branch exists
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Clear browser cache
- [ ] Wait 5 minutes and retry

### Changes Not Showing

- [ ] Committed all changes (`git status` shows clean)
- [ ] Pushed to GitHub (`git push`)
- [ ] Deployed to GitHub Pages (`npm run deploy`)
- [ ] Hard refreshed browser
- [ ] Waited 2+ minutes
- [ ] Check in browser DevTools (F12)

### Build Fails

- [ ] Run: `npm install` again
- [ ] Delete node_modules: `rm -rf node_modules`
- [ ] Clear cache: `npm cache clean --force`
- [ ] Reinstall: `npm install`
- [ ] Try build again: `npm run build`
- [ ] Check for syntax errors in .jsx/.js files

### Deployment Fails

- [ ] Check GitHub authentication
- [ ] Verify remote URL: `git remote -v`
- [ ] Ensure gh-pages installed: `npm install`
- [ ] Check branch is main: `git branch`
- [ ] Try deployment again: `npm run deploy`
- [ ] Check Actions tab for error details

## 📚 Documentation Checklist

- [ ] Read README.md
- [ ] Read QUICKSTART.md
- [ ] Read DEPLOYMENT.md
- [ ] Read TUTORIAL_FORMAT.md
- [ ] Read FILE_STRUCTURE.md
- [ ] Understand CSS variables in App.css
- [ ] Know where tutorials are stored

## 🎯 Success Criteria

Your setup is successful when:

✅ All checkboxes above are completed  
✅ Website loads at GitHub Pages URL  
✅ Can sign in and navigate  
✅ Tutorials display correctly  
✅ Code syntax highlighting works  
✅ Progress tracking functions  
✅ Responsive on mobile  
✅ No console errors  
✅ No 404 errors  
✅ Can add new tutorials  

## 📋 Maintenance Checklist (Ongoing)

### Weekly

- [ ] Check site loads
- [ ] Test sign in
- [ ] Verify tutorials work
- [ ] Check console for errors

### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Check for npm vulnerabilities: `npm audit`
- [ ] Review tutorial content
- [ ] Test on different browsers

### Quarterly

- [ ] Review GitHub Actions logs
- [ ] Check storage usage
- [ ] Consider new features
- [ ] Get feedback from users

## 🎓 Learning Objectives

After completing this checklist, you can:

- [ ] Set up a Node.js/React project
- [ ] Use Vite for development and building
- [ ] Deploy to GitHub Pages
- [ ] Manage Git repositories
- [ ] Edit React components
- [ ] Work with CSS styling
- [ ] Add Markdown content
- [ ] Troubleshoot common issues

## 🏁 Final Verification

Last checks before considering complete:

```bash
# Should show no errors
npm run build

# Should deploy successfully
npm run deploy

# In browser at https://USERNAME.github.io/kalyxon/
# Should see Kalyxon homepage
# Should work on mobile
# Should be fast
```

- [ ] Build succeeds
- [ ] Deploy succeeds
- [ ] Site loads
- [ ] Mobile works
- [ ] All tutorials visible
- [ ] Authentication works
- [ ] Progress tracking works

## 🎉 You're Done!

When all checkboxes are complete:

✨ Your learning platform is live!  
✨ Ready to add tutorials!  
✨ Ready to share with others!  

## 📞 Need Help?

If stuck on any checklist item:

1. Check relevant documentation file
2. Review error messages in console
3. Check GitHub Actions tab for deployment logs
4. Try the troubleshooting section above
5. Create issue on GitHub with details

---

**Print this checklist and track your progress!** 📋

Good luck! 🚀
