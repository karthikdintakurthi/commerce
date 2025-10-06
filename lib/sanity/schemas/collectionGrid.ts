import { defineField, defineType } from '@sanity/types'

export const collectionGridSchema = defineType({
  name: 'collectionGrid',
  title: 'Collection Grid',
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
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'collectionItem',
          title: 'Collection Item',
          fields: [
            {
              name: 'title',
              title: 'Collection Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'image',
              title: 'Collection Image',
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
            {
              name: 'url',
              title: 'Collection URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'shopifyCollectionHandle',
              title: 'Shopify Collection Handle',
              type: 'string',
              description: 'The handle of the collection in Shopify (e.g., "earrings", "necklaces")',
            },
            {
              name: 'productCount',
              title: 'Product Count',
              type: 'number',
              description: 'Number of products in this collection (optional)',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(6),
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
      name: 'showProductCount',
      title: 'Show Product Count',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'buttonText',
      title: 'View All Button Text',
      type: 'string',
      initialValue: 'View All Collections',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'View All Button URL',
      type: 'string',
      initialValue: '/search',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
