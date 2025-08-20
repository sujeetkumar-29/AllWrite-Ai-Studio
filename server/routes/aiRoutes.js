import express from 'express'
import { auth } from '../middlewares/auth.js';
import { 
    generateArticle, 
    generateBlogTitle, 
    generateImage, 
    removeImageBackground, 
    removeImageObject, 
    resumeReview,
    generateStory,
    generateEmail,
    summarizeText,
    generateInterviewQA,
    generatePortfolioBio
} from '../controllers/aiController.js';
import { upload } from '../configs/multer.js';

const aiRouter = express.Router();

// Existing routes
aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blog-title', auth, generateBlogTitle)
aiRouter.post('/generate-image', auth, generateImage)
aiRouter.post('/remove-image-background',auth, upload.single('image'),  removeImageBackground)
aiRouter.post('/remove-image-object',auth, upload.single('image'),  removeImageObject)
aiRouter.post('/resume-review',auth, upload.single('resume'),  resumeReview)

// New premium routes
aiRouter.post('/generate-story', auth, generateStory)
aiRouter.post('/generate-email', auth, generateEmail)
aiRouter.post('/summarize-text', auth, summarizeText)
aiRouter.post('/generate-interview-qa', auth, generateInterviewQA)
aiRouter.post('/generate-portfolio-bio', auth, generatePortfolioBio)

export default aiRouter