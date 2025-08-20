import React from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { BookOpen, Eraser, FileText, FileType, Hash, House, Image, LogOut, Mail, MessagesSquare, Scissors, SquarePen, User, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/generate-story', label: 'Generate Story', Icon: BookOpen },
  { to: '/ai/generate-email', label: 'Generate Email', Icon: Mail },
  { to: '/ai/summarize-text', label: 'Summarize Text', Icon: FileType },
  { to: '/ai/interview-qa', label: 'Interview QA', Icon: MessagesSquare },
  { to: '/ai/portfolio-bio', label: 'Portfolio Bio', Icon: User },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div
      className={`w-60 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col max-sm:absolute top-14 bottom-0
        ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}
    >
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* User Profile */}
        <div className="my-7 w-full flex-shrink-0">
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-13 rounded-full mx-auto"
          />
          <h1 className="mt-1 text-center text-gray-900 dark:text-gray-100">
            {user.fullName}
          </h1>

          {/* Navigation */}
          <div className="px-6 mt-5 text-sm text-gray-600 dark:text-gray-300 font-medium">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/ai'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex items-center gap-3 rounded transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                      }`}
                    />
                    <span className="truncate">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="w-full border-t border-gray-200 dark:border-gray-700 p-4 px-7 flex items-center justify-between flex-shrink-0">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer min-w-0 flex-1"
        >
          <img src={user.imageUrl} className="w-8 rounded-full flex-shrink-0" alt="" />
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {user.fullName}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <Protect plan="premium" fallback="Free">Premium</Protect> Member
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer ml-3 flex-shrink-0"
        />
      </div>
    </div>
  )
}

export default Sidebar