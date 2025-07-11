import React from 'react'

import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { useDarkMode } from '../context/ThemeContext';

const DarkModeToggler = () => {
    const {darkMode,setDarkMode}=useDarkMode()
    return (
        <button onClick={()=>setDarkMode(!darkMode)} className="dark:text-white cursor-pointer">
            {darkMode ? <Sun /> : <Moon className="text-black" />}
        </button>
    )
}
export default DarkModeToggler