import { MessagesSquare, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const InterviewQA = () => {
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive Level']
  const questionCounts = [
    { value: '5', label: '5 Questions' },
    { value: '10', label: '10 Questions' },
    { value: '15', label: '15 Questions' }
  ]

  const [selectedExperience, setSelectedExperience] = useState('Mid Level')
  const [selectedCount, setSelectedCount] = useState('10')
  const [jobRole, setJobRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const { data } = await axios.post('/api/ai/generate-interview-qa', {
        jobRole,
        experience: selectedExperience,
        count: selectedCount
      }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 dark:text-gray-200">
      {/* left col */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4FACFE]" />
          <h1 className="text-xl font-semibold">Interview Q&A Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Job Role/Position</p>

        <input
          onChange={(e) => setJobRole(e.target.value)}
          value={jobRole}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Software Engineer, Marketing Manager, Data Scientist..."
          required
        />

        <p className="mt-4 text-sm font-medium">Experience Level</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {experienceLevels.map((item) => (
            <span
              onClick={() => setSelectedExperience(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedExperience === item
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-white text-slate-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm font-medium">Number of Questions</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {questionCounts.map((item) => (
            <span
              onClick={() => setSelectedCount(item.value)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCount === item.value
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-white text-slate-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
              key={item.value}
            >
              {item.label}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
          ) : (
            <MessagesSquare className="w-5" />
          )}
          Generate Q&A
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-900 rounded-lg flex flex-col border border-gray-200 dark:border-gray-700 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <MessagesSquare className="w-5 h-5 text-[#4FACFE]" />
          <h1 className="text-xl font-semibold">Interview Questions & Answers</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400 dark:text-gray-500">
              <MessagesSquare className="w-9 h-9" />
              <p>Enter job role and click "Generate Q&A" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600 dark:text-gray-300">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewQA