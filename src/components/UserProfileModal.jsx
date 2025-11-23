import React, { useState, useEffect, useCallback } from 'react';
import { LogOut, Target, User, Lock, X, Mail, BookOpen } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeMinorModal from './ChangeMinorModal';
import { useToast } from '../context/ToastContext';

const UserProfileModal = React.memo(({ 
  isOpen, 
  onClose, 
  user, 
  onLogout, 
  onChangeMinor,
  onChangePassword 
}) => {
  const { success } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMinorModalOpen, setIsMinorModalOpen] = useState(false);
  const [currentMinorName, setCurrentMinorName] = useState(user?.minor || '');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
      setCurrentMinorName(user?.minor || '');
    } else {
      setShowModal(false);
    }
  }, [isOpen, user?.minor]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(onClose, 300);
  }, [onClose]);
  
  const handleOpenPasswordModal = useCallback((e) => {
    e.stopPropagation();
    setIsPasswordModalOpen(true);
  }, []);
  
  const handleClosePasswordModal = useCallback(() => {
    setIsPasswordModalOpen(false);
  }, []);

  const handleOpenMinorModal = useCallback((e) => {
    e.stopPropagation();
    setIsMinorModalOpen(true);
  }, []);

  const handleCloseMinorModal = useCallback(() => {
    setIsMinorModalOpen(false);
  }, []);

  const handleMinorChangedSuccess = useCallback((newMinorId) => {
    const newMinorName = 'Новый Майнер';
    setCurrentMinorName(newMinorName);
    onChangeMinor?.(newMinorId);
    success('Майнер успешно изменен!');
  }, [onChangeMinor, success]);

  const handleChangePasswordSubmit = useCallback((data) => {
    console.log('Password change submitted:', data);
    success('Пароль успешно изменен!');
    handleClosePasswordModal();
  }, [handleClosePasswordModal, success]);

  if (!isOpen || !user) return null;

  const { name, email, specialty, avatarInitials } = user;

  return (
    <>
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
          showModal ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      >
        <div 
          className={`w-full max-w-2xl mx-4 bg-white dark:bg-[#111111] rounded-2xl shadow-xl border border-gray-200 dark:border-[#222222] transition-all duration-300 ${
            showModal ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#222222] pb-3">
              Личный кабинет
            </h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF3B77] to-[#7E3BF2] flex items-center justify-center text-white text-lg font-bold">
                  {avatarInitials}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                  <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-2 text-[#FF3B77]" />
                    <p className="text-sm">{email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <BookOpen className="h-5 w-5 mr-2 text-[#FF3B77]" />
                    <h4 className="font-semibold">Основная специальность</h4>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-[#1A1A1A] rounded-lg border border-gray-100 dark:border-[#222222]">
                    <p className="font-semibold text-gray-800 dark:text-white">{specialty}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Target className="h-5 w-5 mr-2 text-[#7E3BF2]" />
                    <h4 className="font-semibold">Выбранный майнер</h4>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-[#1A1A1A] rounded-lg border border-gray-100 dark:border-[#222222]">
                    <p className="font-semibold text-gray-800 dark:text-white">{currentMinorName}</p>
                  </div>
                </div>
              </div>

              <div className='space-y-3 pt-4 border-t border-gray-200 dark:border-[#222222]'>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Настройки аккаунта</h4>
                
                <button
                  onClick={handleOpenMinorModal}
                  className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors"
                >
                  <Target className="h-5 w-5" />
                  <span>Сменить майнер</span>
                </button>

                <button
                  onClick={handleOpenPasswordModal}
                  className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors"
                >
                  <Lock className="h-5 w-5" />
                  <span>Сменить пароль</span>
                </button>

                <button 
                  onClick={onLogout}
                  className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg text-red-600 border border-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Выйти из аккаунта</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={handleClosePasswordModal}
        onSubmit={handleChangePasswordSubmit}
      />
      
      <ChangeMinorModal
        isOpen={isMinorModalOpen}
        onClose={handleCloseMinorModal}
        onMinorChanged={handleMinorChangedSuccess}
      />
    </>
  )
});

export default UserProfileModal;