'use client'

import { useSession } from 'next-auth/react'
import { Palette, ArrowLeft, Plus, ExternalLink, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSpreadsheets } from '@/hooks/use-spreadsheets'

export default function Spreadsheets() {
  const { data: session } = useSession()
  const router = useRouter()
  const { spreadsheets, loading, error, addSpreadsheet } = useSpreadsheets()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSpreadsheetId, setNewSpreadsheetId] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [addError, setAddError] = useState('')

  if (!session) {
    router.push('/')
    return null
  }

  const handleAddSpreadsheet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSpreadsheetId.trim()) return

    setIsAdding(true)
    setAddError('')

    try {
      await addSpreadsheet(newSpreadsheetId.trim())
      setNewSpreadsheetId('')
      setShowAddForm(false)
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Failed to add spreadsheet')
    } finally {
      setIsAdding(false)
    }
  }

  const extractSpreadsheetId = (url: string) => {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
    return match ? match[1] : url
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
              <h1 className="text-xl font-semibold text-gray-900">Spreadsheets</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Spreadsheet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Google Sheets Integration</h2>
          <p className="text-gray-600">Connect your Google Spreadsheets to manage your content library</p>
        </div>

        {/* Add Spreadsheet Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border mb-8 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Spreadsheet</h3>
            <form onSubmit={handleAddSpreadsheet} className="space-y-4">
              <div>
                <label htmlFor="spreadsheet-url" className="block text-sm font-medium text-gray-700 mb-2">
                  Google Sheets URL or ID
                </label>
                <input
                  id="spreadsheet-url"
                  type="text"
                  value={newSpreadsheetId}
                  onChange={(e) => setNewSpreadsheetId(extractSpreadsheetId(e.target.value))}
                  placeholder="https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/... or just the ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isAdding}
                />
              </div>
              
              {addError && (
                <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{addError}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={isAdding || !newSpreadsheetId.trim()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Spreadsheet
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewSpreadsheetId('')
                    setAddError('')
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center text-red-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error loading spreadsheets: {error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-gray-600">Loading spreadsheets...</p>
          </div>
        )}

        {/* Spreadsheets List */}
        {!loading && spreadsheets.length > 0 && (
          <div className="space-y-4">
            {spreadsheets.map((spreadsheet) => (
              <div key={spreadsheet.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{spreadsheet.name}</h3>
                      <p className="text-sm text-gray-600">
                        Added {new Date(spreadsheet.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={spreadsheet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && spreadsheets.length === 0 && !showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center">
                  <ExternalLink className="h-12 w-12 text-indigo-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No spreadsheets connected</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Connect your Google Sheets to start managing your social media content. 
                We&apos;ll automatically import your content data and schedule posts.
              </p>
              
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Connect Google Sheets
              </button>
              
              <div className="mt-8 text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-gray-900 mb-3">Required columns in your spreadsheet:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900">Post Date</h5>
                    <p className="text-sm text-gray-600">When to publish the post</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900">Content Text</h5>
                    <p className="text-sm text-gray-600">The text content of your post</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900">Image URL</h5>
                    <p className="text-sm text-gray-600">Optional image for the post</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}