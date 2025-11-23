import React, { useEffect, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastNotification = ({ id, message, type = 'success', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    // Анимация появления
    setTimeout(() => setIsVisible(true), 10);

    // Автоматическое закрытие
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[type] || CheckCircle;

  const styles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      text: 'text-green-800 dark:text-green-200',
      gradient: 'from-green-500 to-green-600',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      text: 'text-red-800 dark:text-red-200',
      gradient: 'from-red-500 to-red-600',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      text: 'text-yellow-800 dark:text-yellow-200',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      text: 'text-blue-800 dark:text-blue-200',
      gradient: 'from-blue-500 to-blue-600',
    },
  };

  const style = styles[type] || styles.success;

  return (
    <div
      className={`mb-3 w-full max-w-md mx-auto transition-all duration-300 ${
        isVisible && !isLeaving
          ? 'opacity-100 translate-x-0 scale-100'
          : 'opacity-0 translate-x-full scale-95'
      }`}
    >
      <div
        className={`relative flex items-start space-x-3 p-4 rounded-xl border-2 ${style.bg} ${style.border} backdrop-blur-sm shadow-lg`}
      >
        {/* Градиентная полоска слева */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${style.gradient} rounded-l-xl`} />
        
        {/* Иконка */}
        <div className={`flex-shrink-0 ${style.icon}`}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Текст */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${style.text}`}>{message}</p>
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={handleClose}
          className={`flex-shrink-0 p-1 rounded-full ${style.icon} hover:bg-black/5 dark:hover:bg-white/10 transition-colors`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;

