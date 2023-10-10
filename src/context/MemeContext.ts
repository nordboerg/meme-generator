import { createContext, Dispatch, SetStateAction } from 'react'
import { MemeTemplate } from '../interfaces/Meme'

interface ContextProps {
  selectedMemeTemplate: MemeTemplate | null
  setSelectedMeme: Dispatch<SetStateAction<MemeTemplate | null>>
}
export const MemeContext = createContext<ContextProps>({
  selectedMemeTemplate: null,
  setSelectedMeme: () => {},
})
