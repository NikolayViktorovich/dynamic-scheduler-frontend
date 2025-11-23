import React, { useState, useEffect } from 'react';
import { User, Settings, LogOut, Moon, Sun, Home } from 'lucide-react'; // Target будет удален
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import UserProfileModal from './UserProfileModal';
import { useToast } from '../context/ToastContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUrFUStudent, selectedSpecialtyId, selectedMinorId } = useData();
  const { success, info } = useToast();
  const [isDark, setIsDark] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  const isUserAuthenticated = isUrFUStudent !== null;
  const isDashboardReady = selectedSpecialtyId && selectedMinorId;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
    
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      info('Темная тема включена');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      info('Светлая тема включена');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isUrFUStudent');
    localStorage.removeItem('isAuthenticated');
    success('Вы успешно вышли из аккаунта');
    setTimeout(() => {
      window.location.href = '/onboarding/auth';
    }, 500);
  };
    
  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePassword = (data) => {
    console.log('Change password submitted:', data);
    // Уведомление показывается в UserProfileModal
    handleCloseModal();
  };
    
  const handleMinorChangedSuccess = (newMinorId) => {
    console.log('Minor changed via profile to:', newMinorId);
  };

  const mockUser = {
    name: 'Nikolas Peske',
    email: 'nikolas2005@mail.ru',
    specialty: 'Информатика и вычислительная техника',    
    minor: 'Веб-разработка',    
    avatarInitials: 'ИИ'
  };

  return (
    <>
      <header className="bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link    
            to={isDashboardReady ? "/dashboard" : "/onboarding/auth"}    
            className="text-lg font-extrabold flex items-center space-x-2"
          >
            <span className="gradient-text">УрФУ KnowledgeHub</span>
          </Link>

          {isDashboardReady && (
            <div className="flex items-center space-x-3">
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button    
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            
            {isUserAuthenticated ? (
              <button    
                onClick={handleProfileClick}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF3B77] to-[#7E3BF2] flex items-center justify-center text-white text-sm font-bold">
                  {mockUser.avatarInitials}
                </div>
              </button>
            ) : (
              <Link    
                to="/onboarding/auth"
                className="boost-button flex items-center space-x-2 text-sm px-3 py-2"
              >
                <User className="h-4 w-4" />
                <span>Начать</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <UserProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={mockUser}
        onLogout={handleLogout}
        onChangeMinor={handleMinorChangedSuccess}
        onChangePassword={handleChangePassword}
      />
    </>
  );
};

export default Header;