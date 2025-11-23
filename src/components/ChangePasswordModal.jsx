import React, { useState, useCallback } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, X } from 'lucide-react';

const PasswordField = React.memo(({ label, name, value, show, fieldKey, onToggle, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#7E3BF2] transition-colors" />
      </div>
      <input
        type={show ? 'text' : 'password'}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-[#333] rounded-xl bg-gray-50/50 dark:bg-[#1A1A1A]/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7E3BF2]/20 focus:border-[#7E3BF2] transition-all"
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => onToggle(fieldKey)}
      >
        {show ? (
          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
        )}
      </button>
    </div>
  </div>
));

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {
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

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Новый пароль и его подтверждение не совпадают!');
      return;
    }
    onSubmit(formData);
  }, [formData, onSubmit]);

  const togglePasswordVisibility = useCallback((field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md" onClick={onClose}>
      <div 
        className="w-full max-w-md mx-4 bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-6 transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3B77] to-[#7E3BF2] mb-2">
            Смена пароля
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Введите текущий и новый пароль
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordField
            label="Текущий пароль"
            name="currentPassword"
            value={formData.currentPassword}
            show={showPasswords.current}
            fieldKey="current"
            onToggle={togglePasswordVisibility}
            onChange={handleChange}
          />

          <PasswordField
            label="Новый пароль"
            name="newPassword"
            value={formData.newPassword}
            show={showPasswords.new}
            fieldKey="new"
            onToggle={togglePasswordVisibility}
            onChange={handleChange}
          />

          <PasswordField
            label="Подтвердите новый пароль"
            name="confirmPassword"
            value={formData.confirmPassword}
            show={showPasswords.confirm}
            fieldKey="confirm"
            onToggle={togglePasswordVisibility}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF3B77] to-[#7E3BF2] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-[#7E3BF2]/25 hover:shadow-[#FF3B77]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center group"
          >
            <span>Сохранить новый пароль</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ChangePasswordModal);