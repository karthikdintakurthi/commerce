'use client';

import { useProduct } from './product-context';

interface ProductVariantPickerProps {
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
  onVariantChange?: (variant: any) => void;
}

export function ProductVariantPicker({ options, variants, onVariantChange }: ProductVariantPickerProps) {
  const { state, updateOption } = useProduct();

  const handleOptionChange = (optionName: string, value: string) => {
    // Update the product context state
    updateOption(optionName.toLowerCase(), value);

    // Find the matching variant
    const newSelectedOptions = {
      ...state,
      [optionName.toLowerCase()]: value
    };
    
    const matchingVariant = variants.find(variant =>
      variant.selectedOptions.every(option =>
        newSelectedOptions[option.name.toLowerCase()] === option.value
      )
    );

    if (matchingVariant && onVariantChange) {
      onVariantChange(matchingVariant);
    }
  };

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id}>
          <h3 className="text-sm font-medium text-gray-900 mb-2">{option.name}</h3>
          <div className="flex gap-2">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                  state[option.name.toLowerCase()] === value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
