'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const mockSalons = [
  {
    id: 1,
    name: 'Tokyo Beauty Studio',
    chineseName: '东京美丽工作室',
    rating: 4.8,
    reviewCount: 127,
    distance: '0.8km',
    price: '¥3,000-8,000',
    tags: ['中文服务', '染发专家', '现代风格'],
    image: '/api/placeholder/300/200',
    chineseStaff: true,
    area: '涩谷区'
  },
  {
    id: 2,
    name: 'Elegant Hair Salon',
    chineseName: '优雅发型沙龙',
    rating: 4.6,
    reviewCount: 89,
    distance: '1.2km',
    price: '¥2,500-6,000',
    tags: ['护发专家', '日式风格'],
    image: '/api/placeholder/300/200',
    chineseStaff: false,
    area: '新宿区'
  },
  {
    id: 3,
    name: 'Modern Cut Harajuku',
    chineseName: '原宿现代剪发',
    rating: 4.9,
    reviewCount: 203,
    distance: '0.5km',
    price: '¥4,000-12,000',
    tags: ['中文服务', '时尚造型', '个性设计'],
    image: '/api/placeholder/300/200',
    chineseStaff: true,
    area: '原宿'
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('全部地区');
  const [chineseStaffOnly, setChineseStaffOnly] = useState(false);
  const [sortBy, setSortBy] = useState('distance');

  const areas = ['全部地区', '涩谷区', '新宿区', '原宿', '银座', '上野'];

  const filteredSalons = mockSalons.filter(salon => {
    const matchesArea = selectedArea === '全部地区' || salon.area === selectedArea;
    const matchesStaff = !chineseStaffOnly || salon.chineseStaff;
    const matchesSearch = searchQuery === '' || 
      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.chineseName.includes(searchQuery);
    
    return matchesArea && matchesStaff && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="mr-4 text-pink-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">搜索美容室</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜索美容室、服务或地点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
              搜索
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <select 
              value={selectedArea} 
              onChange={(e) => setSelectedArea(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={chineseStaffOnly}
                onChange={(e) => setChineseStaffOnly(e.target.checked)}
                className="rounded text-pink-600 focus:ring-pink-500"
              />
              <span>仅显示中文服务</span>
            </label>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="distance">距离最近</option>
              <option value="rating">评分最高</option>
              <option value="price">价格最低</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <p className="text-gray-600">找到 {filteredSalons.length} 家美容室</p>
        </div>
        
        <div className="grid gap-4 md:gap-6">
          {filteredSalons.map(salon => (
            <div key={salon.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex p-4">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-lg flex-shrink-0 mr-4">
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💇‍♀️</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{salon.chineseName}</h3>
                      <p className="text-sm text-gray-500">{salon.name}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{salon.rating}</span>
                          <span className="text-sm text-gray-400 ml-1">({salon.reviewCount})</span>
                        </div>
                        <span className="text-sm text-gray-400 mx-2">•</span>
                        <span className="text-sm text-gray-600">{salon.distance}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-pink-600">{salon.price}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {salon.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`px-2 py-1 text-xs rounded-full ${
                          tag === '中文服务' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-pink-700 transition-colors">
                      立即预约
                    </button>
                    <Link 
                      href={`/salon/${salon.id}`}
                      className="border border-gray-200 text-gray-600 py-2 px-4 rounded-lg text-sm hover:bg-gray-50 transition-colors text-center"
                    >
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}