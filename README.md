# Genius

An enterprise web application that offers ~5 generative AI algorithms for conversation, image, video, and music creation. Built with TypeScript, React, Next.js, Prisma, PlanetScale, Stripe API, OpenAI API, Riffusion, and Zeroscope. [Live Link](https://genius-navy-zeta.vercel.app/)<br/>
<br/>

<img src="genius_screenshots/genius.png" alt="genius-logo" width="300"><br/>

### Functionality

Genius allows a user to -
- Sign up and create an account.
- Enter email verification code.
- Get free trial of 7 AI generations. 
- Generate text, images, video, music, and code.
- Pay for Genius Pro via Stripe.
- Switch to Genius Pro and unlock more generations.
- Remain auto-logged in after sign-up/log-in.


### Demo

1. Sign In

<img src="genius_screenshots/sign-in.gif" alt="sign in" width="600"><br/>

2. Conversation Generation

<img src="genius_screenshots/conversation-generation.gif" alt="conversation generation" width="600"><br/>

3. Music Generation

<img src="genius_screenshots/music-generation.gif" alt="music generation" width="600"><br/>

4. Image Generation

<img src="genius_screenshots/image-generation.gif" alt="image generation" width="600"><br/>

5. Video Generation

<img src="genius_screenshots/video-generation.gif" alt="video generation" width="600"><br/>


6. Code Generation

<img src="genius_screenshots/code-generation.gif" alt="code generation" width="600"><br/>

7. Upgrade to Pro

<img src="genius_screenshots/upgrade-pro.gif" alt="upgrade pro" width="600"><br/>

### System Design
<img src="genius_screenshots/genius-system.png" alt="genius system design"><br/>


### Technologies Used

- TypeScript
- React
- Next.js
- Prisma
- PlanetScale
- Stripe API
- OpenAI API
- Riffusion
- Zeroscope

### How to Run Locally

Step 1 - Clone the repository in a new directory:
```bash
git clone https://github.com/sarthak-wadhawan/genius.git
```

Step 2 - Create .env file in root directory with the following info:
```bash
# Clerk with Next.js. Docs (clerk.com/docs/quickstarts/nextjs)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Open AI API Docs (platform.openai.com/docs/api-reference)
NEXT_PUBLIC_OPENAI_API_KEY=

# Replicate API Docs (replicate.com/docs)
REPLICATE_API_TOKEN=

# Connection string options with Prisma: https://pris.ly/d/connection-strings
# PlanetScale Docs (planetscale.com/docs)
DATABASE_URL=
NEXT_PUBLIC_APP_URL=

# Stripe needs an absolute url. Docs (stripe.com/docs/api) 
NEXT_PUBLIC_STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

Step 3 - Push DB Schema
```bash
npx prisma db push

```
Step 4 - Run app locally
```bash
npm run dev
```



