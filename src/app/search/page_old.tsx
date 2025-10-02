'use client';'use client';



import { useState } from 'react';import { useState } from 'react';

import Link from 'next/link';import Link from 'next/link';

import Header from '@/components/Header';

import Footer from '@/components/Footer';// Mock data for demonstration

import SalonCard from '@/components/SalonCard';const mockSalons = [

import { mockSalons } from '@/lib/mockData';  {

import { Filter, SlidersHorizontal, MapPin } from 'lucide-react';    id: 1,

    name: 'Tokyo Beauty Studio',

export default function SearchPage() {    chineseName: '东京美丽工作室',

  const [searchQuery, setSearchQuery] = useState('');    rating: 4.8,

  const [selectedArea, setSelectedArea] = useState('all');    reviewCount: 127,

  const [selectedPriceRange, setSelectedPriceRange] = useState('all');    distance: '0.8km',

  const [showFilters, setShowFilters] = useState(false);    price: '¥3,000-8,000',

    tags: ['中文服务', '染发专家', '现代风格'],

  const areas = ['全部', '天神', '博多', '中洲', '大名'];    image: '/api/placeholder/300/200',

  const priceRanges = [    chineseStaff: true,

    { value: 'all', label: '全部价格' },    area: '涩谷区'

    { value: 'low', label: '经济实惠 (¥)' },  },

    { value: 'medium', label: '中等价位 (¥¥)' },  {

    { value: 'high', label: '高端服务 (¥¥¥)' },    id: 2,

    { value: 'luxury', label: '奢华体验 (¥¥¥¥)' },    name: 'Elegant Hair Salon',

  ];    chineseName: '优雅发型沙龙',

    rating: 4.6,

  const filteredSalons = mockSalons.filter((salon) => {    reviewCount: 89,

    const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||    distance: '1.2km',

      salon.description.toLowerCase().includes(searchQuery.toLowerCase());    price: '¥2,500-6,000',

        tags: ['护发专家', '日式风格'],

    const matchesArea = selectedArea === 'all' || salon.location.area === selectedArea;    image: '/api/placeholder/300/200',

    const matchesPriceRange = selectedPriceRange === 'all' || salon.priceRange === selectedPriceRange;    chineseStaff: false,

    area: '新宿区'

    return matchesSearch && matchesArea && matchesPriceRange;  },

  });  {

    id: 3,

  return (    name: 'Modern Cut Harajuku',

    <div className="min-h-screen bg-gray-50">    chineseName: '原宿现代剪发',

      <Header />    rating: 4.9,

    reviewCount: 203,

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">    distance: '0.5km',

        <div className="mb-8">    price: '¥4,000-12,000',

          <h1 className="text-3xl font-bold text-gray-900 mb-4">搜索美容室</h1>    tags: ['中文服务', '时尚造型', '个性设计'],

          <p className="text-gray-600">在福冈发现{mockSalons.length}家优质美容室</p>    image: '/api/placeholder/300/200',

        </div>    chineseStaff: true,

    area: '原宿'

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">  }

          <div className="flex flex-col md:flex-row gap-4">];

            <div className="flex-1">

              <inputexport default function SearchPage() {

                type="text"  const [searchQuery, setSearchQuery] = useState('');

                placeholder="搜索美容室名称或服务..."  const [selectedArea, setSelectedArea] = useState('全部地区');

                value={searchQuery}  const [chineseStaffOnly, setChineseStaffOnly] = useState(false);

                onChange={(e) => setSearchQuery(e.target.value)}  const [sortBy, setSortBy] = useState('distance');

                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"

              />  const areas = ['全部地区', '涩谷区', '新宿区', '原宿', '银座', '上野'];

            </div>

  const filteredSalons = mockSalons.filter(salon => {

            <button    const matchesArea = selectedArea === '全部地区' || salon.area === selectedArea;

              onClick={() => setShowFilters(!showFilters)}    const matchesStaff = !chineseStaffOnly || salon.chineseStaff;

              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"    const matchesSearch = searchQuery === '' || 

            >      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

              <SlidersHorizontal className="w-5 h-5" />      salon.chineseName.includes(searchQuery);

              <span>筛选</span>    

            </button>    return matchesArea && matchesStaff && matchesSearch;

          </div>  });



          {showFilters && (  return (

            <div className="mt-4 pt-4 border-t border-gray-200">    <div className="min-h-screen bg-gray-50">

              <div className="grid md:grid-cols-2 gap-4">      {/* Header */}

                <div>      <header className="bg-white shadow-sm sticky top-0 z-10">

                  <label className="block text-sm font-medium text-gray-700 mb-2">        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <MapPin className="w-4 h-4 inline mr-1" />          <div className="flex justify-between items-center py-4">

                    地区            <div className="flex items-center">

                  </label>              <Link href="/" className="mr-4 text-pink-600">

                  <div className="flex flex-wrap gap-2">                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    {areas.map((area) => (                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />

                      <button                </svg>

                        key={area}              </Link>

                        onClick={() => setSelectedArea(area === '全部' ? 'all' : area)}              <h1 className="text-xl font-bold text-gray-900">搜索美容室</h1>

                        className={`px-4 py-2 rounded-full text-sm transition-colors ${            </div>

                          (area === '全部' && selectedArea === 'all') || selectedArea === area          </div>

                            ? 'bg-pink-600 text-white'        </div>

                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'      </header>

                        }`}

                      >      {/* Search Bar */}

                        {area}      <div className="bg-white border-b">

                      </button>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

                    ))}          <div className="flex items-center space-x-2">

                  </div>            <div className="flex-1 relative">

                </div>              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

                <div>              </svg>

                  <label className="block text-sm font-medium text-gray-700 mb-2">              <input

                    <Filter className="w-4 h-4 inline mr-1" />                type="text"

                    价格区间                placeholder="搜索美容室、服务或地点..."

                  </label>                value={searchQuery}

                  <select                onChange={(e) => setSearchQuery(e.target.value)}

                    value={selectedPriceRange}                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"

                    onChange={(e) => setSelectedPriceRange(e.target.value)}              />

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"            </div>

                  >            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">

                    {priceRanges.map((range) => (              搜索

                      <option key={range.value} value={range.value}>            </button>

                        {range.label}          </div>

                      </option>        </div>

                    ))}      </div>

                  </select>

                </div>      {/* Filters */}

              </div>      <div className="bg-white border-b">

            </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          )}          <div className="flex items-center space-x-4 overflow-x-auto">

        </div>            <select 

              value={selectedArea} 

        <div className="mb-4">              onChange={(e) => setSelectedArea(e.target.value)}

          <p className="text-gray-600">              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"

            找到 <span className="font-semibold text-pink-600">{filteredSalons.length}</span> 家美容室            >

          </p>              {areas.map(area => (

        </div>                <option key={area} value={area}>{area}</option>

              ))}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">            </select>

          {filteredSalons.map((salon) => (            

            <SalonCard key={salon.id} salon={salon} />            <label className="flex items-center space-x-2 text-sm">

          ))}              <input

        </div>                type="checkbox"

                checked={chineseStaffOnly}

        {filteredSalons.length === 0 && (                onChange={(e) => setChineseStaffOnly(e.target.checked)}

          <div className="text-center py-12">                className="rounded text-pink-600 focus:ring-pink-500"

            <div className="text-gray-400 mb-4">              />

              <Filter className="w-16 h-16 mx-auto" />              <span>仅显示中文服务</span>

            </div>            </label>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">未找到匹配的美容室</h3>            

            <p className="text-gray-600 mb-6">请尝试调整搜索条件</p>            <select 

            <button              value={sortBy} 

              onClick={() => {              onChange={(e) => setSortBy(e.target.value)}

                setSearchQuery('');              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"

                setSelectedArea('all');            >

                setSelectedPriceRange('all');              <option value="distance">距离最近</option>

              }}              <option value="rating">评分最高</option>

              className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors"              <option value="price">价格最低</option>

            >            </select>

              重置筛选          </div>

            </button>        </div>

          </div>      </div>

        )}

      </div>      {/* Results */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <Footer />        <div className="mb-4">

    </div>          <p className="text-gray-600">找到 {filteredSalons.length} 家美容室</p>

  );        </div>

}        

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