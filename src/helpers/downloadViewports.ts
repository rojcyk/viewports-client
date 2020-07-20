import axios, { AxiosResponse } from 'axios'
import { VIEWPORTS_URL } from '../constants/server'

export default async (): Promise<AxiosResponse> => {
  return await axios.get(`${VIEWPORTS_URL}/viewports`)
}