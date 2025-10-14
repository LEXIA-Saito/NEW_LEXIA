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
          { 
            name: 'title', 
            type: 'string', 
            title: 'Title',
            validation: Rule => Rule.required()
          },
          { 
            name: 'slug', 
            type: 'slug', 
            title: 'Slug', 
            options: { source: 'title', maxLength: 96 },
            validation: Rule => Rule.required()
          },
          { 
            name: 'description', 
            type: 'text', 
            title: 'Description',
            validation: Rule => Rule.required()
          },
          { 
            name: 'genre', 
            type: 'string', 
            title: 'Genre', 
            options: { 
              list: [
                { title: 'Tech / Implementation', value: 'tech' },
                { title: 'Trends / Innovation', value: 'trends' },
                { title: 'Strategy / Ideas', value: 'ideas' },
              ]
            },
            validation: Rule => Rule.required()
          },
          { 
            name: 'tags', 
            type: 'array', 
            title: 'Tags', 
            of: [{ type: 'string' }],
            validation: Rule => Rule.required().min(1)
          },
          { 
            name: 'date', 
            type: 'date', 
            title: 'Publish Date',
            validation: Rule => Rule.required()
          },
          { 
            name: 'heroImage', 
            type: 'url', 
            title: 'Hero Image URL',
            validation: Rule => Rule.required()
          },
          { 
            name: 'heroImageAlt', 
            type: 'string', 
            title: 'Hero Image Alt Text',
            validation: Rule => Rule.required()
          },
          {
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [{
              name: 'section',
              title: 'Section',
              type: 'object',
              fields: [
                { 
                  name: 'heading', 
                  type: 'string', 
                  title: 'Heading' 
                },
                { 
                  name: 'body', 
                  type: 'array', 
                  title: 'Body Paragraphs', 
                  of: [{ type: 'text' }] 
                },
                { 
                  name: 'image', 
                  type: 'url', 
                  title: 'Inline Image URL' 
                },
                { 
                  name: 'imageAlt', 
                  type: 'string', 
                  title: 'Image Alt Text' 
                },
                { 
                  name: 'list', 
                  type: 'array', 
                  title: 'List Items', 
                  of: [{ type: 'string' }] 
                },
                { 
                  name: 'tableData', 
                  type: 'text', 
                  title: 'Table Data (JSON format)',
                  description: 'Enter table data as JSON: {"headers": ["Col1", "Col2"], "rows": [["Row1Col1", "Row1Col2"], ["Row2Col1", "Row2Col2"]]}'
                }
              ],
              preview: {
                select: {
                  title: 'heading',
                  subtitle: 'body.0'
                }
              }
            }]
          },
          { 
            name: 'contentHtml', 
            type: 'text', 
            title: 'Content HTML (optional)',
            description: 'Additional HTML content (optional)'
          }
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description',
            media: 'heroImage'
          }
        }
      }
    ]
  }
})