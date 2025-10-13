'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'glass shadow-lg' : ''
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="display-text text-3xl font-black gradient-text">
            美丽预约
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              发现美容室
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              商家入驻
            </Link>
            <button className="btn-primary text-sm">
              登录 / 注册
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-[var(--secondary)]/10 to-[var(--accent)]/10 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="display-text text-6xl md:text-8xl font-black mb-6 leading-tight">
              发现福冈
              <br />
              <span className="gradient-text">最美瞬间</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-70 mb-12 font-light">
              为在日中国人提供专业美容服务预约平台
            </p>
            
            {/* Search Bar */}
            <div className="card p-4 max-w-3xl mx-auto animate-scale-in">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="搜索美容室、服务项目..."
                  className="flex-1 px-6 py-4 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
                <Link href="/search" className="btn-primary whitespace-nowrap">
                  🔍 立即搜索
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-40 left-10 w-20 h-20 bg-[var(--primary)]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 bg-[var(--secondary)]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="display-text text-5xl font-black text-center mb-16 animate-fade-in-up">
            为什么选择<span className="gradient-text">美丽预约</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌟',
                title: '精选美容室',
                desc: '福冈地区优质美容室精选推荐',
                delay: '0s'
              },
              {
                icon: '💬',
                title: '中文服务',
                desc: '全程中文沟通，无语言障碍',
                delay: '0.1s'
              },
              {
                icon: '⚡',
                title: '即时预约',
                desc: '在线实时预约，方便快捷',
                delay: '0.2s'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card p-8 text-center hover:scale-105 transition-transform animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="text-6xl mb-4 animate-float">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="opacity-70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Salons */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="display-text text-5xl font-black animate-fade-in-up">
              热门<span className="gradient-text">美容室</span>
            </h2>
            <Link href="/search" className="btn-secondary animate-slide-in-right">
              查看全部 →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, idx) => (
              <Link
                key={item}
                href={`/salon/${item}`}
                className="card overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ 4.9
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                    Kraemer Paris 福冈店 {item}
                  </h3>
                  <p className="opacity-70 text-sm mb-4">
                    专业法式美发沙龙 · 天神地区
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--primary)]">¥3,500起</span>
                    <span className="opacity-50">评价 128+</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="display-text text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">
            开始你的美丽之旅
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            立即预约福冈最专业的美容服务
          </p>
          <button className="bg-white text-[var(--primary)] hover:bg-gray-100 font-bold py-4 px-12 rounded-xl text-lg transition-all hover:scale-105 shadow-2xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
            立即预约
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--muted)] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="display-text text-2xl font-black gradient-text mb-4">美丽预约</h3>
              <p className="text-sm opacity-70">
                为在日中国人提供最专业的美容预约服务
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">服务</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><Link href="/search" className="hover:text-[var(--primary)] transition-colors">美容室搜索</Link></li>
                <li><Link href="/search" className="hover:text-[var(--primary)] transition-colors">在线预约</Link></li>
                <li><Link href="/admin" className="hover:text-[var(--primary)] transition-colors">商家入驻</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">支持</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">常见问题</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">关注我们</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  R
                </a>
                <a href="#" className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  W
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-8 text-center text-sm opacity-70">
            <p>© 2025 美丽预约 Meiliyuyue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
