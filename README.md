# E-Commerce Mobile App

A React Native e-commerce application built with Expo and TypeScript, using the Platzi Fake Store API.

## 📽️ Demo Video

[Watch the demo here](https://drive.google.com/file/d/1Qm_ANBPNVV_jTNP956teaETS1lyqyC7c/view?usp=drivesdk)

## Features

- Product listing with search and filtering capabilities
- Product details with image gallery and add to cart functionality
- Cart management
- Responsive design for various screen sizes
- Platform-specific styling

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation for routing
- React Query for data fetching
- AsyncStorage for local data persistence

## Project Structure

```
├── assets/            # Images and static assets
├── src/
│   ├── api/           # API service functions
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom hooks
│   ├── navigation/    # Navigation configuration
│   ├── screens/       # App screens
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
└── App.tsx           # Main application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Use Expo Go app on your mobile device to scan the QR code or run on an emulator

## Development Process

The development process followed these steps:

1. Set up the project with Expo and TypeScript
2. Implemented the API service to fetch data from Platzi Fake Store API
3. Created the navigation structure using React Navigation
4. Developed the product listing screen with search and filter functionality
5. Implemented the product details screen with gallery slider
6. Created the cart management screen
7. Added responsive styling and platform-specific adjustments
8. Implemented data persistence using AsyncStorage

## Design Decisions

- Used React Query for efficient data fetching and caching
- Implemented a clean, user-friendly UI inspired by popular e-commerce apps
- Created reusable components to maintain consistency across the app
- Used TypeScript for type safety and better developer experience
- Implemented responsive design to ensure the app works well on various screen sizes
