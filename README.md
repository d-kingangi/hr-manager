# HR-Manager

## Table of Contents
- [Overview](#overview)
- [Features](#features)
  - [Landing Page](#landing-page)
  - [System Administrator](#system-administrator)
  - [Manager](#manager)
  - [Employee](#employee)
- [File Structure](#file-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Background](#background) 
- [Techstack](#techstack)   
  - [Frameworks & Languages](#frameworks--languages)
  - [Dependencies](#dependencies)
  - [Dev-Dependencies](#devdependencies)

## Overview
HR-Manager is a comprehensive web application designed to streamline and optimize HR management tasks within a company. It offers role-based functionalities for system administrators, managers, and employees, ensuring efficient handling of departments, tasks, and user management.

## Features

### Landing Page
- The application’s landing page provides details about the company.
- Users can sign up or log in through the landing page.

### System Administrator
- Can view all users i.e managers and  employees
- Can assign managers to departments.
- Can edit manager and employees profiles. 
- Can edit task details. 
- Can edit department details.
- Can edit profile.

### Manager
- Sign in to view their department and employees.
- Create, edit, and delete tasks.
- Assign tasks to employees within the application.
- Remove employees from the organization.
- Can edit their profile.

### Employee
- Sign in to view their assigned tasks.
- Edit tasks to mark as done.
- Can edit their profiles.

## File Structure

### Frontend
- Components: Building blocks of the UI. Each component encapsulates a part of the user interface, including its template (HTML), styles (CSS), and logic (TypeScript). Components are used to create reusable and modular UI elements.
- Guards: Used to control access to routes. They are implemented as services that can be applied to route definitions to prevent unauthorized access or perform checks before navigating to a route.
- Interfaces: Defines TypeScript interfaces and types used throughout the frontend application for type-checking and ensuring consistent data structures. 
- Services: Used to consume endpoints. They share data and logic across multiple components. Services handle business logic, data retrieval, and other reusable operations. They are injected into components and other services using Angular's dependency injection system.
- app.routes.ts: Defines the routing configuration for the Angular application. This file maps URL paths to corresponding components and can include route guards and lazy loading configurations. It manages the navigation and structure of the application.
- assets: This folder contains static files such as images and icons application. These files are served directly and are referenced in the application's components and templates.

### Backend
- Config: Manages configuration settings for the application i.e database connection strings, API keys, and environment-specific variables.
- Controllers : Contains the logic for handling incoming requests and sending responses. Controllers interact with the database and other services to process requests and perform CRUD operations.
- Database:  Manages the connection to the database and defines models or schemas representing the data structure.
- Interfaces: Defines TypeScript interfaces and types used throughout the application for type-checking and ensuring consistent data structures.
- Middleware: Contains functions that process requests before they reach the route handlers. Middleware is used for tasks such as authentication, logging, error handling, and request parsing.
- Routes: Defines the endpoints for the application and maps them to corresponding controller functions. Routes handle URL routing and can be organized by feature or resource.
- Validators: Contains validation logic to ensure incoming request data meets the required formats and constraints. This is used to validate user input before processing it in controllers.
- Server.ts: The entry point of the application. It sets up the server, integrates middleware, defines routes, and starts listening for incoming requests. This file initializes and configures the entire backend application.

## Techstack

### Frameworks & Languages
- Angular CLI.
- Angular & Typescript.
- Node.js & Typescript.
- MSSQL & SQL.

### Dependencies
- **bcrypt**: A library to help you hash passwords. It is widely used for secure password storage.
- **concurrently**: Allows you to run multiple npm scripts concurrently. Useful for running both the frontend and backend development servers simultaneously.
- **cors**: Middleware to enable Cross-Origin Resource Sharing, allowing your backend to handle requests from different origins.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`. Useful for managing configuration settings.
- **express**: A fast, unopinionated, minimalist web framework for Node.js, used to create the server and define routes.
- **joi**: A powerful schema description language and data validator for JavaScript. Used for validating request data.
- **jsonwebtoken**: A library to create and verify JSON Web Tokens (JWTs). Commonly used for authentication.
- **mssql**: Microsoft SQL Server client for Node.js. Used to connect to and interact with an MSSQL database.
- **nodemon**: A utility that monitors for any changes in your source code and automatically restarts your server. Perfect for development.
- **socket.io**: Enables real-time, bidirectional, and event-based communication. Used for implementing features like real-time notifications.
- **supertest**: A high-level abstraction for testing HTTP, used for integration testing of your routes.
- **uuid**: A library for generating unique identifiers. Useful for creating unique keys for entities.

### DevDependencies

- **@types/bcrypt**: TypeScript definitions for `bcrypt`, enabling type-checking and better IntelliSense.
- **@types/concurrently**: TypeScript definitions for `concurrently`.
- **@types/cors**: TypeScript definitions for `cors`.
- **@types/dotenv**: TypeScript definitions for `dotenv`.
- **@types/express**: TypeScript definitions for `express`.
- **@types/jest**: TypeScript definitions for `jest`, used for writing unit tests.
- **@types/joi**: TypeScript definitions for `joi`.
- **@types/jsonwebtoken**: TypeScript definitions for `jsonwebtoken`.
- **@types/mssql**: TypeScript definitions for `mssql`.
- **@types/nodemon**: TypeScript definitions for `nodemon`.
- **@types/socket.io**: TypeScript definitions for `socket.io`.
- **@types/supertest**: TypeScript definitions for `supertest`.
- **@types/uuid**: TypeScript definitions for `uuid`.
- **jest**: A delightful JavaScript testing framework with a focus on simplicity. Used for running tests.
- **ts-jest**: A Jest transformer for TypeScript, enabling you to run TypeScript tests with Jest.
- **ts-node**: TypeScript execution and REPL for Node.js. Allows running TypeScript files directly.
- **typescript**: A strongly typed programming language that builds on JavaScript. Used for writing the application code in TypeScript.




