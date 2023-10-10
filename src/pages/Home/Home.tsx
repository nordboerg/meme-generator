import { useQuery } from 'react-query'
import { getMemeTemplates } from '../../services/Meme'
import TemplateImageList from '../../components/TemplateImageList/TemplateImageList'
import '../../App.css'

const Home = () => {
  const { data: memeTemplates, isLoading, error } = useQuery(['meme'], getMemeTemplates)

  if (isLoading) {
    return <>Loading...</>
  }

  if (error) {
    return <>Something went wrong</>
  }

  return (
    <>
      <h1>Choose a meme template</h1>
      {memeTemplates && <TemplateImageList templates={memeTemplates} />}
    </>
  )
}

export default Home
