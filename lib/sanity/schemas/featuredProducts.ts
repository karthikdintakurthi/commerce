import { defineField, defineType } from '@sanity/types'

export const featuredProductsSchema = defineType({
  name: 'featuredProducts',
  title: 'Featured Products',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'productItem',
          title: 'Product Item',
          fields: [
            {
              name: 'title',
              title: 'Product Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Product Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'currency',
              title: 'Currency',
              type: 'string',
              options: {
                list: [
                  { title: 'USD ($)', value: 'USD' },
                  { title: 'INR (₹)', value: 'INR' },
                  { title: 'EUR (€)', value: 'EUR' },
                  { title: 'GBP (£)', value: 'GBP' },
                ],
              },
              initialValue: 'USD',
            },
            {
              name: 'compareAtPrice',
              title: 'Compare at Price (Sale Price)',
              type: 'number',
              description: 'Original price to show strikethrough (optional)',
            },
            {
              name: 'images',
              title: 'Product Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.min(1),
            },
            {
              name: 'shopifyProductHandle',
              title: 'Shopify Product Handle',
              type: 'string',
              description: 'The handle of the product in Shopify (e.g., "emerald-earrings")',
            },
            {
              name: 'url',
              title: 'Product URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isOnSale',
              title: 'On Sale',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'tags',
              title: 'Product Tags',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags',
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price',
              media: 'images.0',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title || 'Untitled Product',
                subtitle: `$${subtitle || '0'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8),
    }),
    defineField({
      name: 'gridLayout',
      title: 'Grid Layout',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
    }),
    defineField({
      name: 'showPrices',
      title: 'Show Prices',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showSalePrices',
      title: 'Show Sale Prices',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'buttonText',
      title: 'View All Button Text',
      type: 'string',
      initialValue: 'View All Products',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'View All Button URL',
      type: 'string',
      initialValue: '/search',
    }),
    defineField({
      name: 'sourceType',
      title: 'Product Source',
      type: 'string',
      options: {
        list: [
          { title: 'Manual Selection', value: 'manual' },
          { title: 'From Shopify Collection', value: 'shopify' },
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
    }),
    defineField({
      name: 'shopifyCollectionHandle',
      title: 'Shopify Collection Handle',
      type: 'string',
      description: 'If source is Shopify, specify the collection handle',
      hidden: ({ parent }) => parent?.sourceType !== 'shopify',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
