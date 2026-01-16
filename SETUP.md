# 🚀 CryptoPlatform Setup Guide

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 3. Configure Required APIs

#### Firebase (Authentication & Database)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication (Email, Google, GitHub)
4. Copy config to `.env.local`

#### CoinGecko API (Market Data)

1. Visit [CoinGecko API](https://www.coingecko.com/en/api)
2. Sign up and get API key
3. Add to `NEXT_PUBLIC_COINGECKO_API_KEY`

#### WalletConnect (Web3 Features)

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create project
3. Add Project ID to `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - You're ready! 🎉

## Detailed Setup Instructions

See README.md for comprehensive setup guide with screenshots and troubleshooting.

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- Netlify: Works out of the box
- Cloudflare Pages: Pre-configured
- Self-hosted: `npm run build && npm start`

## Need Help?

Check the README.md for:

- Complete API setup guides
- Troubleshooting common issues
- Feature documentation
- Deployment instructions
