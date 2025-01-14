// Backend: Enhanced Node.js + Express Chatbot

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { OpenAI } = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Validate Environment Variables
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY in environment variables.");
    process.exit(1);
}

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Documentation URLs
const documentationUrls = [
    "https://segment.com/docs/?ref=nav",
    "https://docs.mparticle.com/",
    "https://docs.lytics.com/",
    "https://docs.zeotap.com/home/en-us/",
];

// Preprocessed Documentation (Indexed by Topic)
let indexedDocs = {};

// Function to Fetch and Index Documentation
async function preprocessDocumentation(urls) {
    for (const url of urls) {
        try {
            const axiosConfig = {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
            };
            const response = await axios.get(url, axiosConfig);
            const content = response.data.slice(0, 2000); // Limit content length
            indexedDocs[url] = { url, content };
        } catch (error) {
            console.error(`Error fetching URL ${url}:`, error.message);
        }
    }
}

// Load Documentation on Server Start
(async () => {
    await preprocessDocumentation(documentationUrls);
})();

// Query Classification
function classifyQuery(question) {
    if (question.toLowerCase().includes("how to")) return "how-to";
    if (question.toLowerCase().includes("compare")) return "comparison";
    return "general";
}

// Create Prompt Based on Query Type
function createPrompt(question, docs, queryType) {
    const docsSnippet = Object.values(docs)
        .map((doc) => `URL: ${doc.url}\nContent: ${doc.content.slice(0, 1500)}`)
        .join("\n\n");

    if (queryType === "how-to") {
        return `Based on the following documentation, answer the question: \n${docsSnippet}\n\nQuestion: ${question}`;
    } else if (queryType === "comparison") {
        return `Compare the approaches and functionalities described in the following documentation: \n${docsSnippet}\n\nQuestion: ${question}`;
    } else {
        return `Based on the following documentation, provide relevant information: \n${docsSnippet}\n\nQuestion: ${question}`;
    }
}

// API Endpoint for Questions
app.post("/ask", async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: "Please provide a question." });
    }

    try {
        const queryType = classifyQuery(question);
        const prompt = createPrompt(question, indexedDocs, queryType);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
        });

        const answer = response.choices[0].message.content.trim();
        res.json({ question, queryType, answer });
    } catch (error) {
        console.error("Error generating response:", error.message);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("Support Agent Chatbot Backend is running.");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
