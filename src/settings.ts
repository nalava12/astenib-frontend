export const API_URL = location.origin //'http://localhost:3000'

export interface Post {
  title: string
  content: string //base64 encoded
  id: string // nanoid \w custom chracters (hangul)
  time: number
}