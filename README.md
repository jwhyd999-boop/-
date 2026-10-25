# AuraDL - Modern Media Downloader & Stream Inspector

AuraDL is a modern, responsive, mobile-first media downloader and stream inspector inspired by the clean, minimalist user experience of Cobalt.

Built with **React**, **TypeScript**, and **Tailwind CSS**, featuring full bilingual **English** & **Arabic** support (with dynamic RTL reflow) and **Dark / Light mode**.

---

## ✨ Key Features

- **Minimalist & Fast Interface**: Cobalt-inspired focused UI with zero distractions or intrusive ads.
- **Bilingual & RTL**: Seamless language toggle between English and Arabic (`العربية`) with mirrored layouts.
- **Dark / Light Mode**: Instant smooth theme switching with persistent local storage memory.
- **Format & Quality Control**:
  - **Video (MP4)**: Auto, 1080p (Full HD), 720p (HD), 480p (SD), 4K.
  - **Audio (MP3)**: 320 kbps (HQ), 256 kbps, 192 kbps, 128 kbps.
- **Smart URL Input**: 1-click clipboard paste, input clearing, keyboard shortcuts (`Enter` to inspect, `Esc` to clear).
- **Rich Media Preview Card**: High-definition thumbnail, duration, author, source domain, available streams, and estimated file size.
- **Honest Compliance & Ethics**:
  - Real browser downloads for direct files, public domain, and Creative Commons sources (e.g. Blender Open Projects, NASA space clips, Wikimedia).
  - User-owned local file inspector with in-browser video/audio player and metadata extractor.
  - Transparent **Demo Mode** for restricted third-party platforms with zero mock fake download deception.
  - Optional **Self-Hosted Backend** connector (Cobalt API v10 / yt-dlp) with a live connection ping test.
- **Zero Cost & Free Hosting**: Does not require any paid subscription, paid API key, or database.

---

## 🚀 Beginner Quick-Start Guide (Run Locally)

You do not need prior programming experience to run this project. Follow these simple steps:

### Prerequisites

1. Install **Node.js** (version 18 or higher) from [nodejs.org](https://nodejs.org).
2. Open your computer's terminal (Command Prompt or PowerShell on Windows, Terminal on Mac/Linux).

### Running the App

1. Download or clone this project folder.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd path/to/auradl
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your web browser and visit:
   ```
   http://localhost:3000
   ```

---

## 🌐 Deploy to Cloudflare Pages (Free, Recommended)

Cloudflare Pages provides free worldwide hosting with automatic SSL and unlimited bandwidth.

1. **Upload your code to GitHub**:
   - Go to [github.com](https://github.com) and create a free account if you don't already have one.
   - Create a new repository named `auradl`.
   - Run these commands in your project folder to upload your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of AuraDL"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/auradl.git
     git push -u origin main
     ```

2. **Connect to Cloudflare Pages**:
   - Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - In the left sidebar, click **Workers & Pages**.
   - Click **Create application** &rarr; select **Pages** &rarr; click **Connect to Git**.
   - Select your `auradl` repository from GitHub.

3. **Configure Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js Version**: (Leave default or set `NODE_VERSION` to `20`)

4. **Click "Save and Deploy"**:
   - Within 1 minute, your site will be live on a free `*.pages.dev` domain with automatic HTTPS!

---

## 🐙 Deploy to GitHub Pages (Alternative Free Option)

1. Open `vite.config.ts` and set the `base` path to your repository name:
   ```typescript
   export default defineConfig({
     base: '/auradl/',
     // ... rest of config
   });
   ```
2. Build the production files:
   ```bash
   npm run build
   ```
3. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment**, select **GitHub Actions** or deploy the `dist` branch.

---

## 🛠️ Optional: Connecting a Self-Hosted Cobalt Backend

If you want to download from platforms like YouTube, Twitter/X, TikTok, or Instagram using your own infrastructure:

1. Run the official Cobalt Docker container on your server or local computer:
   ```bash
   docker run -d \
     --name cobalt \
     --restart always \
     -p 9000:9000 \
     -e API_URL="http://localhost:9000" \
     ghcr.io/imputnet/cobalt:10
   ```
2. Open AuraDL in your browser.
3. Click the **Settings** icon (top right).
4. Turn on **Connect Self-Hosted Backend**.
5. Enter your server URL (`http://localhost:9000` or your public domain) and click **Test Connection**.
6. Click **Save Changes**. All requests will now route through your private instance!

---

## ⚖️ License & Ethical Standards

This frontend complies with open-source ethical standards:
- It does not bypass DRM or security mechanisms.
- It provides built-in support for Creative Commons, Public Domain, and user-owned media.
- Users are responsible for ensuring they possess rights to any media processed via self-hosted endpoints.
