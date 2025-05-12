# Birgunj Byte News Portal - Frontend

Birgunj Byte News Portal is a React-based web application developed to serve news content in the Nepali language for Madhesh Province. The platform aims to contribute to CAN members by delivering reliable and up-to-date news. This README file focuses on the frontend implementation.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Modules Under Construction](#modules-under-construction)

---

## Technologies Used
- **React**: Framework for building user interfaces.
- **TypeScript**: For static type checking and enhanced developer experience.
- **Zustand**: Lightweight state management solution.
- **Tailwind CSS** *(optional)*: For styling and responsive design.

## Features
- **News Categories**: Organized presentation of news articles by categories.
- **Nepali Language Support**: Complete Nepali medium for user-friendly engagement.
- **Dynamic Content Rendering**: Fetch and display news articles dynamically.
- **State Management**: Leveraging Zustand for smooth state handling.

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/birgunj-byte-news-portal.git
   cd birgunj-byte-news-portal/frontend

2. npm install
# or
yarn install

3. REACT_APP_API_URL=http://localhost:5000/api

4. npm run dev
# or
yarn run dev


### Project Structure
frontend/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature-specific modules
│   ├── pages/            # Page components
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Entry point

### Modules Under Construction
  1. Advertisements: Integration of ad spaces for sponsors.
  2. User Login: Authentication and user profile management.
