import type { Page } from '@/payload-types'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroBlock } from './Hero/Component'

// 1. Define the custom props that RenderBlocks is adding
type CustomRenderProps = {
  disableInnerContainer?: boolean
}

// 2. Define a type for any Block Component that RenderBlocks will render.
// This ensures every component in the map is defined as accepting the custom prop.
// 'any' is used here to represent the payload-generated block data.
type RenderableBlock = React.FC<any & CustomRenderProps> 

const blockComponents: {
  [key: string]: RenderableBlock
} = {
  // Cast each component to the new type to satisfy the compiler
  archive: ArchiveBlock as RenderableBlock,
  content: ContentBlock as RenderableBlock,
  cta: CallToActionBlock as RenderableBlock,
  formBlock: FormBlock as RenderableBlock,
  mediaBlock: MediaBlock as RenderableBlock,
  hero: HeroBlock as RenderableBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          // Now, Block is typed as RenderableBlock, which includes disableInnerContainer
          const Block = blockComponents[blockType] 
          if (Block) {
            return (
              <div className="my-16" key={index}>
                <Block {...block} disableInnerContainer /> {/* NO ERROR HERE */}
              </div>
            )
          }
        }
        return null
      })
    )
  }

  return null
}