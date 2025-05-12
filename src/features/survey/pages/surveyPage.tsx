import { useEffect, useState } from 'react';
import type {
  ISurvey,
  ISurveyUpdatedNotification,
} from '../interfaces/surveys.interface';
import { surveyService } from '../services/survey.service';
import { useSocket } from '@/features/shared/hooks/useSocket';
import { SurveyCard } from '../components/surveyCard';
import { useAuth } from '@/features/auth/hooks/auth.hook';
import { NewSurveyCard } from '../components/newSurveyCard';
import { setupInterceptors } from '@/api/axios.service';
import { useNavigate } from 'react-router-dom';

export const SurveysPage = () => {
  const navigate = useNavigate()
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const socket = useSocket();
  const { authUser, isAdmin } = useAuth();
  const NAME_EVENT_NEW_VOTE = 'survey:newVote'
  const NAME_EVENT_NEW_SURVEY = 'survey:new'

  const handleVote = async (surveyId: string, optionId: string) => {
    await surveyService.voteTo(surveyId, optionId, authUser?.token)
    setupInterceptors(navigate)
  }

  useEffect(() => {
    surveyService.getAll().then(setSurveys).catch(console.error);
  }, []);

  useEffect(() => {
    const newVoteSocket = (surveyNotification: ISurveyUpdatedNotification) => {
      const newSurveys = surveys.map((s) =>
        s.id != surveyNotification.surveyId
          ? s
          : {
              ...s,
              options: surveyNotification.options,
              totalVotes: surveyNotification.totalVotes,
            }
      );
      setSurveys([...newSurveys]);
    };

    const newSurveySocket = (survey: ISurvey) => {
      setSurveys([...surveys, survey])
    }

    if (!socket.socket) return;

    socket.socket?.on(NAME_EVENT_NEW_VOTE, newVoteSocket);
    socket.socket?.on(NAME_EVENT_NEW_SURVEY, newSurveySocket);
    
    return () => {
      socket.socket?.off(NAME_EVENT_NEW_VOTE, newVoteSocket);
    socket.socket?.on(NAME_EVENT_NEW_SURVEY, newSurveySocket);

    };
  }, [socket.socket, surveys]);

  return (
    <div className="p-6 space-y-4 grid justify-center gap-x-10 grid-cols-1 md:grid-cols-3">
      {isAdmin && (
        <div className="w-full sm:max-w-xl">
          <NewSurveyCard />
        </div>
      )}

      <div className="sm:col-span-2 w-full">
        <h2 className="text-2xl font-bold">Encuestas disponibles</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {surveys.map((s: ISurvey) => (
            <SurveyCard
              key={s.id}
              question={s.question}
              options={s.options}
              totalVotes={s.totalVotes}
              id={s.id}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
