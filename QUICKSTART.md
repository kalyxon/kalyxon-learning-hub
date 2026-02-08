# ⚡ Quick Start Guide - 5 Minutes to Launch

Get Kalyxon up and running in 5 minutes!

## ✅ Prerequisites (1 minute)

You need:
- [ ] Node.js 16+ ([nodejs.org](https://nodejs.org/))
- [ ] Git ([git-scm.com](https://git-scm.com/))
- [ ] GitHub account ([github.com](https://github.com/))

Check installation:
```bash
node --version    # Should show v16+
npm --version     # Should show 8+
git --version     # Should show 2+
```

## 🚀 Local Setup (2 minutes)

### 1. Download Project

```bash
# Option A: Clone if already on GitHub
git clone https://github.com/kalyxon/kalyxon.git
cd kalyxon

# Option B: Or use files directly
# Place all files in a folder named 'kalyxon'
cd kalyxon
```

### 2. Install Dependencies

```bash
npm install
```

Takes about 1-2 minutes depending on internet speed.

### 3. Start Development Server

```bash
npm run dev
```

Your browser opens automatically to `http://localhost:3000`

**You're running locally! ✅**

## 🌐 Deploy to GitHub (2 minutes)

### 1. Create GitHub Repo

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `kalyxon`
3. Click **Create repository**

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kalyxon.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Deploy to GitHub Pages

```bash
npm run deploy
```

Waits 1-2 minutes...

**Done!** Visit: `https://YOUR_USERNAME.github.io/kalyxon`

Replace `YOUR_USERNAME` with your GitHub username.

## 🎯 Verify Deployment

Check your site:
1. Visit your GitHub Pages URL
2. Sign in with any username
3. Click a tutorial
4. Check code syntax highlighting

If it works → **You're live!** 🎉

## 📝 Add Your First Tutorial

### Quick Steps

1. Open `src/data/tutorials.js`
2. Find the `tutorialData` array
3. Add a new tutorial before the last `}`

Example:

```javascript
{
  id: 'my-first-tutorial',
  title: 'My First Tutorial',
  category: 'JavaScript',
  difficulty: 'Beginner',
  content: `# My First Tutorial

## Introduction
This is my first tutorial!

## Code Example
\`\`\`javascript
console.log("Hello from Kalyxon!");
\`\`\`

## Summary
Great job learning!`
}
```

### Deploy Changes

```bash
git add .
git commit -m "Add my first tutorial"
git push
npm run deploy
```

Refresh your site after 1 minute to see changes.

## 📋 File Locations Quick Reference

```
kalyxon/
├── src/
│   ├── components/     ← UI components
│   ├── styles/         ← CSS styling
│   ├── data/
│   │   └── tutorials.js    ← 🌟 ADD YOUR TUTORIALS HERE
│   └── App.jsx         ← Main app
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
└── README.md           ← Full documentation
```

## 🔧 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Both build and deploy
npm run build && npm run deploy
```

## 🆘 Common Issues & Fixes

### "npm command not found"

**Fix**: Install Node.js from [nodejs.org](https://nodejs.org/)

### "Deploy fails"

**Fix**:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/kalyxon.git
npm run deploy
```

### "Site shows 404"

**Fix**:
1. Go to GitHub repository Settings → Pages
2. Select `gh-pages` branch
3. Click Save
4. Wait 2 minutes and refresh

### "Changes not showing"

**Fix**: Hard refresh browser
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

## 📚 Next Steps

1. **Read full docs**: [README.md](README.md)
2. **Learn tutorial format**: [TUTORIAL_FORMAT.md](TUTORIAL_FORMAT.md)
3. **Detailed deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Add more tutorials**: Edit `src/data/tutorials.js`
5. **Customize design**: Edit `src/styles/App.css`

## 🎨 Quick Customizations

### Change Colors

Edit `src/styles/App.css`:

```css
:root {
  --color-accent: #ff6b35;  ← Change this color
}
```

### Change Logo Text

Edit `src/App.jsx`:

```javascript
<h1 className="logo">Your Name</h1>  ← Change text
```

### Change Site Title

Edit `index.html`:

```html
<title>Your Learning Platform</title>  ← Change title
```

## ✨ Features You Have

- ✅ Markdown-based tutorials
- ✅ Code syntax highlighting
- ✅ User authentication
- ✅ Progress tracking
- ✅ Responsive design
- ✅ GitHub Pages hosting
- ✅ Free forever
- ✅ No ads

## 🎓 Learning Path

Recommended order to explore:

1. **Local setup** (done!)
2. **Deploy** (done!)
3. **Add tutorial** (next)
4. **Customize colors** (optional)
5. **Share with others** (fun!)
6. **Add more content** (ongoing)

## 💬 Example Commands

### Create and deploy a new tutorial

```bash
# 1. Edit src/data/tutorials.js (add tutorial)
# 2. Test locally
npm run dev

# 3. Deploy when ready
git add .
git commit -m "Add: Sorting Algorithms tutorial"
git push
npm run deploy
```

### Update existing tutorial

```bash
# 1. Edit tutorial in src/data/tutorials.js
# 2. Test
npm run dev

# 3. Deploy
git add .
git commit -m "Update: Fix typos in Arrays tutorial"
git push
npm run deploy
```

## 🏁 Success Checklist

- [ ] Node.js installed
- [ ] Project files ready
- [ ] `npm install` completed
- [ ] `npm run dev` works
- [ ] Opened in browser
- [ ] GitHub repo created
- [ ] Pushed to GitHub
- [ ] `npm run deploy` succeeded
- [ ] GitHub Pages enabled
- [ ] Site visible at public URL
- [ ] Can sign in
- [ ] Tutorials display

**All checked?** You're all set! 🎉

## 🚀 You're Ready!

You now have:
- Local development environment
- Deployed live website
- Ability to add tutorials
- Progress tracking system
- Professional learning platform

**Start adding your tutorials and share with others!**

---

### Need more help?

📖 Full docs: [README.md](README.md)  
📝 Tutorial guide: [TUTORIAL_FORMAT.md](TUTORIAL_FORMAT.md)  
🌐 Deploy guide: [DEPLOYMENT.md](DEPLOYMENT.md)

Happy learning! 🚀
