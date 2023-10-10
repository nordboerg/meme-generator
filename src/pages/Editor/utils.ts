import { Caption } from '../../interfaces/Meme'

export interface CaptionState {
  [key: string]: Caption
}

export const createInitialCaptionState = (boxes: number): CaptionState => {
  let captions = {}

  for (let i = 0; i < boxes; i++) {
    captions = {
      ...captions,
      [`caption${i}`]: { text: '', color: '#ffffff', outline_color: '#000000' },
    }
  }

  return captions
}
