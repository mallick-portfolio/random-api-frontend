const config = {
  BASE_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  BASE_URL: `http://${process.env.NEXT_PUBLIC_DOMAIN}`,
  WS_URL: `ws://${process.env.NEXT_PUBLIC_DOMAIN}/ws`,
};
export default config;
