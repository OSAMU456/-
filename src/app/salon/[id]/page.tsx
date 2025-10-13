'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SalonDetailPage() {
  const [selectedTab, setSelectedTab] = useState('about');
  const [selectedDate, setSelectedDate] = useState('2025-10-10');
  const [selectedTime, setSelectedTime] = useState('');

  const tabs = [
    { id: 'about', label: '关于我们' },
    { id: 'menu', label: '服务项目' },
    { id: 'stylist', label: '发型师' },
    { id: 'reviews', label: '评价' },
  ];

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '13:00',
    '14:00', '14:30', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="glass fixed top-0 w-full z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="display-text text-2xl font-black gradient-text">
            美丽预约
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/search" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              返回搜索
            </Link>
            <button className="btn-primary text-sm py-2 px-6">
              登录
            </button>
          </div>
        </nav>
      </header>

      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--secondary)]/20 to-[var(--accent)]/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl mb-4 animate-float">✨</div>
              <p className="text-sm opacity-60">美容室图片</p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="glass px-4 py-2 rounded-full text-sm font-semibold">中文服务</span>
            <span className="glass px-4 py-2 rounded-full text-sm font-semibold">⭐ 4.9</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Salon Header */}
              <div className="mb-8 animate-fade-in-up">
                <h1 className="display-text text-5xl font-black mb-3">
                  Kraemer Paris 福冈天神店
                </h1>
                <p className="text-xl opacity-70 mb-4">
                  来自巴黎的顶级发型沙龙，为您打造专属风格
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    📍 福冈市中央区天神2-3-10
                  </span>
                  <span className="flex items-center gap-2">
                    ⏰ 10:00 - 20:00
                  </span>
                  <span className="flex items-center gap-2">
                    💬 支持中文
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="card mb-6 animate-scale-in">
                <div className="flex border-b border-[var(--border)] overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                        selectedTab === tab.id
                          ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {selectedTab === 'about' && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-2xl font-bold mb-4">关于我们</h3>
                      <p className="leading-relaxed opacity-80">
                        Kraemer Paris 是来自法国巴黎的顶级发型沙龙，在日本开设多家分店。
                        我们拥有经验丰富的发型师团队，专注于为每位客户打造最适合的发型。
                      </p>
                      <p className="leading-relaxed opacity-80">
                        我们提供中文服务，让中国客户在日本也能享受无语言障碍的美容体验。
                        使用高品质的染发和护理产品，确保您的头发健康美丽。
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-[var(--muted)] p-4 rounded-xl">
                          <div className="text-3xl mb-2">🏆</div>
                          <h4 className="font-bold mb-1">专业团队</h4>
                          <p className="text-sm opacity-70">10年以上经验的发型师</p>
                        </div>
                        <div className="bg-[var(--muted)] p-4 rounded-xl">
                          <div className="text-3xl mb-2">🎨</div>
                          <h4 className="font-bold mb-1">个性定制</h4>
                          <p className="text-sm opacity-70">根据您的风格量身打造</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'menu' && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-2xl font-bold mb-4">服务项目</h3>
                      {[
                        { name: '剪发', price: '¥3,500', time: '60分钟', desc: '专业剪发，包含洗发和造型' },
                        { name: '染发', price: '¥8,000', time: '120分钟', desc: '全头染发，包含护理和造型' },
                        { name: '烫发', price: '¥12,000', time: '150分钟', desc: '专业烫发，包含护理和造型' },
                        { name: '护理', price: '¥2,500', time: '30分钟', desc: '深层头发护理，修复受损发质' },
                      ].map((service, idx) => (
                        <div key={idx} className="bg-[var(--muted)] p-5 rounded-xl flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-bold mb-2">{service.name}</h4>
                            <p className="text-sm opacity-70 mb-2">{service.desc}</p>
                            <p className="text-sm opacity-50">⏱ {service.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[var(--primary)]">{service.price}</p>
                            <button className="mt-2 text-sm font-medium hover:underline">
                              预约
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'stylist' && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-2xl font-bold mb-4">我们的发型师</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: '田中 美子', title: '首席设计师', exp: '15年', lang: '日语、中文' },
                          { name: '佐藤 健', title: '高级设计师', exp: '12年', lang: '日语、英语' },
                          { name: '李 明', title: '设计师', exp: '8年', lang: '中文、日语' },
                          { name: '王 芳', title: '设计师', exp: '6年', lang: '中文、日语' },
                        ].map((stylist, idx) => (
                          <div key={idx} className="card p-5">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 mb-4 flex items-center justify-center text-3xl">
                              👤
                            </div>
                            <h4 className="text-lg font-bold mb-1">{stylist.name}</h4>
                            <p className="text-sm opacity-70 mb-2">{stylist.title}</p>
                            <p className="text-sm opacity-50">经验: {stylist.exp}</p>
                            <p className="text-sm opacity-50">语言: {stylist.lang}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTab === 'reviews' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold">客户评价</h3>
                        <div className="text-right">
                          <div className="text-3xl font-black gradient-text">4.9</div>
                          <div className="text-sm opacity-60">基于 128 条评价</div>
                        </div>
                      </div>

                      {[
                        { name: '张小姐', rating: 5, date: '2025-09-28', comment: '非常专业的服务！发型师很耐心，中文沟通无障碍。做出来的发型超满意！' },
                        { name: '李先生', rating: 5, date: '2025-09-25', comment: '环境优雅，服务周到。价格合理，下次还会再来。' },
                        { name: '王女士', rating: 4, date: '2025-09-20', comment: '整体不错，发型师技术很好，就是等待时间稍长。' },
                      ].map((review, idx) => (
                        <div key={idx} className="bg-[var(--muted)] p-5 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 flex items-center justify-center font-bold">
                                {review.name[0]}
                              </div>
                              <div>
                                <h4 className="font-bold">{review.name}</h4>
                                <p className="text-sm opacity-50">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <span key={i} className="text-yellow-500">⭐</span>
                              ))}
                            </div>
                          </div>
                          <p className="opacity-80">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-bold mb-6">立即预约</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">选择日期</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">选择时间</label>
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedTime === time
                              ? 'bg-[var(--primary)] text-white'
                              : 'bg-[var(--muted)] hover:bg-[var(--border)]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">选择服务</label>
                    <select className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option>剪发 - ¥3,500</option>
                      <option>染发 - ¥8,000</option>
                      <option>烫发 - ¥12,000</option>
                      <option>护理 - ¥2,500</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">选择发型师（可选）</label>
                    <select className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option>随机分配</option>
                      <option>田中 美子</option>
                      <option>佐藤 健</option>
                      <option>李 明</option>
                      <option>王 芳</option>
                    </select>
                  </div>

                  <button className="w-full btn-primary py-4 text-base font-bold">
                    确认预约
                  </button>

                  <div className="text-center text-sm opacity-60 mt-4">
                    预约后将收到确认短信
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
