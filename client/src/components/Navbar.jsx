import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import DarkModeToggler from './DarkModeToggle';
import { useDarkMode } from "../context/ThemeContext"
import { dark } from "@clerk/themes"



const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const { darkMode } = useDarkMode()


    return (
        <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
            <img src={assets.ailogo} alt='' className="w-40 sm:w-50 cursor-pointer" onClick={() => navigate('/')} />
            <div className="ml-auto py-3 px-10 sm:px-5">
                <DarkModeToggler />
            </div>
            {
                user ? <UserButton appearance={{
                    baseTheme: darkMode ? dark : undefined,
                }} />
                    : (
                        <button onClick={openSignIn} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white  dark:bg-gray-500 px-10 py-2.5">Get started <ArrowRight className='w-4 h-4' /> </button>
                    )
            }
        </div>
    )
}

export default Navbar