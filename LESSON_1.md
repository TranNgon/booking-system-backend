# Lesson 1 - Project Setup + Environment

## Introduction
In this lesson, we'll cover the basics of setting up your project environment for the booking system backend.

## Prerequisites
Before you begin, you should have:
1. **Node.js**: Ensure that Node.js is installed on your machine. You can download it from [Node.js Official Site](https://nodejs.org).
2. **Git**: Make sure you have Git installed. This will help you manage your project files. Download from [Git Official Site](https://git-scm.com).

## Step 1: Cloning the Repository
To get started, you will need to clone the project repository:

```bash
git clone https://github.com/TranNgon/booking-system-backend.git
cd booking-system-backend
```

## Step 2: Installing Dependencies
Once you have cloned the repository, you need to install the necessary dependencies. Run the following command:

```bash
npm install
```

This command reads the `package.json` file and installs all the required packages.

## Step 3: Setting Up Environment Variables
You will need to create a `.env` file in the root of your project for environment variables. Here’s how you can set it up:
1. Copy the example configuration file:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and fill in the necessary values, such as database connection strings and API keys.

## Step 4: Running the Application
After setting everything up, you can start the application using:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to see the application in action.

## Conclusion
Now that you have set up the initial environment for the booking system backend, you can proceed to explore the project further. This includes implementing features, running tests, and managing the backend functionality.