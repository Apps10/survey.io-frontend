export interface ISurvey {
  id: string
  question: string
  isActive: boolean
  options: ISurveyOption[]
  totalVotes: number
}

export interface INewSurveyCard extends Pick<ISurvey, 'id' | 'question'| 'isActive' >{
  options: Pick<ISurveyOption,'text' | 'id'>[] 
}


export interface ISurveyUpdatedNotification extends Pick<ISurvey, 'options' | 'totalVotes'> {
  surveyId: string,
}


export interface ISurveyOption{
  id: string
  surveyId: string
  text: string
  countVotes: number
}

export interface ISurveyCard extends Omit<ISurvey, 'createdAt' | 'isActive'> {
  onVote?: (surveyId: string, optionId: string, token?: string) => void
}