import React from 'react'

// 1. Import the original Payload type
import type { HeroBlock as HeroBlockType } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

// 2. Define a new type that includes the expected props from RenderBlocks.tsx
type HeroBlockProps = HeroBlockType & {
  // This is the correct fix in the component file
  disableInnerContainer?: boolean 
  // ...
}

// 3. Use the new type for your component
export const HeroBlock: React.FC<HeroBlockProps> = ({ links, richText }) => {
// Note: You can destructure disableInnerContainer, even if you don't use it, 
// to ensure it's a valid prop.
  
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}