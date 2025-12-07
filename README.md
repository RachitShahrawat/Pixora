# 🎨 Pixora - AI Photo Editor

Pixora is a full-stack, subscription-based AI photo editing platform. It allows users to transform images using AI (background removal, generative fill) with a credit-based usage system.


## 🚀 Key Features

* **🤖 AI Image Processing:** Integrated **ImageKit API** for real-time image transformations and AI-powered editing.
* **🔐 Smart Authentication:** Secure Google OAuth 2.0 login via **NextAuth.js**, with custom logic to automatically provision user accounts and assign free tier quotas.
* **💳 Subscription System:** Full **Stripe Checkout** integration for purchasing credits and managing subscription plans.
* **📊 Usage Quotas:** Enforced editing limits per plan (Free/Pro) managed via **Prisma ORM** and MongoDB.
* **⚡ Modern UI:** Responsive, high-performance interface built with **Tailwind CSS v4** and **Framer Motion**.

## 🛠️ Tech Stack

### Core
* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** MongoDB (via [Prisma ORM](https://www.prisma.io/))

### Authentication & Payments
* **Auth:** [NextAuth.js](https://next-auth.js.org/) (Google Provider)
* **Payments:** [Stripe](https://stripe.com/)

### Media & UI
* **AI/Image Service:** [ImageKit](https://imagekit.io/)
* **Styling:** Tailwind CSS + Shadcn UI
* **State/Validation:** React Hook Form + Zod
