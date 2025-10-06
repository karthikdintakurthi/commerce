import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  
  try {
    const collection = await getCollection(params.collection);
    
    if (!collection) {
      return {
        title: `${params.collection} Collection`,
        description: `Browse ${params.collection} products`
      };
    }

    return {
      title: collection.seo?.title || collection.title,
      description:
        collection.seo?.description || collection.description || `${collection.title} products`
    };
  } catch (error) {
    console.warn(`generateMetadata: Failed to fetch collection ${params.collection}:`, error);
    return {
      title: `${params.collection} Collection`,
      description: `Browse ${params.collection} products`
    };
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  
  let products: any[] = [];
  try {
    products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  } catch (error) {
    console.warn(`CategoryPage: Failed to fetch products for collection ${params.collection}:`, error);
    products = [];
  }

  return (
    <section>
      {products.length === 0 ? (
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {params.collection.charAt(0).toUpperCase() + params.collection.slice(1)} Collection
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            No products found in this collection
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-semibold text-yellow-800 mb-2">🔧 Setup Required</h4>
            <p className="text-yellow-700 text-sm">
              Configure your Shopify store to display real products in this collection.
            </p>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {params.collection.charAt(0).toUpperCase() + params.collection.slice(1)} Collection
          </h1>
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>
        </>
      )}
    </section>
  );
}
