import React from 'react'
import ImageList from '@mui/material/ImageList'
import { MemeTemplate as MemeTemplateI } from '../../interfaces/Meme'
import TemplateImage from '../TemplateImage/TemplateImage'
import { isMobile } from '../Layout/Layout'

interface Props {
  templates: MemeTemplateI[]
}

const TemplateImageList = ({ templates }: Props) => {
  return (
    <ImageList cols={isMobile ? 3 : 4} gap={8}>
      {templates.map((template) => (
        <React.Fragment key={template.id}>
          <TemplateImage template={template} />
        </React.Fragment>
      ))}
    </ImageList>
  )
}

export default TemplateImageList
