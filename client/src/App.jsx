import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import GenerateStory from './pages/GenerateStory'
import GenerateEmail from './pages/GenerateEmail'
import SummarizeText from './pages/SummarizeText'
import InterviewQA from './pages/InterviewQA'
import PortfolioBio from './pages/PortfolioBio'

const App = () => {
  // const { getToken } = useAuth()
  // useEffect(() => {
  //   getToken().then((token)=>console.log(token))
  // }, [])
  return ( 
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="generate-story" element={<GenerateStory />} />
          <Route path="generate-email" element={<GenerateEmail />} />
          <Route path="summarize-text" element={<SummarizeText />} />
          <Route path="interview-qa" element={<InterviewQA />} />
          <Route path="portfolio-bio" element={<PortfolioBio />} />
          <Route path="community" element={<Community />} />

        </Route>
      </Routes>
    </div >
  )
}

export default App