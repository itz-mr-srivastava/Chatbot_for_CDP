Support Agent Chatbot
This project is a Support Agent Chatbot built using Node.js, Express, and React. It leverages OpenAI's GPT-3.5 model to provide intelligent responses based on preprocessed documentation from various sources like Segment, mParticle, Lytics, and Zeotap.

Features
Frontend: React-based UI for users to ask questions.
Backend: Node.js and Express backend that processes user queries and communicates with OpenAI's GPT-3.5 for generating responses.
Documentation Indexing: Preprocesses and indexes documentation from multiple sources to answer user queries.
Query Classification: Classifies user queries as "how-to," "comparison," or "general" to tailor responses.
Error Handling: Handles errors for missing questions and API request failures.
Tech Stack
Frontend: React, Axios
Backend: Node.js, Express, OpenAI API
Styling: Custom CSS (or optionally with frameworks like Bootstrap)
Other: Axios for API requests, CORS middleware, and dotenv for environment variable management.
Setup & Installation
Prerequisites
Make sure you have the following installed:

Node.js (v16 or higher)
npm (v7 or higher)
Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/support-agent-chatbot.git
cd support-agent-chatbot
Backend Setup
Go to the backend folder:

bash
Copy code
cd backend
Install backend dependencies:

bash
Copy code
npm install
Create a .env file in the backend folder and add your OpenAI API key:

makefile
Copy code
OPENAI_API_KEY=your-api-key-here
Start the backend server:

bash
Copy code
npm start
The backend server will be running on http://localhost:5000.

Frontend Setup
Go to the frontend folder:

bash
Copy code
cd frontend
Install frontend dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
The frontend will be running on http://localhost:3000.

Testing the Application
Open your browser and go to http://localhost:3000.
Type a question about Segment, mParticle, Lytics, or Zeotap in the text area and click "Ask Question."
View the response from the chatbot.
Folder Structure
bash
Copy code
/support-agent-chatbot
│
├── /backend
│   ├── /node_modules
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── /src
│
├── /frontend
│   ├── /node_modules
│   ├── /public
│   ├── /src
│   ├── package.json
│   └── App.css
│
└── README.md
Documentation Sources
The chatbot uses documentation from the following sources:

Segment Documentation
mParticle Documentation
Lytics Documentation
Zeotap Documentation
License
This project is licensed under the MIT License.

