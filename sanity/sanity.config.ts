import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'LEXIA Blog Studio',
  projectId: process.env.SANITY_PROJECT_ID || 'ph9ufk4r',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      {
        name: 'blogPost',
        title: 'Blog Post',
        type: 'document',
        fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
          { name: 'description', type: 'text', title: 'Description' },
          { name: 'genre', type: 'string', title: 'Genre', options: { list: [
            { title: 'Tech / Implementation', value: 'tech' },
            { title: 'Trends / Innovation', value: 'trends' },
            { title: 'Strategy / Ideas', value: 'ideas' },
          ]}},
          { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
          { name: 'date', type: 'date', title: 'Publish Date' },
          { name: 'heroImage', type: 'url', title: 'Hero Image URL' },
          { name: 'heroImageAlt', type: 'string', title: 'Hero Image Alt Text' },
          {
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [{
              name: 'section',
              title: 'Section',
              type: 'object',
              fields: [
                { name: 'heading', type: 'string', title: 'Heading' },
                { name: 'body', type: 'array', title: 'Body Paragraphs', of: [{ type: 'text' }] },
                { name: 'image', type: 'url', title: 'Inline Image URL' },
                { name: 'imageAlt', type: 'string', title: 'Image Alt Text' },
                { name: 'list', type: 'array', title: 'List Items', of: [{ type: 'string' }] },
                { name: 'table', type: 'object', title: 'Table', fields: [
                  { name: 'headers', type: 'array', of: [{ type: 'string' }] },
                  { name: 'rows', type: 'array', of: [{ type: 'array', of: [{ type: 'string' }] }] }
                ] }
              ]
            }]
          },
          { name: 'contentHtml', type: 'text', title: 'Content HTML (optional)' }
        ]
      }
    ]
  }
})
