# ShortLinkr

ShortLinkr is a user-friendly URL shortener that allows you to transform long web addresses into concise, shareable URLs. Simplify sharing across social media, emails, and messaging apps with ease. Try it now and streamline your links!

![Initial page](../assets/screenshots/demo.png)

## Features

- Convert long URLs into short, easy-to-share links.
- User-friendly interface for quick link generation.
- OAuth authentication with Google and GitHub

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v16 or higher)

## Getting Started

1. Clone the repository:

   ```bash
    git clone https://github.com/FelipeSimis/shortlinkr.git
   ```

2. Navigate to the project directory:

   ```bash
    cd shortlinkr
   ```

3. Install dependencies:

   ```bash
    yarn
   ```

4. Set up environment variables:

   - Create a `.env` file in the project root.
   - Define the required environment variables in the `.env` file. Here's an example:

     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
     CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY

     NEXT_PUBLIC_BASE_URL=YOUR_BASE_URL

     DATABASE_URL=YOUR_DATABASE_URL
     ```

5. Run the development server:

   ```bash
    yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was built using various open-source libraries, frameworks, and APIs. Special thanks to the developers and contributors of the following technologies:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/)
- [Shadcn](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Prisma](https://prisma.io/)
- [Zod](https://github.com/colinhacks/zod)

## Demo

[Live Demo](https://shortlinkr.vercel.app)
