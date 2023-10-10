import { saveAs } from 'file-saver'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  memeUrl: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

const DownloadDialog = ({ memeUrl, setIsDialogOpen }: Props) => {
  const handleClose = () => setIsDialogOpen(false)

  const onSave = () => saveAs(memeUrl, 'my-meme')

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>¯\_(ツ)_/¯</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <img src={memeUrl} alt="" style={{ width: '100%'}} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onSave}>
          Download
        </Button>
      </DialogActions>
    </>
  )
}

export default DownloadDialog
