'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: '📊 仪表盘', icon: '📊' },
    { id: 'bookings', label: '📅 预约管理', icon: '📅' },
    { id: 'services', label: '✂️ 服务项目', icon: '✂️' },
    { id: 'staff', label: '👥 员工管理', icon: '👥' },
    { id: 'reviews', label: '⭐ 评价管理', icon: '⭐' },
    { id: 'settings', label: '⚙️ 店铺设置', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass fixed top-0 w-full z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="display-text text-2xl font-black gradient-text">
            美丽预约 - 商家后台
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              通知 (3)
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold">
              K
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[var(--muted)] min-h-screen p-6 fixed left-0">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'hover:bg-[var(--border)]'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label.replace(/^[^\s]+\s/, '')}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {activeSection === 'dashboard' && (
            <div className="animate-fade-in">
              <h1 className="display-text text-5xl font-black mb-8">
                欢迎回来，<span className="gradient-text">Kraemer Paris</span>
              </h1>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: '今日预约', value: '24', change: '+12%', icon: '📅' },
                  { label: '本月收入', value: '¥186,500', change: '+23%', icon: '💰' },
                  { label: '客户评分', value: '4.9', change: '+0.2', icon: '⭐' },
                  { label: '新增评价', value: '18', change: '+5', icon: '💬' },
                ].map((stat, idx) => (
                  <div key={idx} className="card p-6 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{stat.icon}</div>
                      <span className="text-green-500 text-sm font-semibold bg-green-500/10 px-2 py-1 rounded">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                    <div className="text-sm opacity-60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Bookings */}
              <div className="card p-6 mb-8 animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">最近预约</h2>
                  <button className="text-[var(--primary)] font-medium hover:underline">
                    查看全部
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: '张小姐', service: '染发', time: '2025-10-10 14:00', status: '已确认', stylist: '田中美子' },
                    { name: '李先生', service: '剪发', time: '2025-10-10 15:30', status: '已确认', stylist: '李明' },
                    { name: '王女士', service: '烫发', time: '2025-10-11 10:00', status: '待确认', stylist: '佐藤健' },
                    { name: '陈先生', service: '护理', time: '2025-10-11 13:00', status: '已确认', stylist: '王芳' },
                  ].map((booking, idx) => (
                    <div key={idx} className="bg-[var(--muted)] p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 flex items-center justify-center font-bold">
                          {booking.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold">{booking.name}</h4>
                          <p className="text-sm opacity-60">{booking.service} · {booking.stylist}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{booking.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === '已确认' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: '添加服务项目', desc: '添加新的美容服务', icon: '➕', action: 'services' },
                  { title: '管理员工', desc: '添加或编辑员工信息', icon: '👥', action: 'staff' },
                  { title: '回复评价', desc: '查看并回复客户评价', icon: '💬', action: 'reviews' },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSection(action.action)}
                    className="card p-6 text-left hover:scale-105 transition-transform animate-scale-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-4xl mb-4">{action.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                    <p className="text-sm opacity-60">{action.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="animate-fade-in">
              <h1 className="display-text text-4xl font-black mb-8">预约管理</h1>
              
              <div className="card p-6">
                <div className="flex gap-4 mb-6">
                  <input
                    type="date"
                    className="px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <select className="px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg focus:outline-none">
                    <option>全部状态</option>
                    <option>待确认</option>
                    <option>已确认</option>
                    <option>已完成</option>
                    <option>已取消</option>
                  </select>
                  <button className="btn-primary ml-auto">
                    + 新建预约
                  </button>
                </div>

                <div className="space-y-3">
                  {[...Array(8)].map((_, idx) => (
                    <div key={idx} className="bg-[var(--muted)] p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 flex items-center justify-center font-bold">
                          客
                        </div>
                        <div>
                          <h4 className="font-bold">客户 {idx + 1}</h4>
                          <p className="text-sm opacity-60">剪发 · 14:00</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          确认
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                          取消
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'services' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="display-text text-4xl font-black">服务项目</h1>
                <button className="btn-primary">
                  + 添加服务
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: '剪发', price: '¥3,500', time: '60分钟', bookings: 45 },
                  { name: '染发', price: '¥8,000', time: '120分钟', bookings: 32 },
                  { name: '烫发', price: '¥12,000', time: '150分钟', bookings: 18 },
                  { name: '护理', price: '¥2,500', time: '30分钟', bookings: 56 },
                ].map((service, idx) => (
                  <div key={idx} className="card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{service.name}</h3>
                      <button className="text-[var(--primary)] font-medium hover:underline">
                        编辑
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="opacity-60">价格:</span> <span className="font-semibold">{service.price}</span></p>
                      <p><span className="opacity-60">时长:</span> {service.time}</p>
                      <p><span className="opacity-60">本月预约:</span> {service.bookings} 次</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'staff' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="display-text text-4xl font-black">员工管理</h1>
                <button className="btn-primary">
                  + 添加员工
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: '田中美子', role: '首席设计师', bookings: 24, rating: 4.9 },
                  { name: '佐藤健', role: '高级设计师', bookings: 18, rating: 4.8 },
                  { name: '李明', role: '设计师', bookings: 15, rating: 4.7 },
                  { name: '王芳', role: '设计师', bookings: 12, rating: 4.8 },
                ].map((staff, idx) => (
                  <div key={idx} className="card p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 mx-auto mb-4 flex items-center justify-center text-4xl">
                      👤
                    </div>
                    <h3 className="text-xl font-bold mb-1">{staff.name}</h3>
                    <p className="text-sm opacity-60 mb-4">{staff.role}</p>
                    <div className="flex justify-around text-sm">
                      <div>
                        <div className="font-bold text-lg">{staff.bookings}</div>
                        <div className="opacity-60">预约</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{staff.rating}</div>
                        <div className="opacity-60">评分</div>
                      </div>
                    </div>
                    <button className="w-full mt-4 btn-secondary">
                      编辑资料
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'reviews' && (
            <div className="animate-fade-in">
              <h1 className="display-text text-4xl font-black mb-8">评价管理</h1>
              
              <div className="card p-6">
                <div className="space-y-4">
                  {[
                    { name: '张小姐', rating: 5, comment: '非常专业的服务！', date: '2025-09-28', replied: false },
                    { name: '李先生', rating: 5, comment: '环境优雅，下次还会再来。', date: '2025-09-25', replied: true },
                    { name: '王女士', rating: 4, comment: '整体不错，等待时间稍长。', date: '2025-09-20', replied: false },
                  ].map((review, idx) => (
                    <div key={idx} className="bg-[var(--muted)] p-5 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
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
                      <p className="opacity-80 mb-3">{review.comment}</p>
                      {review.replied ? (
                        <div className="bg-[var(--background)] p-3 rounded-lg text-sm">
                          <p className="font-semibold mb-1">店家回复:</p>
                          <p className="opacity-70">感谢您的光临和宝贵建议！</p>
                        </div>
                      ) : (
                        <button className="text-[var(--primary)] font-medium hover:underline text-sm">
                          回复评价
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="animate-fade-in">
              <h1 className="display-text text-4xl font-black mb-8">店铺设置</h1>
              
              <div className="card p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">店铺名称</label>
                  <input
                    type="text"
                    defaultValue="Kraemer Paris 福冈天神店"
                    className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">店铺介绍</label>
                  <textarea
                    rows={4}
                    defaultValue="来自巴黎的顶级发型沙龙，为您打造专属风格"
                    className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">营业时间</label>
                    <input
                      type="text"
                      defaultValue="10:00 - 20:00"
                      className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">联系电话</label>
                    <input
                      type="text"
                      defaultValue="092-1234-5678"
                      className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">店铺地址</label>
                  <input
                    type="text"
                    defaultValue="福冈市中央区天神2-3-10"
                    className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
                
                <button className="btn-primary w-full py-4">
                  保存设置
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
