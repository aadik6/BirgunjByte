# BirgunjByte News Portal

Birgunj Byte News Portal is a web application designed to deliver news content in the Nepali language, focusing on Madhesh Province. It is developed for the benefit of CAN members and aims to provide a seamless user experience for accessing and managing news articles. The project is built with a modern technology stack and adheres to scalable development practices.

---

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Modules Under Construction](#modules-under-construction)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)


---

## Overview
The Birgunj Byte News Portal is a full-stack application developed using the MERN (MongoDB, Express, React, Node.js) stack. It includes the following:
- **Frontend**: Built with React, TypeScript, and Zustand for state management.
- **Backend**: Built with Node.js and Express, with MongoDB as the database.
- **Nepali Medium**: Designed specifically for Nepali-speaking users.

---

## Technologies Used
### Frontend
- React
- TypeScript
- Zustand (state management)
- Tailwind CSS *(optional)*

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token) for authentication

---

## Features
- **News Management**: CRUD operations for news articles and categories.
- **Dynamic Rendering**: Frontend dynamically fetches and displays news from the backend.
- **State Management**: Zustand ensures efficient state handling.
- **Authentication**: Secure user authentication using JWT *(in progress)*.
- **Language Support**: Complete Nepali-medium interface.

---

## Modules Under Construction
- **Advertisements**: Ad integration to support sponsors and contributors.
- **User Login**: Comprehensive user authentication and profile features.

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/birgunj-byte-news-portal.git
   cd birgunj-byte-news-portal
2. cd backend
npm install
cp .env.example .env
# Configure your environment variables in .env
npm start

3. cd ../frontend
npm install
cp .env.example .env
# Configure REACT_APP_API_URL in .env
npm start

4. Access the application:
    Frontend: http://localhost:3000
    Backend API: http://localhost:5000

### Project Structure
birgunj-byte-news-portal/
├── backend/
│   ├── controllers/      # API controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication and other middleware
│   └── app.js         # Main backend entry point
├── frontend/
│   ├── src/
│   │   ├── assets/       # Static assets
│   │   ├── components/   # Reusable UI components
│   │   ├── features/     # Feature-specific modules
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand state management
│   │   ├── App.tsx       # Main application component
│   │   └── index.tsx     # Entry point
