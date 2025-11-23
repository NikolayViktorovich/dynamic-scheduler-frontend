import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const PasswordField = React.memo(({ label, name, value, show, fieldKey, onToggle, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#7E3BF2] transition-colors duration-300" />
      </div>
      <input
        type={show ? 'text' : 'password'}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-[#333] rounded-xl bg-gray-50/50 dark:bg-[#1A1A1A]/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E3BF2]/20 focus:border-[#7E3BF2] transition-all duration-300"
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center transition-transform duration-200 hover:scale-110"
        onClick={() => onToggle(fieldKey)}
      >
        {show ? (
          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200" />
        )}
      </button>
    </div>
  </div>
));

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const { error, success } = useToast();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      error('Новый пароль и его подтверждение не совпадают!');
      return;
    }
    onSubmit(formData);
  }, [formData, onSubmit, error]);

  const togglePasswordVisibility = useCallback((field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  }, []);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'bg-black/50 backdrop-blur-md' : 'bg-black/0 backdrop-blur-0'
      }`}
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className={`w-full max-w-md mx-4 bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-6 transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222222] transition-all duration-200 hover:scale-110 hover:rotate-90"
        >
          <X className="h-5 w-5 transition-transform duration-200" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3B77] to-[#7E3BF2] mb-2 transition-all duration-300">
            Смена пароля
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-all duration-300">
            Введите текущий и новый пароль
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`transition-all duration-300 delay-75 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <PasswordField
              label="Текущий пароль"
              name="currentPassword"
              value={formData.currentPassword}
              show={showPasswords.current}
              fieldKey="current"
              onToggle={togglePasswordVisibility}
              onChange={handleChange}
            />
          </div>

          <div className={`transition-all duration-300 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <PasswordField
              label="Новый пароль"
              name="newPassword"
              value={formData.newPassword}
              show={showPasswords.new}
              fieldKey="new"
              onToggle={togglePasswordVisibility}
              onChange={handleChange}
            />
          </div>

          <div className={`transition-all duration-300 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <PasswordField
              label="Подтвердите новый пароль"
              name="confirmPassword"
              value={formData.confirmPassword}
              show={showPasswords.confirm}
              fieldKey="confirm"
              onToggle={togglePasswordVisibility}
              onChange={handleChange}
            />
          </div>

          <div className={`transition-all duration-300 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF3B77] to-[#7E3BF2] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-[#7E3BF2]/25 hover:shadow-[#FF3B77]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center group"
            >
              <span>Сохранить новый пароль</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ChangePasswordModal);