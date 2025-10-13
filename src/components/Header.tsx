// 美丽预约 - Header Component
'use client';

import Link from 'next/link';
import { Search, User, Heart, Calendar } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-pink-600">美丽预约</div>
            <span className="hidden sm:inline text-xs text-gray-500">Beautiful Appointment</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="text-gray-700 hover:text-pink-600 transition-colors flex items-center space-x-1">
              <Search className="w-4 h-4" />
              <span>搜索美容室</span>
            </Link>
            <Link href="/styles" className="text-gray-700 hover:text-pink-600 transition-colors">
              发型图库
            </Link>
            <Link href="/areas" className="text-gray-700 hover:text-pink-600 transition-colors">
              热门地区
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pink-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-pink-600 transition-colors">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700 transition-colors flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>登录</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
