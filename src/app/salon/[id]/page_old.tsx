'use client';'use client';



import { useState } from 'react';import { useState } from 'react';

import { useParams } from 'next/navigation';import Link from 'next/link';

import Image from 'next/image';

import Header from '@/components/Header';// Mock data for demonstration

import Footer from '@/components/Footer';const mockSalon = {

import {   id: 1,

  getSalonById,   name: 'Tokyo Beauty Studio',

  getStylistsBySalonId,   chineseName: '东京美丽工作室',

  getServicesBySalonId,  rating: 4.8,

  getStylesBySalonId,  reviewCount: 127,

  getReviewsBySalonId   price: '¥3,000-8,000',

} from '@/lib/mockData';  address: '东京都涩谷区道玄坂1-2-3',

import {   phone: '03-1234-5678',

  Star,   hours: '10:00-20:00',

  MapPin,   description: '位于涩谷中心的专业美容沙龙，拥有经验丰富的中文服务团队。我们专注于为每位顾客提供个性化的造型设计，无论是日常护理还是特殊场合的造型，都能满足您的需求。',

  Phone,   tags: ['中文服务', '染发专家', '现代风格'],

  Clock,   chineseStaff: true,

  Heart,  images: [

  Share2,    '/api/placeholder/400/300',

  Calendar,    '/api/placeholder/400/300',

  User,    '/api/placeholder/400/300'

  MessageCircle,  ]

  ChevronRight};

} from 'lucide-react';

const mockStaff = [

export default function SalonDetailPage() {  {

  const params = useParams();    id: 1,

  const salonId = params.id as string;    name: '田中美香',

      chineseName: '田中美香',

  const salon = getSalonById(salonId);    speciality: '染发・造型',

  const stylists = getStylistsBySalonId(salonId);    experience: '8年',

  const services = getServicesBySalonId(salonId);    languages: ['日语', '中文'],

  const styles = getStylesBySalonId(salonId);    image: '/api/placeholder/150/150'

  const reviews = getReviewsBySalonId(salonId);  },

  {

  const [selectedTab, setSelectedTab] = useState<'overview' | 'stylists' | 'services' | 'styles' | 'reviews'>('overview');    id: 2,

  const [showBookingModal, setShowBookingModal] = useState(false);    name: '佐藤花子',

    chineseName: '佐藤花子',

  if (!salon) {    speciality: '剪发・护理',

    return (    experience: '5年',

      <div className="min-h-screen bg-gray-50">    languages: ['日语'],

        <Header />    image: '/api/placeholder/150/150'

        <div className="max-w-7xl mx-auto px-4 py-16 text-center">  }

          <h1 className="text-2xl font-bold text-gray-900 mb-4">美容室未找到</h1>];

          <p className="text-gray-600">抱歉，该美容室不存在或已被删除。</p>

        </div>const mockServices = [

        <Footer />  { name: '剪发', price: '¥3,000-5,000', duration: '60分钟' },

      </div>  { name: '染发', price: '¥6,000-8,000', duration: '120分钟' },

    );  { name: '烫发', price: '¥8,000-12,000', duration: '150分钟' },

  }  { name: '护理', price: '¥2,000-3,000', duration: '45分钟' }

];

  const getOpeningHoursForToday = () => {

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];export default function SalonDetailPage() {

    const today = days[new Date().getDay()];  const [selectedImage, setSelectedImage] = useState(0);

    const hours = salon.openingHours[today as keyof typeof salon.openingHours];  const [selectedDate, setSelectedDate] = useState('');

    return hours ? `${hours.open} - ${hours.close}` : '休息日';  const [selectedTime, setSelectedTime] = useState('');

  };  const [selectedStaff, setSelectedStaff] = useState('');



  return (  const availableTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    <div className="min-h-screen bg-gray-50">

      <Header />  return (

    <div className="min-h-screen bg-gray-50">

      {/* Image Gallery */}      {/* Header */}

      <div className="relative h-96 bg-gray-200">      <header className="bg-white shadow-sm sticky top-0 z-10">

        <Image        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          src={salon.images[0]}          <div className="flex justify-between items-center py-4">

          alt={salon.name}            <div className="flex items-center">

          fill              <Link href="/search" className="mr-4 text-pink-600">

          className="object-cover"                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

        />                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />

        <div className="absolute top-4 right-4 flex space-x-2">                </svg>

          <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors">              </Link>

            <Heart className="w-5 h-5 text-gray-700" />              <h1 className="text-xl font-bold text-gray-900">美容室详情</h1>

          </button>            </div>

          <button className="bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors">            <button className="text-pink-600">

            <Share2 className="w-5 h-5 text-gray-700" />              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

          </button>                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.486 4.486 0 000 6.364L12 20.364l7.682-7.682a4.486 4.486 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.486 4.486 0 00-6.364 0z" />

        </div>              </svg>

      </div>            </button>

          </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">        </div>

        <div className="grid lg:grid-cols-3 gap-8">      </header>

          {/* Main Content */}

          <div className="lg:col-span-2">      {/* Images */}

            {/* Header */}      <div className="bg-white">

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">        <div className="max-w-7xl mx-auto">

              <div className="flex items-start justify-between mb-4">          <div className="aspect-w-16 aspect-h-9 md:aspect-h-6">

                <div>            <div className="h-64 md:h-80 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">

                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{salon.name}</h1>              <span className="text-4xl">💇‍♀️</span>

                  <p className="text-lg text-gray-600">{salon.nameJa}</p>            </div>

                </div>          </div>

                {salon.tags[0] && (          <div className="flex space-x-2 p-4 overflow-x-auto">

                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">            {mockSalon.images.map((_, index) => (

                    {salon.tags[0]}              <button

                  </span>                key={index}

                )}                onClick={() => setSelectedImage(index)}

              </div>                className={`w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex-shrink-0 flex items-center justify-center ${

                  selectedImage === index ? 'ring-2 ring-pink-500' : ''

              <div className="flex items-center space-x-4 mb-4">                }`}

                <div className="flex items-center space-x-1">              >

                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />                <span className="text-sm">💄</span>

                  <span className="font-semibold text-lg">{salon.rating}</span>              </button>

                </div>            ))}

                <span className="text-gray-500">({salon.reviewCount}条评价)</span>          </div>

              </div>        </div>

      </div>

              <p className="text-gray-700 leading-relaxed">{salon.description}</p>

      {/* Salon Info */}

              <div className="flex flex-wrap gap-2 mt-4">      <div className="bg-white mt-2">

                {salon.amenities.map((amenity, index) => (        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                  <span          <div className="flex items-start justify-between">

                    key={index}            <div className="flex-1">

                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"              <h1 className="text-2xl font-bold text-gray-900">{mockSalon.chineseName}</h1>

                  >              <p className="text-gray-600">{mockSalon.name}</p>

                    {amenity}              <div className="flex items-center mt-2">

                  </span>                <div className="flex items-center">

                ))}                  <span className="text-yellow-400 text-lg">★</span>

              </div>                  <span className="text-gray-600 ml-1">{mockSalon.rating}</span>

            </div>                  <span className="text-gray-400 ml-1">({mockSalon.reviewCount}条评价)</span>

                </div>

            {/* Tabs */}              </div>

            <div className="bg-white rounded-lg shadow-sm mb-6">            </div>

              <div className="border-b border-gray-200">            <div className="text-right">

                <nav className="flex overflow-x-auto">              <p className="text-2xl font-bold text-pink-600">{mockSalon.price}</p>

                  {[            </div>

                    { id: 'overview', label: '基本信息' },          </div>

                    { id: 'stylists', label: `发型师 (${stylists.length})` },          

                    { id: 'services', label: '服务项目' },          <div className="mt-4 flex flex-wrap gap-2">

                    { id: 'styles', label: '作品展示' },            {mockSalon.tags.map(tag => (

                    { id: 'reviews', label: `用户评价 (${reviews.length})` },              <span 

                  ].map((tab) => (                key={tag} 

                    <button                className={`px-3 py-1 text-sm rounded-full ${

                      key={tab.id}                  tag === '中文服务' 

                      onClick={() => setSelectedTab(tab.id as any)}                    ? 'bg-green-100 text-green-800' 

                      className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${                    : 'bg-gray-100 text-gray-600'

                        selectedTab === tab.id                }`}

                          ? 'border-pink-600 text-pink-600'              >

                          : 'border-transparent text-gray-500 hover:text-gray-700'                {tag}

                      }`}              </span>

                    >            ))}

                      {tab.label}          </div>

                    </button>          

                  ))}          <p className="mt-4 text-gray-700">{mockSalon.description}</p>

                </nav>        </div>

              </div>      </div>



              <div className="p-6">      {/* Contact Info */}

                {/* Overview Tab */}      <div className="bg-white mt-2">

                {selectedTab === 'overview' && (        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                  <div className="space-y-4">          <h2 className="text-xl font-bold text-gray-900 mb-4">联系信息</h2>

                    <div className="flex items-start space-x-3">          <div className="space-y-3">

                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />            <div className="flex items-center">

                      <div>              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                        <p className="font-medium text-gray-900 mb-1">地址</p>                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />

                        <p className="text-gray-600">{salon.address}</p>                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />

                      </div>              </svg>

                    </div>              <span className="text-gray-700">{mockSalon.address}</span>

            </div>

                    <div className="flex items-start space-x-3">            <div className="flex items-center">

                      <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      <div>                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />

                        <p className="font-medium text-gray-900 mb-1">电话</p>              </svg>

                        <a href={`tel:${salon.phone}`} className="text-pink-600 hover:underline">              <span className="text-gray-700">{mockSalon.phone}</span>

                          {salon.phone}            </div>

                        </a>            <div className="flex items-center">

                      </div>              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    </div>                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />

              </svg>

                    <div className="flex items-start space-x-3">              <span className="text-gray-700">营业时间: {mockSalon.hours}</span>

                      <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />            </div>

                      <div className="w-full">          </div>

                        <p className="font-medium text-gray-900 mb-2">营业时间</p>        </div>

                        <div className="space-y-1 text-sm">      </div>

                          {Object.entries(salon.openingHours).map(([day, hours]) => (

                            <div key={day} className="flex justify-between">      {/* Services */}

                              <span className="text-gray-600 capitalize">      <div className="bg-white mt-2">

                                {day === 'monday' && '周一'}        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                                {day === 'tuesday' && '周二'}          <h2 className="text-xl font-bold text-gray-900 mb-4">服务项目</h2>

                                {day === 'wednesday' && '周三'}          <div className="space-y-3">

                                {day === 'thursday' && '周四'}            {mockServices.map((service, index) => (

                                {day === 'friday' && '周五'}              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">

                                {day === 'saturday' && '周六'}                <div>

                                {day === 'sunday' && '周日'}                  <h3 className="font-semibold text-gray-900">{service.name}</h3>

                                {day === 'holidays' && '节假日'}                  <p className="text-sm text-gray-600">时长: {service.duration}</p>

                              </span>                </div>

                              <span className="text-gray-900">                <div className="text-right">

                                {hours ? `${hours.open} - ${hours.close}` : '休息'}                  <p className="font-semibold text-pink-600">{service.price}</p>

                              </span>                </div>

                            </div>              </div>

                          ))}            ))}

                        </div>          </div>

                      </div>        </div>

                    </div>      </div>

                  </div>

                )}      {/* Staff */}

      <div className="bg-white mt-2">

                {/* Stylists Tab */}        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {selectedTab === 'stylists' && (          <h2 className="text-xl font-bold text-gray-900 mb-4">美容师团队</h2>

                  <div className="grid md:grid-cols-2 gap-4">          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {stylists.map((stylist) => (            {mockStaff.map(staff => (

                      <div key={stylist.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">              <div key={staff.id} className="border border-gray-200 rounded-lg p-4">

                        <div className="flex items-start space-x-4">                <div className="flex items-center space-x-4">

                          <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">

                            <Image                    <span className="text-xl">👩‍💼</span>

                              src={stylist.image}                  </div>

                              alt={stylist.name}                  <div className="flex-1">

                              fill                    <h3 className="font-semibold text-gray-900">{staff.chineseName}</h3>

                              className="object-cover"                    <p className="text-sm text-gray-600">{staff.speciality}</p>

                            />                    <p className="text-sm text-gray-500">经验: {staff.experience}</p>

                          </div>                    <div className="flex space-x-1 mt-1">

                          <div className="flex-1">                      {staff.languages.map(lang => (

                            <h3 className="font-semibold text-lg text-gray-900">{stylist.name}</h3>                        <span key={lang} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">

                            <p className="text-sm text-gray-500 mb-2">{stylist.nameJa}</p>                          {lang}

                            <p className="text-sm text-gray-600 mb-2">{stylist.title}</p>                        </span>

                            <div className="flex items-center space-x-1 text-sm mb-2">                      ))}

                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />                    </div>

                              <span>{stylist.rating}</span>                  </div>

                              <span className="text-gray-400">({stylist.reviewCount})</span>                </div>

                            </div>              </div>

                            <div className="flex flex-wrap gap-1">            ))}

                              {stylist.specialties.slice(0, 3).map((specialty, idx) => (          </div>

                                <span key={idx} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">        </div>

                                  {specialty}      </div>

                                </span>

                              ))}      {/* Booking Section */}

                            </div>      <div className="bg-white mt-2 pb-6">

                          </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                        </div>          <h2 className="text-xl font-bold text-gray-900 mb-4">在线预约</h2>

                      </div>          

                    ))}          <div className="space-y-4">

                  </div>            <div>

                )}              <label className="block text-sm font-medium text-gray-700 mb-2">选择美容师</label>

              <select 

                {/* Services Tab */}                value={selectedStaff}

                {selectedTab === 'services' && (                onChange={(e) => setSelectedStaff(e.target.value)}

                  <div className="space-y-3">                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"

                    {services.map((service) => (              >

                      <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">                <option value="">请选择美容师</option>

                        <div className="flex justify-between items-start mb-2">                {mockStaff.map(staff => (

                          <div>                  <option key={staff.id} value={staff.id}>{staff.chineseName}</option>

                            <h3 className="font-semibold text-gray-900">{service.name}</h3>                ))}

                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>              </select>

                          </div>            </div>

                          <div className="text-right ml-4">            

                            <p className="font-bold text-pink-600">¥{service.price.toLocaleString()}</p>            <div>

                            <p className="text-xs text-gray-500">≈ ¥{service.priceRmb}</p>              <label className="block text-sm font-medium text-gray-700 mb-2">选择日期</label>

                          </div>              <input 

                        </div>                type="date"

                        <div className="flex items-center text-sm text-gray-500">                value={selectedDate}

                          <Clock className="w-4 h-4 mr-1" />                onChange={(e) => setSelectedDate(e.target.value)}

                          <span>{service.duration}分钟</span>                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"

                        </div>              />

                      </div>            </div>

                    ))}            

                  </div>            <div>

                )}              <label className="block text-sm font-medium text-gray-700 mb-2">选择时间</label>

              <div className="grid grid-cols-4 gap-2">

                {/* Styles Tab */}                {availableTimes.map(time => (

                {selectedTab === 'styles' && (                  <button

                  <div className="grid md:grid-cols-2 gap-4">                    key={time}

                    {styles.map((style) => (                    onClick={() => setSelectedTime(time)}

                      <div key={style.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-pink-300 transition-colors">                    className={`py-2 px-3 text-sm rounded-lg border ${

                        <div className="relative h-48">                      selectedTime === time

                          <Image                        ? 'bg-pink-600 text-white border-pink-600'

                            src={style.images[0]}                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'

                            alt={style.title}                    }`}

                            fill                  >

                            className="object-cover"                    {time}

                          />                  </button>

                        </div>                ))}

                        <div className="p-4">              </div>

                          <h3 className="font-semibold text-gray-900 mb-2">{style.title}</h3>            </div>

                          <p className="text-sm text-gray-600 mb-3">{style.description}</p>          </div>

                          <div className="flex flex-wrap gap-1">        </div>

                            {style.tags.slice(0, 4).map((tag, idx) => (      </div>

                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">

                                #{tag}      {/* Fixed Bottom Booking Button */}

                              </span>      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">

                            ))}        <div className="max-w-7xl mx-auto">

                          </div>          <button 

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:bg-gray-300"

                            <div className="flex items-center text-sm text-gray-500">            disabled={!selectedStaff || !selectedDate || !selectedTime}

                              <Heart className="w-4 h-4 mr-1" />          >

                              <span>{style.likes}</span>            确认预约

                            </div>          </button>

                          </div>        </div>

                        </div>      </div>

                      </div>    </div>

                    ))}  );

                  </div>}
                )}

                {/* Reviews Tab */}
                {selectedTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-pink-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">用户{review.userId.slice(0, 4)}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">
                              {new Date(review.createdAt).toLocaleDateString('zh-CN')}
                            </p>
                            <p className="text-gray-700">{review.comment}</p>
                            {review.response && (
                              <div className="mt-3 ml-4 pl-4 border-l-2 border-pink-200 bg-pink-50 p-3 rounded">
                                <p className="text-sm font-medium text-gray-900 mb-1">店家回复</p>
                                <p className="text-sm text-gray-700">{review.response.comment}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">价格区间</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {salon.priceRange === 'low' && '¥¥'}
                  {salon.priceRange === 'medium' && '¥¥¥'}
                  {salon.priceRange === 'high' && '¥¥¥¥'}
                  {salon.priceRange === 'luxury' && '¥¥¥¥¥'}
                </div>
                <div className="text-sm text-gray-500">根据服务项目而定</div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2 mb-3"
              >
                <Calendar className="w-5 h-5" />
                <span>立即预约</span>
              </button>

              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>咨询客服</span>
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">今日营业</span>
                  <span className="font-medium text-gray-900">{getOpeningHoursForToday()}</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{salon.location.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
