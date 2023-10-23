import { Suspense } from 'react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import TemplateImageList from '../../components/TemplateImageList/TemplateImageList'
import '../../App.css'

const Home = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <>
      <h1>Choose a meme template</h1>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <button onClick={() => resetErrorBoundary()}>Try again</button>
          </div>
        )}
      >
        <Suspense fallback={<h1>Loading...</h1>}>
          <TemplateImageList />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Home
