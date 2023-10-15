import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MemeContext } from '../../context/MemeContext'
import { GenerateMemeRequest } from '../../interfaces/Meme'
import CaptionInput from '../../components/CaptionInput/CaptionInput'
import { getGeneratedMeme } from '../../services/Meme'
import Grid from '@mui/material/Unstable_Grid2'
import ContrastIcon from '@mui/icons-material/Contrast'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'
import MovableCaption from '../../components/MovableCaption/MovableCaption'
import '../../App.css'
import { useCaption } from './useCaption'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DownloadDialog from '../../components/DownloadDialog/DownloadDialog'

const Editor = () => {
  const { selectedMemeTemplate } = useContext(MemeContext)
  const navigate = useNavigate()
  const { captions, onUpdateCaptionText, onInvertCaptionColor, onUpdateCaptionPosition } =
    useCaption(selectedMemeTemplate!)
  const [isPositioningEnabled, setIsPositioningEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [memeUrl, setMemeUrl] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHideEdges, setIsHideEdges] = useState(false)
  const [error, setError] = useState('')
  const dragTargetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const dragContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!selectedMemeTemplate) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // hide the edges of the control box if the download dialog is open.
  // otherwise the edges are visible over the backdrop of the dialog component
  useEffect(() => {
    setIsHideEdges(isDialogOpen)
  }, [isDialogOpen])

  const toggleCustomCaptionPositions = () => {
    setIsPositioningEnabled((value) => !value)
  }

  const onGenerate = () => {
    if (selectedMemeTemplate && dragContainerRef.current) {
      const { clientHeight, clientWidth } = dragContainerRef.current
      const { width: originalWidth, height: originalHeight } = selectedMemeTemplate

      const memeToGenerate: GenerateMemeRequest = {
        template_id: selectedMemeTemplate.id,
        boxes: Object.values(captions).map(({ x, y, width, height, ...rest }) => ({
          ...rest,
          ...(isPositioningEnabled &&
            x &&
            y && {
              // set the caption position relative to original image dimensions on the server
              x: (originalWidth * x) / clientWidth,
              y: (originalHeight * y) / clientHeight,
              width,
              height,
            }),
        })),
      }

      setIsLoading(true)
      getGeneratedMeme(memeToGenerate)
        .then((response) => {
          if (response?.url) {
            setMemeUrl(response.url)
            setIsDialogOpen(true)
            setError('')
          }
        })
        .catch((error) => {
          setError(
            error.message +
              ' You likely need to specify more captions to generate this meme.',
          )
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <>
      <h1>Add your captions</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <div
            ref={dragContainerRef}
            style={{
              position: 'relative',
              height: imageRef.current?.offsetHeight,
              width: imageRef.current?.offsetWidth,
            }}
          >
            <img
              ref={imageRef}
              className="editor-image"
              src={selectedMemeTemplate?.url}
              alt={selectedMemeTemplate?.name}
            />
            {Object.entries(captions).map(([captionId, { text, color }], index) => (
              <React.Fragment key={captionId}>
                <MovableCaption
                  captionId={captionId}
                  text={text}
                  color={color}
                  isPositioningEnabled={isPositioningEnabled}
                  index={index}
                  onUpdateCaptionPosition={onUpdateCaptionPosition}
                  ref={(ref) => (dragTargetRefs.current[captionId] = ref)}
                  targetRef={dragTargetRefs.current[captionId]}
                  dragContainerRef={dragContainerRef}
                  isHideEdges={isHideEdges}
                />
              </React.Fragment>
            ))}
          </div>
        </Grid>
        <Grid xs={12} md={4}>
          {Object.keys(captions).map((captionId) => (
            <Grid xs={12} key={captionId}>
              <CaptionInput onUpdateCaption={onUpdateCaptionText} captionId={captionId} />
              <IconButton
                onClick={() => onInvertCaptionColor(captionId)}
                aria-label="contrast"
              >
                <ContrastIcon />
              </IconButton>
            </Grid>
          ))}
          <Grid xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={toggleCustomCaptionPositions}
                  checked={isPositioningEnabled}
                />
              }
              label="Enable custom positioning"
            />
          </Grid>
          <Grid xs={12}>
            <Button
              onClick={onGenerate}
              disabled={isLoading}
              variant="contained"
              disableElevation
              sx={{ marginTop: 3 }}
            >
              Generate meme
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={isDialogOpen}>
        <DownloadDialog memeUrl={memeUrl} setIsDialogOpen={setIsDialogOpen} />
      </Dialog>
    </>
  )
}

export default Editor
