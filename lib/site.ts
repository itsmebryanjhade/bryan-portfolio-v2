// TODO confirm production URL (fallback is a guess; set NEXT_PUBLIC_SITE_URL on Vercel)
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bryan-portfolio.vercel.app").replace(/\/$/, "");
