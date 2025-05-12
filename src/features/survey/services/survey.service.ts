import { api } from "@/api/axios.service"
import type { INewSurveyCard } from "../interfaces/surveys.interface"

export const surveyService = {
  async getAll(){
    const response = await api.get('/surveys')
    return response.data.surveys
  },
  async voteTo(surveyId: string, optionId: string, token?:string) {
    const body = {
      surveyId,
      optionId
    }
    try{
      const response = await api.post(
        '/surveys/vote', 
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    }catch(error){
      console.log(error)
    }
  }, 
  async newSurvey(survey: INewSurveyCard, token: string) {
    try{
      const response = await api.post(
        '/surveys', 
        {...survey},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    }catch(error){
      console.log(error)
    }
  }


}