import { useNavigate } from 'react-router-dom'
import ImageListItem from '@mui/material/ImageListItem'
import { MemeTemplate } from '../../interfaces/Meme'
import { useContext } from 'react'
import { MemeContext } from '../../context/MemeContext'
import { isMobile } from '../Layout/Layout'

interface Props {
  template: MemeTemplate
  index: number
}

const TemplateImage = ({ template, index }: Props) => {
  const { setSelectedMeme } = useContext(MemeContext)
  const navigate = useNavigate()
  const onImageClick = () => {
    setSelectedMeme(template)
    navigate('/editor')
  }

  return (
    <ImageListItem
      onClick={onImageClick}
      sx={{
        minHeight: isMobile ? 100 : 200,
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      <img
        src={template.url}
        alt={template.name}
        loading={index < 12 ? 'eager' : 'lazy'}
        height="400"
      />
    </ImageListItem>
  )
}

export default TemplateImage
