import { useState } from 'react'
import { CaptionState, createInitialCaptionState } from './utils'
import { MemeTemplate } from '../../interfaces/Meme'

export const useCaption = (selectedMemeTemplate: MemeTemplate) => {
  const [captions, setCaptions] = useState<CaptionState>(
    createInitialCaptionState(selectedMemeTemplate?.box_count),
  )

  const onUpdateCaptionText = (text: string, captionId: string) => {
    setCaptions((captions) => ({
      ...captions,
      [captionId]: {
        ...captions[captionId],
        text,
      },
    }))
  }

  const onInvertCaptionColor = (captionId: string) => {
    setCaptions((captions) => ({
      ...captions,
      [captionId]: {
        ...captions[captionId],
        color: captions[captionId].outline_color,
        outline_color: captions[captionId].color,
      },
    }))
  }

  const onUpdateCaptionPosition = (
    captionId: string,
    x: number,
    y: number,
    width: number,
    height: number,
    offsetTop: number,
    offsetLeft: number,
  ) => {
    setCaptions((captions) => ({
      ...captions,
      [captionId]: {
        ...captions[captionId],
        x: Math.round(x - offsetLeft),
        y: Math.round(y - offsetTop),
        width: Math.round(width),
        height: Math.round(height),
      },
    }))
  }

  return {
    captions,
    onUpdateCaptionText,
    onInvertCaptionColor,
    onUpdateCaptionPosition,
  }
}
