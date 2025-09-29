'use client'

import { useSession } from 'next-auth/react'
import { Palette, ArrowLeft, Plus, Twitter, Instagram, Facebook, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Settings() {
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
              <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
          <p className="text-gray-600">Manage your social media accounts and preferences</p>
        </div>

        {/* SNS Accounts Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connected Social Media Accounts</h3>
            <p className="text-gray-600">Link your social media accounts to enable auto-posting</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {/* Twitter/X */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-black rounded-lg">
                    <Twitter className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">X (formerly Twitter)</h4>
                    <p className="text-sm text-gray-600">Not connected</p>
                  </div>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect
                </button>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Instagram</h4>
                    <p className="text-sm text-gray-600">Coming soon</p>
                  </div>
                </div>
                <button 
                  disabled
                  className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Coming Soon
                </button>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Facebook className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Facebook</h4>
                    <p className="text-sm text-gray-600">Coming soon</p>
                  </div>
                </div>
                <button 
                  disabled
                  className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Information</h3>
            <p className="text-gray-600">Your account details from Google</p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <Image
                src={session.user?.image || '/default-avatar.png'}
                alt="Profile"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-900">{session.user?.name}</h4>
                <p className="text-gray-600">{session.user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration Note */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <LinkIcon className="h-6 w-6 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-yellow-800">API Configuration Required</h3>
              <p className="text-yellow-700 mt-1">
                To connect social media accounts, you need to configure API credentials in your environment variables. 
                Check the README.md file for setup instructions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}