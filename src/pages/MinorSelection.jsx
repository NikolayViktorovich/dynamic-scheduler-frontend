import React, { useState, useMemo } from 'react';
import { ArrowRight, BookOpen, TrendingUp, Target, Zap, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const MinorSelection = () => {
  const navigate = useNavigate();
  const { MINORS, selectedMinorId, setMinor, getRecommendedMinors, primarySpecialty } = useData();
  const { success } = useToast();
  const [localSelectedId, setLocalSelectedId] = useState(selectedMinorId);

  const recommendedMinors = useMemo(() => getRecommendedMinors(), [getRecommendedMinors]);
  const suitableMinors = recommendedMinors.slice(0, 3);
  const allOtherMinors = recommendedMinors.slice(3);

  const handleSelect = (id) => {
    setLocalSelectedId(id);
  };

  const handleContinue = () => {
    const selectedMinor = MINORS.find(m => m.id === localSelectedId);
    setMinor(localSelectedId);
    success(`Майнер "${selectedMinor?.name}" выбран! Добро пожаловать!`);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <span className="text-sm font-semibold text-[#FF3B77] uppercase tracking-wider">Шаг 3 из 3</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
          Выберите Майнер (ваша Орбита)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 mt-3">
          Орбита — это ваш дополнительный трек, который усилит вашу основную специальность <span className="font-semibold text-[#7E3BF2] dark:text-[#9F3BF2]">"{primarySpecialty.name}"</span>
        </p>
      </div>

      {/* Рекомендованные Майнеры */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-[#FF3B77]" /> Майнеры, подходящие вам
        </h2>
        <div className="grid lg:grid-cols-3 gap-4">
          {suitableMinors.map(minor => (
            <div 
              key={minor.id}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                localSelectedId === minor.id 
                  ? 'bg-[#7E3BF2]/10 border-[#7E3BF2]'
                  : 'bg-white dark:bg-[#111111] border-gray-200 dark:border-[#333333]'
              }`}
              onClick={() => handleSelect(minor.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{minor.name}</h3>
                {localSelectedId === minor.id && <Check className="h-5 w-5 text-[#7E3BF2]" />}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{minor.description}</p>
              
              <h4 className="font-semibold text-gray-800 dark:text-white flex items-center mb-2 text-sm">
                <Zap className="h-4 w-4 mr-2 text-[#7E3BF2]" /> Ключевые теги:
              </h4>
              <div className="flex flex-wrap gap-2">
                {minor.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-[#1A1A1A] text-purple-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Все Майнеры */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-[#7E3BF2]" /> Показать все майнеры
        </h2>
        <div className="grid lg:grid-cols-4 gap-3">
            {allOtherMinors.map(minor => (
                <div 
                    key={minor.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        localSelectedId === minor.id 
                            ? 'bg-purple-100/30 dark:bg-purple-900/30 border-[#7E3BF2]'
                            : 'bg-white dark:bg-[#111111] border-gray-200 dark:border-[#333333]'
                    }`}
                    onClick={() => handleSelect(minor.id)}
                >
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 dark:text-white text-sm">{minor.name}</span>
                        {localSelectedId === minor.id && <Check className="h-4 w-4 text-[#7E3BF2]" />}
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleContinue}
          disabled={!localSelectedId}
          className="flex items-center space-x-2 px-6 py-3 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>Перейти к Орбите</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MinorSelection;