import OpenAI from "openai";
import sql from "../configs/db.js";
import { v2 as cloudinary } from 'cloudinary'
import axios from "axios";
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import { clerkClient } from "@clerk/express"

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt, length } = req.body
        const plan = req.plan
        const free_usage = req.free_usage

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue," })

        }
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                // { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });
        const content = response.choices[0].message.content
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, ${'article'})`

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt } = req.body
        const plan = req.plan
        const free_usage = req.free_usage

        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue," })

        }
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 100,
        });
        const content = response.choices[0].message.content
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, ${'blog-title'})`

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }
        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt, publish } = req.body
        const plan = req.plan
        // const free_usage = req.free_usage

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })

        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: { 'x-api-key': process.env.CLIPDROP_API_KEY },
            responseType: "arraybuffer",
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`

        const { secure_url } = await cloudinary.uploader.upload(base64Image)


        await sql`INSERT INTO creations (user_id, prompt, content, type,publish) VALUES (${userId}, ${prompt}, ${secure_url}, ${'image'},${publish ?? false})`

        res.json({ success: true, content: secure_url })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth()
        const image = req.file;

        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        })


        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${'Remove background from image'}, ${secure_url}, ${'image'})`

        res.json({ success: true, content: secure_url })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { object } = req.body
        const image = req.file;

        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        const { public_id } = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [
               { effect: `gen_remove:${object}` }
            ],
            resource_type: 'image'
        })

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, ${'image'})`

        res.json({ success: true, content: imageUrl })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth()
        const resume = req.file;

        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "Resume file size exceeds allowed size(5MB)." })
        }

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });
        const content = response.choices[0].message.content

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${'Review the uploaded resume'}, ${content}, ${'resume-review'})`

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// NEW PREMIUM TOOLS

export const generateStory = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt, genre, length } = req.body
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        const storyPrompt = `Write a ${genre} story about ${prompt}. The story should be ${length} and engaging with proper character development and plot structure.`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: storyPrompt,
                },
            ],
            temperature: 0.8,
            max_tokens: length === 'short' ? 800 : length === 'medium' ? 1200 : 1600,
        });

        const content = response.choices[0].message.content
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${storyPrompt}, ${content}, ${'story'})`

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generateEmail = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { prompt, tone, type } = req.body
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        const emailPrompt = `Write a ${tone} ${type} email about ${prompt}. Include proper email structure with subject line, greeting, body, and closing.`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: emailPrompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 800,
        });

        const content = response.choices[0].message.content
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${emailPrompt}, ${content}, ${'email'})`

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const summarizeText = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { text, length } = req.body
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        const summaryPrompt = `Summarize the following text in ${length} length, maintaining the key points and main ideas:\n\n${text}`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: summaryPrompt,
                },
            ],
            temperature: 0.5,
            max_tokens: length === 'brief' ? 200 : length === 'detailed' ? 400 : 300,
        });

        const content = response.choices[0].message.content
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${summaryPrompt}, ${content}, ${'summary'})`

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generateInterviewQA = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { jobRole, experience, count } = req.body
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        const interviewPrompt = `Generate ${count} interview questions and answers for a ${jobRole} position with ${experience} experience level. Include both technical and behavioral questions with detailed answers.`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: interviewPrompt,
                },
            ],
            temperature: 0.6,
            max_tokens: 1500,
        });

        const content = response.choices[0].message.content
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${interviewPrompt}, ${content}, ${'interview-qa'})`

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generatePortfolioBio = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { name, profession, experience, skills, tone } = req.body
        const plan = req.plan

        if (plan !== 'premium') {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions." })
        }

        const bioPrompt = `Write a ${tone} portfolio bio for ${name}, a ${profession} with ${experience} years of experience. Key skills: ${skills}. Make it engaging and professional for portfolio/website use.`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: bioPrompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 600,
        });

        const content = response.choices[0].message.content
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${bioPrompt}, ${content}, ${'portfolio-bio'})`

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}