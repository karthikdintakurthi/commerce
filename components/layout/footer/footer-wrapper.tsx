import { getFooterMenu } from '@/lib/shopify/menu';
import FooterClient from './footer-client';

export default async function Footer() {
  let menu: any[] = [];
  try {
    menu = await getFooterMenu();
  } catch (error) {
    console.warn('Footer: Failed to load menu');
  }

  return <FooterClient menu={menu} />;
}
