export const SiteConfig = {
  title: "From-A2B",
  description: "From A2B is a simple and easy solution to manage your trips.",
  prodUrl: "https://from-a2b.fr",
  domain: "from-a2b.fr",
  appIcon: "/images/icon.png",
  company: {
    name: "From-A2B Inc.",
    address: "In the cloud",
  },
  brand: {
    primary: "#007291",
  },
  maker: {
    image:
      "https://cdn.discordapp.com/guilds/967848470515957791/users/152125692618735616/avatars/baba391f8e5b12b9f396445d0ed36bdc.webp?size=256",
    website: "https://dercraker.fr/",
    name: "Dercraker",
  },
  features: {
    /**
     * If enable, you need to specify the logic of upload here : src/features/images/uploadImageAction.tsx
     * You can use Vercel Blob Storage : https://vercel.com/docs/storage/vercel-blob
     * Or you can use Cloudflare R2 : https://mlv.sh/cloudflare-r2-tutorial
     * Or you can use AWS S3 : https://mlv.sh/aws-s3-tutorial
     */
    enableImageUpload: true as boolean,
    /**
     * If enable, you need to go to src/lib/auth/auth.ts and uncomment the line with the emoji 🔑
     * This feature will authorize users to login with a password.
     * Customize the signup form here : app/auth/signup/page.tsx
     */
    enablePasswordAuth: false as boolean,
    /**
     * If enable, the user will be redirected to `/orgs` when he visits the landing page at `/`
     * The logic is located in middleware.ts
     */
    enableLandingRedirection: true as boolean,
    /**p
     * If enable, the user will be able to create only ONE organization and all his settings will be synced with it.
     * It's disable the `/settings` page from the organization and the `/orgs/new` page.
     */
    enableSingleMemberOrg: true as boolean,
  },
};
