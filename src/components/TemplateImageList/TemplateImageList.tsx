import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import ImageList from '@mui/material/ImageList'
import { isMobile } from '../Layout/Layout'
import TemplateImage from '../TemplateImage/TemplateImage'
import { getMemeTemplates } from '../../services/Meme'

const TemplateImageList = () => {
  const { data: memeTemplates } = useSuspenseQuery({
    queryKey: ['meme'],
    queryFn: getMemeTemplates,
    staleTime: 1000 * 60 * 10,
  })

  return (
    <ImageList cols={isMobile ? 3 : 4} gap={8}>
      {memeTemplates!.map((template) => (
        <React.Fragment key={template.id}>
          <TemplateImage template={template} />
        </React.Fragment>
      ))}
    </ImageList>
  )
}

export default TemplateImageList
