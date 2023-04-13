export const IS_PROD = process.env.NODE_ENV === "production";
export const WEBSOCKET_URL = IS_PROD ? undefined : import.meta.env.VITE_WEBSOCKET_URL;
