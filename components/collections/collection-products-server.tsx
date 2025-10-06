import { Product } from 'lib/types';
import { CollectionProductsClient } from './collection-products-client';

interface CollectionProductsServerProps {
  collectionHandle: string;
  searchParams: { [key: string]: string | string[] | undefined };
  initialProducts: Product[];
}

export function CollectionProductsServer({ 
  collectionHandle, 
  searchParams, 
  initialProducts 
}: CollectionProductsServerProps) {
  return (
    <CollectionProductsClient 
      collectionHandle={collectionHandle}
      searchParams={searchParams}
      initialProducts={initialProducts}
    />
  );
}
