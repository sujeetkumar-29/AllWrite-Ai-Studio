import { FileType, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const SummarizeText = () => {
  const summaryLengths = [
    { value: 'brief', label: 'Brief Summary' },
    { value: 'standard', label: 'Standard Summary' },
    { value: 'detailed', label: 'Detailed Summary' }
  ]

  const [selectedLength, setSelectedLength] = useState('standard')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const { data } = await axios.post('/api/ai/summarize-text', {
        text: input,
        length: selectedLength
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
          <Sparkles className="w-6 text-[#F093FB]" />
          <h1 className="text-xl font-semibold">Text Summarizer</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Text to Summarize</p>

        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={8}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Paste your long text here to get a concise summary..."
          required
        />

        <p className="mt-4 text-sm font-medium">Summary Length</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {summaryLengths.map((item) => (
            <span
              onClick={() => setSelectedLength(item.value)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength === item.value
                  ? 'bg-pink-50 text-pink-700 dark:bg-pink-900 dark:text-pink-300'
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
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F093FB] to-[#F5576C] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
          ) : (
            <FileType className="w-5" />
          )}
          Summarize Text
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-900 rounded-lg flex flex-col border border-gray-200 dark:border-gray-700 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileType className="w-5 h-5 text-[#F093FB]" />
          <h1 className="text-xl font-semibold">Summary Result</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400 dark:text-gray-500">
              <FileType className="w-9 h-9" />
              <p>Paste your text and click "Summarize Text" to get started</p>
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

export default SummarizeText