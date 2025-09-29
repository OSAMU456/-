'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Palette, Plus, Calendar, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Palette className="h-16 w-16 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Palette</h1>
              <p className="text-gray-600">AI-powered SNS auto-posting with Google Sheets integration</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => signIn('google')}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
              
              <div className="text-center text-sm text-gray-500">
                Connect your Google account to access Sheets and manage your content
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Content Palette</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Image
                  src={session.user?.image || '/default-avatar.png'}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
                <span>{session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Content Palette</h2>
          <p className="text-gray-600">Manage your social media content with AI-powered insights</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/spreadsheets" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
            <div className="flex items-center">
              <Plus className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Add Spreadsheet</h3>
                <p className="text-sm text-gray-600">Connect Google Sheets</p>
              </div>
            </div>
          </Link>

          <Link href="/content" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Content Library</h3>
                <p className="text-sm text-gray-600">Manage your posts</p>
              </div>
            </div>
          </Link>

          <Link href="/analytics" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Performance insights</p>
              </div>
            </div>
          </Link>

          <Link href="/settings" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-gray-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Settings</h3>
                <p className="text-sm text-gray-600">SNS accounts</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-gray-700">Connect your Google Sheets</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-gray-300 rounded-full mr-3"></div>
                <span className="text-gray-500">Link your SNS accounts</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-gray-300 rounded-full mr-3"></div>
                <span className="text-gray-500">Schedule your first post</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
