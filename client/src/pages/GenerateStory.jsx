import { BookOpen, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateStory = () => {
  const storyGenres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Adventure', 'Horror', 'Comedy', 'Drama']
  const storyLengths = [
    { value: 'short', label: 'Short (500-800 words)' },
    { value: 'medium', label: 'Medium (800-1200 words)' },
    { value: 'long', label: 'Long (1200+ words)' }
  ]

  const [selectedGenre, setSelectedGenre] = useState('Fantasy')
  const [selectedLength, setSelectedLength] = useState('short')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const { data } = await axios.post('/api/ai/generate-story', {
        prompt: input,
        genre: selectedGenre,
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
          <Sparkles className="w-6 text-[#FF6B35]" />
          <h1 className="text-xl font-semibold">AI Story Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Story Theme/Concept</p>

        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="A young wizard discovers a mysterious ancient book..."
          required
        />

        <p className="mt-4 text-sm font-medium">Genre</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {storyGenres.map((item) => (
            <span
              onClick={() => setSelectedGenre(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedGenre === item
                  ? 'bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                  : 'bg-white text-slate-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm font-medium">Story Length</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {storyLengths.map((item) => (
            <span
              onClick={() => setSelectedLength(item.value)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength === item.value
                  ? 'bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
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
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
          ) : (
            <BookOpen className="w-5" />
          )}
          Generate Story
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-900 rounded-lg flex flex-col border border-gray-200 dark:border-gray-700 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-[#FF6B35]" />
          <h1 className="text-xl font-semibold">Generated Story</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400 dark:text-gray-500">
              <BookOpen className="w-9 h-9" />
              <p>Enter a story concept and click "Generate Story" to get started</p>
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

export default GenerateStory