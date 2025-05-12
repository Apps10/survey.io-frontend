import { Button, Badge } from '@/components/ui';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ISurveyCard } from '../interfaces/surveys.interface';

export const SurveyCard = ({
  question,
  options,
  totalVotes,
  id: surveyId,
  onVote,
}: ISurveyCard) => {
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const mostVoted = Math.max(...options.map((o) => o.countVotes));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {options.map((opt) => {
          const percentage = getPercentage(opt.countVotes);
          const isWinner = opt.countVotes === mostVoted && totalVotes > 0;

          return (
            <div key={opt.id} className="space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span>{opt.text}</span>
                <span>
                  {opt.countVotes} votos • {percentage}%
                </span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isWinner ? 'bg-green-500' : 'bg-blue-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <Button
                className="w-full mt-1"
                variant="outline"
                onClick={() => onVote?.(surveyId, opt.id)}
              >
                Votar
              </Button>
            </div>
          );
        })}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Badge variant="secondary">Total: {totalVotes} votos</Badge>
      </CardFooter>
    </Card>
  );
};
