'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UserIcon, 
  CogIcon,
  ArrowLeftOnRectangleIcon,
  CalendarIcon,
  BeakerIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { authService } from '@/lib/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Öğünler', href: '/dashboard/meals', icon: CalendarIcon },
  { name: 'Su Takibi', href: '/dashboard/water', icon: BeakerIcon },
  { name: 'Hedefler', href: '/dashboard/goals', icon: TagIcon },
  { name: 'Analiz', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Profil', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Ayarlar', href: '/dashboard/settings', icon: CogIcon },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/login';
  };

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">FitTrack</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
            {!collapsed && 'Çıkış Yap'}
          </button>
        </div>
      </div>
    </div>
  );
} 