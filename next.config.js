// https://stackoverflow.com/questions/68123033/nextjs-static-files-cors-issue-causing-links-to-break-on-version-10-1-4
/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
};

module.exports = nextConfig;
