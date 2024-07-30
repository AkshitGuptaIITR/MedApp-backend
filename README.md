# MedApp Backend Setup Guide

This guide will help you set up and run a MedApp backend locally on your machine.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
- **npm**: npm is included with Node.js. To verify the installation, run:
  ```sh
  node -v
  npm -v

## Getting Started

### 1. Clone the Repository

Clone the project repository from GitHub to your local machine:

```sh
git clone https://github.com/AkshitGuptaIITR/MedApp-backend
cd medapp-backend
```

### 2. Install Dependencies

Install the project dependencies using npm:

```sh
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory of the project and add the necessary environment variables. Refer to the .env.example file for the required variables:

Edit the .env file with your specific environment variables
```sh
cp .env.example .env
```

### 4. Running the Application

Run the application locally:

```sh
npm start
```

### 5. Running in Development Mode

To run the application in development mode with hot-reloading, use:

```sh
npm run dev
```
## Disclaimer
All database credentials must be kept in `.env` and must not be exposed to GitHub at any point in time.
