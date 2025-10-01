'use client'

import { useSession } from 'next-auth/react'
import { Palette, ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Content() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <Palette className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Content Library</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
          <p className="text-gray-600">View and manage your scheduled social media posts</p>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex space-x-4">
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Posts
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-yellow-500" />
            Scheduled
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Posted
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
            Failed
          </button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connect your Google Sheets first to see your content library and scheduled posts.
            </p>
            
            <Link 
              href="/spreadsheets"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 inline-flex items-center"
            >
              Connect Spreadsheets
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}