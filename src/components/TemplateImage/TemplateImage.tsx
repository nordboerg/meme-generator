import { useNavigate } from 'react-router-dom'
import ImageListItem from '@mui/material/ImageListItem'
import { MemeTemplate } from '../../interfaces/Meme'
import { useContext } from 'react'
import { MemeContext } from '../../context/MemeContext'

interface Props {
  template: MemeTemplate
}
const TemplateImage = ({ template }: Props) => {
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
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      <img src={template.url} alt={template.name} loading="lazy" />
    </ImageListItem>
  )
}

export default TemplateImage
