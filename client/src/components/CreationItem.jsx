import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-colors"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-gray-900 dark:text-gray-100 font-medium">
            {item.prompt}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#EFF6FF] dark:bg-gray-700 border border-[#BFDBFE] dark:border-gray-600 text-[#1E40AF] dark:text-gray-200 px-4 py-1 rounded-full text-xs">
          {item.type}
        </button>
      </div>

      {expanded && (
        <div>
          {item.type === 'image' ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="w-full mt-3 max-w-md rounded-md"
              />
            </div>
          ) : (
            <div className="mt-3 w-full overflow-y-scroll text-sm text-slate-700 dark:text-gray-200">
              <div className="reset-tw prose prose-sm dark:prose-invert">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
