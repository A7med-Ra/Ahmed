/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Ahmed', // تأكد أن الحرف الكبير وصيغة الاسم مطابقة تماماً لاسم الريبو على جيت هاب
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
