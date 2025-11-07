import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  async rewrites() {
    // Resolve API URL from env with a safe local fallback.
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT ||
      process.env.NEXT_PUBLIC_API_URL_PRODUCTION ||
      'http://localhost:8000';

    // Ensure apiUrl is absolute (Next requires rewrites destinations to start with '/', 'http://' or 'https://').
    const safeApiUrl =
      apiUrl.startsWith('/') || apiUrl.startsWith('http://') || apiUrl.startsWith('https://')
        ? apiUrl
        : `https://${apiUrl}`;

    // Always point rewrites to the /api prefix on the upstream host.
    const normalizedApiHost = safeApiUrl.replace(/[/]+$/, '');
    const apiBase = normalizedApiHost.endsWith('/api')
      ? normalizedApiHost
      : `${normalizedApiHost}/api`;

    return [
      {
        // generic /api/* proxy to the configured API host
        source: '/api/:path*',
        destination: `${apiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
