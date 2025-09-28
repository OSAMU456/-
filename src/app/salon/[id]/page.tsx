'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const mockSalon = {
  id: 1,
  name: 'Tokyo Beauty Studio',
  chineseName: '东京美丽工作室',
  rating: 4.8,
  reviewCount: 127,
  price: '¥3,000-8,000',
  address: '东京都涩谷区道玄坂1-2-3',
  phone: '03-1234-5678',
  hours: '10:00-20:00',
  description: '位于涩谷中心的专业美容沙龙，拥有经验丰富的中文服务团队。我们专注于为每位顾客提供个性化的造型设计，无论是日常护理还是特殊场合的造型，都能满足您的需求。',
  tags: ['中文服务', '染发专家', '现代风格'],
  chineseStaff: true,
  images: [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300'
  ]
};

const mockStaff = [
  {
    id: 1,
    name: '田中美香',
    chineseName: '田中美香',
    speciality: '染发・造型',
    experience: '8年',
    languages: ['日语', '中文'],
    image: '/api/placeholder/150/150'
  },
  {
    id: 2,
    name: '佐藤花子',
    chineseName: '佐藤花子',
    speciality: '剪发・护理',
    experience: '5年',
    languages: ['日语'],
    image: '/api/placeholder/150/150'
  }
];

const mockServices = [
  { name: '剪发', price: '¥3,000-5,000', duration: '60分钟' },
  { name: '染发', price: '¥6,000-8,000', duration: '120分钟' },
  { name: '烫发', price: '¥8,000-12,000', duration: '150分钟' },
  { name: '护理', price: '¥2,000-3,000', duration: '45分钟' }
];

export default function SalonDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  const availableTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/search" className="mr-4 text-pink-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">美容室详情</h1>
            </div>
            <button className="text-pink-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.486 4.486 0 000 6.364L12 20.364l7.682-7.682a4.486 4.486 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.486 4.486 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Images */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-6">
            <div className="h-64 md:h-80 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <span className="text-4xl">💇‍♀️</span>
            </div>
          </div>
          <div className="flex space-x-2 p-4 overflow-x-auto">
            {mockSalon.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  selectedImage === index ? 'ring-2 ring-pink-500' : ''
                }`}
              >
                <span className="text-sm">💄</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Salon Info */}
      <div className="bg-white mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{mockSalon.chineseName}</h1>
              <p className="text-gray-600">{mockSalon.name}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-gray-600 ml-1">{mockSalon.rating}</span>
                  <span className="text-gray-400 ml-1">({mockSalon.reviewCount}条评价)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-pink-600">{mockSalon.price}</p>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {mockSalon.tags.map(tag => (
              <span 
                key={tag} 
                className={`px-3 py-1 text-sm rounded-full ${
                  tag === '中文服务' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="mt-4 text-gray-700">{mockSalon.description}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">联系信息</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700">{mockSalon.address}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700">{mockSalon.phone}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">营业时间: {mockSalon.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">服务项目</h2>
          <div className="space-y-3">
            {mockServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">时长: {service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-pink-600">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff */}
      <div className="bg-white mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">美容师团队</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockStaff.map(staff => (
              <div key={staff.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                    <span className="text-xl">👩‍💼</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{staff.chineseName}</h3>
                    <p className="text-sm text-gray-600">{staff.speciality}</p>
                    <p className="text-sm text-gray-500">经验: {staff.experience}</p>
                    <div className="flex space-x-1 mt-1">
                      {staff.languages.map(lang => (
                        <span key={lang} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-white mt-2 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">在线预约</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">选择美容师</label>
              <select 
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">请选择美容师</option>
                {mockStaff.map(staff => (
                  <option key={staff.id} value={staff.id}>{staff.chineseName}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">选择日期</label>
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">选择时间</label>
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 text-sm rounded-lg border ${
                      selectedTime === time
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Booking Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <button 
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:bg-gray-300"
            disabled={!selectedStaff || !selectedDate || !selectedTime}
          >
            确认预约
          </button>
        </div>
      </div>
    </div>
  );
}