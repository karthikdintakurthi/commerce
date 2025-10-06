import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  let products: any[] = [];
  try {
    products = await getProducts({ sortKey, reverse, query: searchValue });
  } catch (error) {
    console.warn('Search: Shopify not configured, showing empty results');
  }
  
  const resultsText = products.length > 1 ? 'results' : 'result';

  // Check if Shopify is configured
  const isShopifyConfigured = process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!isShopifyConfigured) {
    return (
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Search Demo
          </h1>
          <p className="text-muted-foreground mb-4">
            Search functionality requires Shopify configuration.
          </p>
          {searchValue && (
            <p className="text-sm text-muted-foreground">
              You searched for: <span className="font-bold text-foreground">&quot;{searchValue}&quot;</span>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {searchValue ? `Search Results` : `All Products`}
        </h1>
        
        {searchValue ? (
          <p className="text-lg text-muted-foreground">
            {products.length === 0
              ? `No products found for "${searchValue}"`
              : `Found ${products.length} ${resultsText} for "${searchValue}"`}
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">
            Browse our complete collection of premium jewelry and accessories
          </p>
        )}
      </div>

      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {searchValue ? 'No products found' : 'No products available'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {searchValue 
              ? `Try searching for something else or browse all products.`
              : `Check back soon for new arrivals!`
            }
          </p>
          {searchValue && (
            <a 
              href="/search" 
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              View All Products
            </a>
          )}
        </div>
      )}
    </div>
  );
}
