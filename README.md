# Next-trpc-capacitor

This is a template project to show how to add capacitor on top of Next.js and trpc. Bootstrapped with `create-t3-app`.

## How to

### 1. Run locally

- Clone the project and create a new repository from it; or fork the project and clone it
- cd into the project (`cd next-trpc-capacitor`)
- Install dependencies (e.g. `pnpm install`)
- Copy the `.env.example` file to a `.env` file and fill in the variables. You can already set the NEXT_PUBLIC_SERVER_URL env var to represent the url of your deployed server (e.g. https://your-project-name.vercel.app)
- Test if everything works locally (`npm run dev`)

### 2. Deploy to Vercel

- Go to your vercel dashboard, add a new project and link it to your github repository (https://vercel.com/dashboard).
  - ⚠️ Make sure to properly add the environment variables to avoid any error(NEXT_PUBLIC_SERVER_TYPE="production" and NEXT_PUBLIC_SERVER_URL="https://your-project-name.vercel.app")
- Check if your project builds and runs properly on vercel

### 3. Run on Capacitor

- Run `npm run cap`. This script will first execute `npm run build`, but with a modified version of the `next.config.mjs` file that gets created only when running `npm run cap` (for that, I set up a condition inside `next.config.mjs` that changes the NEXT_PUBLIC_SERVER_TYPE to "capacitor" and adds `config.output = "export"` to the config object). Then, it will execute `npx cap sync` to make sure you don't forget.
- Run `npx cap open android` (or `npx cap open ios`). This will open Android Studio and you can run the app on your device or emulator. If this command doesn't open Android Studio (or Xcode), you can open it manually and run the app from there.
