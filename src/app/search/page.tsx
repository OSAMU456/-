'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const areas = ['全部', '天神', '博多', '中洲', '大名'];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="glass fixed top-0 w-full z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="display-text text-2xl font-black gradient-text">
            美丽预约
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              商家入驻
            </Link>
            <button className="btn-primary text-sm py-2 px-6">
              登录
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="card p-6 mb-8 animate-scale-in">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索美容室、服务项目..."
                className="flex-1 px-6 py-4 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
              <button className="btn-primary">
                🔍 搜索
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary px-6"
              >
                筛选
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-[var(--border)] animate-fade-in">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3">地区</label>
                    <div className="flex flex-wrap gap-2">
                      {areas.map((area) => (
                        <button
                          key={area}
                          onClick={() => setSelectedArea(area)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedArea === area
                              ? 'bg-[var(--primary)] text-white'
                              : 'bg-[var(--muted)] hover:bg-[var(--border)]'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">价格范围</label>
                    <select className="w-full px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option>全部价格</option>
                      <option>¥2,000 - ¥4,000</option>
                      <option>¥4,000 - ¥6,000</option>
                      <option>¥6,000 - ¥10,000</option>
                      <option>¥10,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">服务类型</label>
                    <select className="w-full px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option>全部服务</option>
                      <option>剪发</option>
                      <option>染发</option>
                      <option>烫发</option>
                      <option>护理</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold">
              为您找到 <span className="gradient-text">15</span> 家美容室
            </h2>
            <select className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg focus:outline-none">
              <option>推荐排序</option>
              <option>评分最高</option>
              <option>距离最近</option>
              <option>价格最低</option>
            </select>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, idx) => (
              <Link
                key={item}
                href={`/salon/${item}`}
                className="card overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-semibold">
                    中文服务
                  </div>
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ 4.{8 + (item % 2)}
                  </div>
                  <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-xs">
                    📍 {(item * 0.3).toFixed(1)}km
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--primary)] transition-colors">
                    Kraemer Paris 福冈{item}号店
                  </h3>
                  <p className="opacity-60 text-sm mb-3">
                    专业法式美发沙龙
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-1 bg-[var(--muted)] rounded text-xs">剪发</span>
                    <span className="px-2 py-1 bg-[var(--muted)] rounded text-xs">染发</span>
                    <span className="px-2 py-1 bg-[var(--muted)] rounded text-xs">烫发</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-[var(--primary)]">¥{3000 + item * 500}起</span>
                    <span className="opacity-50">{120 + item * 8} 条评价</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2 animate-fade-in">
            <button className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors">
              上一页
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === 1
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--card-bg)] border border-[var(--border)] hover:bg-[var(--muted)]'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
