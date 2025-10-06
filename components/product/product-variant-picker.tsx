'use client';

import { useState } from 'react';

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
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleOptionChange = (optionName: string, value: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: value
    };
    setSelectedOptions(newSelectedOptions);

    // Find the matching variant
    const matchingVariant = variants.find(variant =>
      variant.selectedOptions.every(option =>
        newSelectedOptions[option.name] === option.value
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
                  selectedOptions[option.name] === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
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
