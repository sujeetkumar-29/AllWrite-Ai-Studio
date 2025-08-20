import { User, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const PortfolioBio = () => {
  const bioTones = ['Professional', 'Creative', 'Friendly', 'Authoritative', 'Casual', 'Inspiring']
  
  const [name, setName] = useState('')
  const [profession, setProfession] = useState('')
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState('')
  const [selectedTone, setSelectedTone] = useState('Professional')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post('/api/ai/generate-portfolio-bio', {
        name,
        profession,
        experience,
        skills,
        tone: selectedTone
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
      {/* Left Column - Form */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FA709A]" />
          <h1 className="text-xl font-semibold">Portfolio Bio Generator</h1>
        </div>

        {/* Name Input */}
        <p className="mt-6 text-sm font-medium">Your Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="John Doe"
          required
        />

        {/* Profession Input */}
        <p className="mt-4 text-sm font-medium">Profession/Title</p>
        <input
          onChange={(e) => setProfession(e.target.value)}
          value={profession}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Software Engineer"
          required
        />

        {/* Experience Input */}
        <p className="mt-4 text-sm font-medium">Experience</p>
        <textarea
          onChange={(e) => setExperience(e.target.value)}
          value={experience}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 h-24 resize-none"
          placeholder="5+ years developing web applications, led 10+ successful projects..."
          required
        />

        {/* Skills Input */}
        <p className="mt-4 text-sm font-medium">Skills</p>
        <textarea
          onChange={(e) => setSkills(e.target.value)}
          value={skills}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 h-24 resize-none"
          placeholder="JavaScript, React, Node.js, Python, Project Management..."
          required
        />

        {/* Tone Selection */}
        <p className="mt-4 text-sm font-medium">Bio Tone</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {bioTones.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => setSelectedTone(tone)}
              className={`p-2 text-sm rounded-md border transition-colors ${
                selectedTone === tone
                  ? 'bg-[#FA709A] text-white border-[#FA709A]'
                  : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 p-3 bg-gradient-to-r from-[#FA709A] to-[#FEE2E2] text-white font-medium rounded-md hover:from-[#E85D8A] hover:to-[#FECACA] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </div>
          ) : (
            'Generate Bio'
          )}
        </button>
      </form>

      {/* Right Column - Generated Content */}
      <div className="flex-1 min-w-[300px] p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 text-[#FA709A]" />
          <h2 className="text-xl font-semibold">Generated Bio</h2>
        </div>

        {content ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Your generated portfolio bio will appear here</p>
            <p className="text-sm mt-2">Fill out the form and click "Generate Bio" to get started</p>
          </div>
        )}

        {content && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                navigator.clipboard.writeText(content)
                toast.success('Bio copied to clipboard!')
              }}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm rounded-md border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioBio