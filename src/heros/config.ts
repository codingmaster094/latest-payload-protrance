import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'container_Hight',
      type: 'select',
      label: {
        en: 'Container Height',
        de: 'Containerhöhe',
      },
      options: [
        {
          label: {
            en: 'Full',
            de: 'Voll',
          },
          value: 'full',
        },
        {
          label: {
            en: 'Normal',
            de: 'Normal',
          },
          value: 'normal',
        },
      ],
      required: true,
      defaultValue: 'normal',
    },
    {
      name: 'Image_Position',
      type: 'select',
      label: {
        en: 'Image Position',
        de: 'Bildposition',
      },
      options: [
        {
          label: {
            en: 'Top',
            de: 'Oben',
          },
          value: 'top',
        },
        {
          label: {
            en: 'Middle',
            de: 'Mitte',
          },
          value: 'middle',
        },
        {
          label: {
            en: 'Bottom',
            de: 'Unten',
          },
          value: 'bottam',
        },
      ],
      required: true,
      defaultValue: 'middle',
    },
    {
      name: 'heroImage',
      type: 'upload',
      label: {
        en: 'Hero Image',
        de: 'Hero Bild',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'video',
      type: 'upload',
      label: {
        en: 'Hero Video',
        de: 'Hero Video',
      },
      relationTo: 'media', // or 'videos' if you make a separate collection
      required: false,
      admin: {
        description: 'Upload a video file (e.g. MP4, WebM)',
      },
    },
    {
      name: 'text',
      type: 'text',
      label: {
        en: 'Text',
        de: 'Text',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
