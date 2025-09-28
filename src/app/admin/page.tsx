'use client';

import { useState } from 'react';

// Mock data for demonstration
const mockBookings = [
  {
    id: 1,
    customerName: '张小美',
    service: '剪发 + 染发',
    staff: '田中美香',
    date: '2024-01-15',
    time: '14:00',
    status: 'confirmed',
    price: '¥8,000'
  },
  {
    id: 2,
    customerName: '李明',
    service: '剪发',
    staff: '佐藤花子',
    date: '2024-01-15',
    time: '16:00',
    status: 'pending',
    price: '¥4,000'
  },
  {
    id: 3,
    customerName: '王丽',
    service: '护理',
    staff: '田中美香',
    date: '2024-01-16',
    time: '10:00',
    status: 'completed',
    price: '¥3,000'
  }
];

const mockStats = {
  todayBookings: 8,
  todayRevenue: '¥45,000',
  monthlyBookings: 156,
  monthlyRevenue: '¥680,000'
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return '已确认';
      case 'pending': return '待确认';
      case 'completed': return '已完成';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-600">美丽预约</h1>
              <span className="ml-2 text-sm text-gray-600">商家管理后台</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">欢迎, 东京美丽工作室</span>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors">
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: '仪表盘' },
              { id: 'bookings', name: '预约管理' },
              { id: 'staff', name: '员工管理' },
              { id: 'salon', name: '沙龙信息' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📅</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">今日预约</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.todayBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">💰</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">今日营业额</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.todayRevenue}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm">📊</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">本月预约</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.monthlyBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 text-sm">💎</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">本月营业额</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.monthlyRevenue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">最近预约</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客户</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">美容师</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockBookings.slice(0, 5).map(booking => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.staff}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.date} {booking.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-600">
                          {booking.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">预约管理</h2>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option>全部状态</option>
                  <option>待确认</option>
                  <option>已确认</option>
                  <option>已完成</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客户</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">美容师</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockBookings.map(booking => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.staff}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.date} {booking.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-600">
                        {booking.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        {booking.status === 'pending' && (
                          <>
                            <button className="text-green-600 hover:text-green-900">确认</button>
                            <button className="text-red-600 hover:text-red-900">拒绝</button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button className="text-blue-600 hover:text-blue-900">完成</button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === 'staff' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">员工管理</h2>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors">
                添加员工
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                      <span className="text-xl">👩‍💼</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">田中美香</h3>
                      <p className="text-sm text-gray-600">染发・造型专家</p>
                      <p className="text-sm text-gray-500">经验: 8年</p>
                      <div className="flex space-x-1 mt-2">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">中文</span>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">日语</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-pink-600 text-white py-2 px-3 rounded text-sm hover:bg-pink-700 transition-colors">
                      编辑信息
                    </button>
                    <button className="border border-gray-200 text-gray-600 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                      排班
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                      <span className="text-xl">👩‍💼</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">佐藤花子</h3>
                      <p className="text-sm text-gray-600">剪发・护理专家</p>
                      <p className="text-sm text-gray-500">经验: 5年</p>
                      <div className="flex space-x-1 mt-2">
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">日语</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-pink-600 text-white py-2 px-3 rounded text-sm hover:bg-pink-700 transition-colors">
                      编辑信息
                    </button>
                    <button className="border border-gray-200 text-gray-600 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                      排班
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Salon Info Tab */}
        {activeTab === 'salon' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">沙龙信息管理</h2>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">沙龙名称（中文）</label>
                    <input 
                      type="text" 
                      defaultValue="东京美丽工作室"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">沙龙名称（日文）</label>
                    <input 
                      type="text" 
                      defaultValue="Tokyo Beauty Studio"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">地址</label>
                  <input 
                    type="text" 
                    defaultValue="东京都涩谷区道玄坂1-2-3"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
                    <input 
                      type="tel" 
                      defaultValue="03-1234-5678"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">营业时间</label>
                    <input 
                      type="text" 
                      defaultValue="10:00-20:00"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">沙龙介绍</label>
                  <textarea 
                    rows={4}
                    defaultValue="位于涩谷中心的专业美容沙龙，拥有经验丰富的中文服务团队。我们专注于为每位顾客提供个性化的造型设计，无论是日常护理还是特殊场合的造型，都能满足您的需求。"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    保存更改
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}