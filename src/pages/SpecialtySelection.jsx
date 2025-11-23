import React, { useState } from 'react';
import { ArrowRight, Check, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const MAIN_SPECIALTIES = [
  { 
    id: 'it', 
    name: 'Информатика и вычислительная техника', 
    description: 'Освоение методов разработки и сопровождения ПО, разработка мобильных приложений.', 
    tags: ['Бэкенд', 'Алгоритмы', 'Базы данных'] 
  },
  { 
    id: 'design', 
    name: 'Медиакоммуникации и дизайн', 
    description: 'Разработка визуального контента и пользовательских интерфейсов, UX/UI.', 
    tags: ['UX/UI', 'Графика', 'Брендинг'] 
  },
  { 
    id: 'econ', 
    name: 'Экономическая безопасность', 
    description: 'Анализ рисков, защита данных и аудит в финансовой сфере.', 
    tags: ['Финансы', 'Аналитика', 'Аудит'] 
  },
];

const SpecialtySelection = () => {
  const navigate = useNavigate();
  const { setSpecialty } = useData();
  const { success } = useToast();
  const [localSelectedId, setLocalSelectedId] = useState(null);

  const handleSelect = (id) => {
    setLocalSelectedId(id);
  };

  const handleContinue = () => {
    if (localSelectedId) {
      const selectedSpecialty = MAIN_SPECIALTIES.find(s => s.id === localSelectedId);
      setSpecialty(localSelectedId);
      success(`Специальность "${selectedSpecialty?.name}" выбрана!`);
      navigate('/onboarding/minor');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <span className="text-sm font-semibold text-[#FF3B77] uppercase tracking-wider">Шаг 2 из 3</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
          Выберите основную специальность
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mt-3">
          Это ваш главный трек обучения, который определит базовые навыки и диплом.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {MAIN_SPECIALTIES.map(specialty => {
          const isSelected = localSelectedId === specialty.id;
          return (
            <div
              key={specialty.id}
              onClick={() => handleSelect(specialty.id)}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FF3B77]/10 border-[#FF3B77]'
                  : 'bg-white dark:bg-[#111111] border-gray-200 dark:border-[#333333] hover:border-[#FF3B77]/50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{specialty.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{specialty.description}</p>
                </div>
                {isSelected && <Check className="h-5 w-5 text-[#FF3B77] flex-shrink-0 ml-3" />}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {specialty.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-[#1A1A1A] text-red-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Профиль
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleContinue}
          disabled={!localSelectedId}
          className="flex items-center space-x-2 px-6 py-3 text-white rounded-xl font-semibold /90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>Продолжить к выбору майнера</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SpecialtySelection;