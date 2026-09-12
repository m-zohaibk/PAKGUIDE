'use client';

import React from 'react';
import {
  Shield,
  Fingerprint,
  Home,
  BookOpen,
  CreditCard,
  Building2,
  Plane,
  Gift,
  ShieldCheck,
  MapPin,
  Smartphone,
  Car
} from 'lucide-react';

interface AppIconProps {
  appId: string;
  iconBg?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AppIcon: React.FC<AppIconProps> = ({ appId, iconBg = 'bg-pakgreen-800 text-white', size = 'md' }) => {
  const dimensionClass =
    size === 'sm'
      ? 'w-10 h-10 rounded-xl text-base'
      : size === 'lg'
      ? 'w-16 h-16 rounded-3xl text-2xl'
      : 'w-14 h-14 rounded-2xl text-xl';

  const iconSizeClass =
    size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-7 h-7';

  const renderIcon = () => {
    switch (appId) {
      case 'pak-identity':
        return <Fingerprint className={`${iconSizeClass} text-pakgold-300 animate-pulse`} />;
      case 'dastak-doorstep':
        return <Home className={`${iconSizeClass} text-pakgold-400`} />;
      case 'passport-fee-asan':
        return <BookOpen className={`${iconSizeClass} text-emerald-300`} />;
      case 'epay-punjab':
        return <CreditCard className={`${iconSizeClass} text-yellow-300`} />;
      case 'pakistan-citizen-portal':
        return <ShieldCheck className={`${iconSizeClass} text-emerald-300`} />;
      case 'passtrack-pakistan':
        return <Plane className={`${iconSizeClass} text-indigo-300`} />;
      case 'city-app-islamabad':
        return <Building2 className={`${iconSizeClass} text-teal-300`} />;
      case 'bisp-8171-app':
        return <Gift className={`${iconSizeClass} text-pakgold-400`} />;
      case 'sindh-police-khidmat':
        return <Shield className={`${iconSizeClass} text-blue-300`} />;
      case 'kp-citizens-portal':
        return <MapPin className={`${iconSizeClass} text-emerald-300`} />;
      default:
        return <Smartphone className={`${iconSizeClass} text-white`} />;
    }
  };

  return (
    <div
      className={`${dimensionClass} ${iconBg} flex items-center justify-center font-black shadow-md border border-white/20 shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
    >
      {renderIcon()}
    </div>
  );
};
