import React, { useState } from 'react';
import { 
    Target, 
    BookOpen, 
    TrendingUp, 
    Calendar, 
    Star, 
    Users, 
    Clock, 
    Filter, 
    AlertTriangle, 
    BookMarked, 
    User 
} from 'lucide-react';
import SkillRadar from '../components/SkillRadar';
import Roadmap from '../components/Roadmap';
import CourseCard from '../components/CourseCard';
import ResumeModal from '../components/ResumeModal';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
    const { 
        SKILLS, 
        currentSkills, 
        orbitTargetSkills,
        skillDeficit, 
        primarySpecialty, 
        selectedMinor, 
        generateRoadmap,
        getRecommendedCourses,
        passedCourseIds,
        toggleCourseSelection,
        selectedElectives,
        generateSkillResume,
        calculateCoverage,
        COURSES,
    } = useData();
    const { success, info } = useToast();

    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [currentResume, setCurrentResume] = useState(null);

    const recommendedCourses = getRecommendedCourses();
    const roadmap = generateRoadmap();
    const coverage = calculateCoverage();

    const relevantSkills = SKILLS.filter(s => orbitTargetSkills[s.id] > 0);
    
    const handleGenerateResume = () => {
        const resume = generateSkillResume();
        setCurrentResume(resume);
        setIsResumeModalOpen(true);
        success('Резюме навыков сгенерировано!');
    };
    
    const handleCourseClick = (course) => {
        if (course.type === 'obligatory' && !passedCourseIds.includes(course.id)) {
            console.log('Показываем детали обязательного курса:', course.name);
            info(`Курс "${course.name}" является обязательным`);
        } else if (course.type === 'elective' && !passedCourseIds.includes(course.id)) {
            const wasSelected = selectedElectives.includes(course.id);
            toggleCourseSelection(course.id);
            if (wasSelected) {
                success(`Курс "${course.name}" удален из плана`);
            } else {
                success(`Курс "${course.name}" добавлен в план`);
            }
        }
    };

    const handleToggleCourse = (courseId) => {
        const course = COURSES.find(c => c.id === courseId);
        const wasSelected = selectedElectives.includes(courseId);
        toggleCourseSelection(courseId);
        if (course) {
            if (wasSelected) {
                success(`Курс "${course.name}" удален из плана`);
            } else {
                success(`Курс "${course.name}" добавлен в план`);
            }
        }
    };

    // Параметры для круговой диаграммы (из предыдущего улучшения)
    const circleSize = 180; 
    const strokeWidth = 14; 
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - coverage / 100);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="animate-fade-in">
                {/* ИЗМЕНЕНИЕ ЗДЕСЬ: Убрано слово "Майнор" из заголовка */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                    Ваша Орбита: <span className="gradient-text">{selectedMinor.name}</span>
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                    Основной трек: <span className="font-semibold">{primarySpecialty.name}</span>
                </p>
            </div>

            {/* Секция 1: Обзор Орбиты */}
            <section className="grid lg:grid-cols-3 gap-6 mb-8">
                
                {/* КАРТОЧКА ПРОГРЕССА (Крупный дизайн) */}
                <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#333333] rounded-xl p-6 flex flex-col justify-between items-center text-center shadow-lg h-full">
                    <div className="flex flex-col items-center mb-6">
                        <Target className="h-8 w-8 mb-3 gradient-text" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Покрытие навыков</h3>
                    </div>

                    {/* Круговая диаграмма (Circle Progress Bar) - Крупнее */}
                    <div className="flex-grow flex items-center justify-center py-4">
                        <div className="relative" style={{ width: `${circleSize}px`, height: `${circleSize}px` }}>
                            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${circleSize} ${circleSize}`}>
                                {/* Фоновый круг */}
                                <circle
                                    className="text-gray-200 dark:text-[#333333]"
                                    strokeWidth={strokeWidth}
                                    stroke="currentColor"
                                    fill="transparent"
                                    r={radius}
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                />
                                {/* Круг прогресса */}
                                <circle
                                    className="text-[#FF3B77] transition-all duration-700 ease-out"
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r={radius}
                                    cx={circleSize / 2}
                                    cy={circleSize / 2}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-4xl font-extrabold gradient-text">{coverage}%</h3>
                            </div>
                        </div>
                    </div>
                    
                    {/* Дополнительная информация - Компактно */}
                    <div className="w-full mt-6 pt-4 border-t border-gray-100 dark:border-[#333333]">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <span className="font-bold text-gray-900 dark:text-white">
                                {relevantSkills.length}
                            </span> целевых навыков в Орбите
                        </p>
                        {skillDeficit && Object.keys(skillDeficit).length > 0 && (
                            <p className="text-xs mt-2 text-red-500 dark:text-red-400 flex items-center justify-center">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Дефицит навыков: {Object.keys(skillDeficit).length}
                            </p>
                        )}
                        {skillDeficit && Object.keys(skillDeficit).length === 0 && coverage > 0 && (
                             <p className="text-xs mt-2 text-green-500 dark:text-green-400 flex items-center justify-center">
                                <Star className="h-4 w-4 mr-1 fill-current" />
                                Цель Орбиты достигнута!
                            </p>
                        )}
                    </div>
                </div>
                
                {/* Skill Radar */}
                <div className="lg:col-span-2">
                    <SkillRadar 
                        skills={relevantSkills}
                        currentLevels={currentSkills}
                        targetLevels={orbitTargetSkills}
                    />
                </div>
            </section>

            {/* Секция 2: Рекомендации и Резюме */}
            <section className="grid lg:grid-cols-12 gap-6 mb-8">
                
                {/* Блок Резюме */}
                <div className="lg:col-span-4 flex flex-col space-y-4">
                    <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#333333] rounded-xl p-5 h-full flex flex-col justify-between shadow-lg">
                        <div>
                            {/* Иконка User теперь красная */}
                            <User className="h-6 w-6 mb-3 text-red-500" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Резюме навыков
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Генерируйте текущее резюме, основанное на вашей основной специальности и прогрессе по Орбите.
                            </p>
                        </div>
                        <button
                            onClick={handleGenerateResume}
                            // Явные классы для сплошного красного цвета
                            className="mt-4 flex items-center justify-center text-sm py-2 px-4 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
                        >
                            Сгенерировать резюме
                        </button>
                    </div>
                    
                    {/* Учебный план */}
                    <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#333333] rounded-xl p-5 shadow-lg">
                        <div className='flex items-center'>
                            <BookOpen className="h-6 w-6 mr-3 text-[#7E3BF2]" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Учебный план
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Основная специальность: <span className='font-semibold'>{primarySpecialty.name}</span>
                        </p>
                    </div>
                </div>

                {/* Блок Рекомендованных Курсов */}
                <div className="lg:col-span-8">
                    <div className="p-5 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#333333] rounded-xl h-full shadow-lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-red-500" /> Рекомендованные курсы
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Курсы для закрытия дефицита навыков
                        </p>
                    
                        <div className="space-y-4">
                            {recommendedCourses.length > 0 ? (
                                recommendedCourses.map(course => (
                                    <CourseCard 
                                        key={course.id} 
                                        course={course} 
                                        isSelected={selectedElectives.includes(course.id)}
                                        onSelect={() => handleToggleCourse(course.id)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#1A1A1A] rounded-lg border border-dashed border-gray-300 dark:border-[#333333]">
                                    <p className="font-semibold">Отличная работа!</p>
                                    <p className="text-sm">Покрытие навыков достаточно высокое. Дефицит отсутствует.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Секция 3: Дорожная карта */}
            <section className="mb-8">
                <Roadmap 
                    roadmapData={roadmap} 
                    onCourseClick={handleCourseClick}
                />
            </section>
            
            {isResumeModalOpen && <ResumeModal resumeData={currentResume} onClose={() => setIsResumeModalOpen(false)} />}
        </div>
    );
};

export default Dashboard;