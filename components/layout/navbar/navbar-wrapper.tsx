import { getHeaderMenu } from '@/lib/shopify/menu';
import { Menu } from 'lib/shopify/types';
import { NavbarClient } from './navbar-client';

export async function Navbar() {
  let menu: Menu[] = [];
  try {
    menu = await getHeaderMenu();
  } catch (error) {
    console.warn('Navbar: Failed to load menu');
  }

  return <NavbarClient menu={menu} />;
}