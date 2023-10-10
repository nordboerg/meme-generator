import axios from 'axios'
import qs from 'qs'
import {
  GenerateMemeRequest,
  GeneratedMeme,
  MemeTemplate,
  MemeTemplateResponse,
  GenerateMemeResponse,
} from '../interfaces/Meme'

const BASE_URL: string = 'https://api.imgflip.com'

export const getMemeTemplates = async (): Promise<MemeTemplate[] | undefined> => {
  try {
    const response = await axios.get<MemeTemplateResponse>(BASE_URL + '/get_memes')

    return response.data.data.memes
  } catch (error) {
    console.error(error)
  }
}

export const getGeneratedMeme = async (
  meme: GenerateMemeRequest,
): Promise<GeneratedMeme | undefined> => {
  try {
    const request = {
      ...meme,
      username: 'NorbertGresku',
      password: '2Pk63S$2KnSmBqk',
    }

    const response = await axios.post<GenerateMemeResponse>(
      BASE_URL + '/caption_image',
      qs.stringify(request),
    )

    return response.data.data
  } catch (error) {
    console.error(error)
  }
}
