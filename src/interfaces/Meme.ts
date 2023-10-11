export interface MemeTemplate {
  id: string
  name: string
  url: string
  width: number
  height: number
  box_count: number
}

export interface MemeTemplateResponse {
  success: boolean
  data: {
    memes: MemeTemplate[]
  }
}

export interface Caption {
  text: string
  color: string
  outline_color: string
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface GeneratedMeme {
  url: string
  page_url: string
}

export interface GenerateMemeRequest {
  template_id: string
  boxes: Caption[]
}

export interface GenerateMemeResponse {
  success: boolean
  data: GeneratedMeme
}

export interface GenerateMemeError {
  success: boolean
  error_message: string
}
