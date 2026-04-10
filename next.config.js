/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/team/list": { page: "/team/list" },
    };
  },
};

module.exports = nextConfig;
