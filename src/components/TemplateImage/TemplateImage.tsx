import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import ImageListItem from '@mui/material/ImageListItem'
import { MemeTemplate } from '../../interfaces/Meme'
import { useContext } from 'react'
import { MemeContext } from '../../context/MemeContext'
import { isMobile } from '../Layout/Layout'

interface Props {
  template: MemeTemplate
}

const TemplateImage = ({ template }: Props) => {
  const { setSelectedMeme } = useContext(MemeContext)
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 400px 0px',
    triggerOnce: true,
  })
  const navigate = useNavigate()
  const onImageClick = () => {
    setSelectedMeme(template)
    navigate('/editor')
  }

  return (
    <ImageListItem
      ref={ref}
      onClick={onImageClick}
      sx={{
        minHeight: isMobile ? 100 : 200,
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      <img src={inView ? template.url : ''} alt={template.name} loading="lazy" />
    </ImageListItem>
  )
}

export default TemplateImage
