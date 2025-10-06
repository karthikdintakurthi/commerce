'use server';

import { getMenu } from './index';

export async function getHeaderMenu() {
  try {
    return await getMenu('next-js-frontend-header-menu');
  } catch (error) {
    console.warn('Header menu: Shopify not configured, skipping menu');
    return [];
  }
}

export async function getFooterMenu() {
  try {
    return await getMenu('next-js-frontend-footer-menu');
  } catch (error) {
    console.warn('Footer menu: Shopify not configured, skipping menu');
    return [];
  }
}
