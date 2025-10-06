import Image from 'next/image';

interface CollectionHeaderProps {
  collection: {
    title: string;
    description?: string;
    image?: {
      url: string;
      altText?: string;
      width: number;
      height: number;
    };
  };
}

export function CollectionHeader({ collection }: CollectionHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-chip-gold/5 via-chip-sage/5 to-chip-gold/5 border-b border-chip-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                {collection.title}
              </h1>
              {collection.description && (
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                  {collection.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-chip-gold rounded-full"></div>
                <span className="text-sm text-gray-600">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-chip-sage rounded-full"></div>
                <span className="text-sm text-gray-600">Handcrafted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-chip-gold rounded-full"></div>
                <span className="text-sm text-gray-600">Authentic</span>
              </div>
            </div>
          </div>

          {/* Image */}
          {collection.image && (
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
                <Image
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  width={collection.image.width}
                  height={collection.image.height}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-chip-gold/20 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-chip-sage/20 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
