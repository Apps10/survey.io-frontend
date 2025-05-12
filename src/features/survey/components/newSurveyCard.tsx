import { Button, Input } from '@/components/ui';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { INewSurveyCard } from '../interfaces/surveys.interface';
import { useState } from 'react';
import { generateId } from '@/lib/utils';
import { useAuth } from '@/features/auth/hooks/auth.hook';
import { surveyService } from '../services/survey.service';

export const NewSurveyCard = () => {
  const { authUser } = useAuth()
  const [options, setOptions] = useState<INewSurveyCard['options']>([]);
  const [question, setQuestion] =  useState('');
  
  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault()
    if(authUser?.role!='admin') return;

    await surveyService.newSurvey({
      id: generateId(),
      isActive: true,
      options: options.map(o=> ({
        ...o,
        
      })),
      question,
    }, authUser?.token)

  }
  
  const handleAddNewOption = () => {
    setOptions([
      ...options,
      {
        id: generateId(),
        text: '',
      },
    ]);
  };

  const handleDeleteOption = (id: string) => {
    const othersOptions = options.filter((o) => o.id != id) ?? [];
    setOptions([
      ...othersOptions,
    ]);
  }

  const handleChangeInputOption = (text: string, id: string) => {
    const selectOption = options.find((o) => o.id == id);
    const othersOptions = options.filter((o) => o.id != id) ?? [];

    if(!selectOption) return

    setOptions([
      ...othersOptions,
      {
        id: selectOption.id,
        text: text,
      },
    ]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Crear nueva encuesta
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese la pregunta:</label>
            <Input id="question" value={question} onChange={(e)=> setQuestion(e.target.value)} placeholder="Ejemplo: cual es tu color favorito?" required />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opciones disponibles:</label>
            <Button type='button' onClick={handleAddNewOption}>+</Button>
            {options.map((opt) => {
              return (
                <div key={opt.id} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium m-">
                    <Input
                      value={opt.text}
                      onChange={(e) =>
                        handleChangeInputOption(e.target.value, opt.id)
                      }
                    />
                    <Button type='button' className='bg-red-400' onClick={()=>handleDeleteOption(opt.id)}>-</Button>
                  </div>
                </div>
              );
            })}          
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

       
      </CardContent>
    </Card>
  );
};
