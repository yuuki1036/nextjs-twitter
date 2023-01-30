import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'hitokoto',

  projectId: 'ffcv0j48',
  dataset: 'develop',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
