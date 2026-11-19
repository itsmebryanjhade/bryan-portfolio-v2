// The live site; NEXT_PUBLIC_SITE_URL can still override it (for example on a preview deploy).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bryan.sanx.dev").replace(/\/$/, "");
