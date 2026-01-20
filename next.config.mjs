/** @type {import('next').NextConfig} */

const getRemotePatternFromBaseUrl = (baseUrl) => {
  if (!baseUrl) return null;
  try {
    const url = new URL(baseUrl);
    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      port: url.port || "",
    };
  } catch {
    return null;
  }
};

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.floralradiancebd.com",
      },
      // Common local dev backends
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "https", hostname: "localhost" },
      { protocol: "https", hostname: "127.0.0.1" },
      // If NEXT_PUBLIC_BASE_URL points somewhere else, allow it too
      ...(getRemotePatternFromBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)
        ? [getRemotePatternFromBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)]
        : []),
    ],
  },
};

export default nextConfig;
