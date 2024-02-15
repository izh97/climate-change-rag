# Climate Change Retrieval Augmented Generation(RAG)

## Overview
This project is a climate change RAG inquiry platform designed to respond to user queries about climate change using a curated and pre-processed dataset. The backend is powered by a Flask API in Python, with data stored in MongoDB, including a Vector Search Index for efficient querying via MongoDB Atlas. The frontend is developed with Next.js, hosted alongside the Flask API on Render.

## Features
- **Data Curation**: Utilizes a comprehensive dataset on climate change, curated from various sources.
- **Efficient Search**: Implements LlamaIndex via the OpenAI API and a Vector Search Index in MongoDB for quick and relevant responses.
- **Interactive UI**: The Next.js frontend provides a user-friendly interface for submitting queries and viewing responses.
- **API Service**: A Flask API handles data processing and integrates with the frontend, offering a seamless user experience.

## Stack
- Backend: Python, Flask, MongoDB
- Frontend: Next.js
- Other: LlamaIndex (via OpenAI API embeddings), Render for hosting
