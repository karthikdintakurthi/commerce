import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const disallowPaths = [
    '/api/',
    '/admin/',
    '/_next/',
    '/private/',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowPaths,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vanitha.com'}/sitemap.xml`,
  };
}