import { ChangeEvent, useRef } from 'react'
import TextField from '@mui/material/TextField'

interface Props {
  onUpdateCaption: (text: string, captionId: string) => void
  captionId: string
}

const CaptionInput = ({ onUpdateCaption, captionId }: Props) => {
  const ref = useRef<string>('')

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    ref.current = event.target.value
    onUpdateCaption(event.target.value, captionId)
  }

  return (
    <TextField
      id={captionId}
      value={ref.current}
      onChange={onInputChange}
      size="small"
      sx={{ marginBottom: 1, backgroundColor: '#ffffff' }}
    />
  )
}

export default CaptionInput
