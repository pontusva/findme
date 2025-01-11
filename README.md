# Lost Pet Reporting Application

## Overview

The Lost Pet Reporting Application is a web-based platform designed to help users report lost pets and connect with others in their community. The application allows users to create reports for lost pets, view lost pet listings, and receive notifications about potential matches. Built with modern web technologies, this application provides a user-friendly interface and real-time notifications to enhance the experience of pet owners.

## Features

- **User Authentication**: Secure user registration and login using Clerk for identity management.
- **Lost Pet Reports**: Users can create and manage reports for lost pets, including details such as pet type, breed, and last seen location.
- **Dashboard**: A user-friendly dashboard to view and manage lost pet reports. (in progress)
- **Push Notifications**: Real-time notifications for users when a matching lost pet report is created.
- **Responsive Design**: The application is fully responsive and works seamlessly on both desktop and mobile devices.
- **Service Worker**: Utilizes a service worker for offline capabilities and push notifications.

## Technologies Used

- **Frontend**: React, TypeScript, and CSS (Tailwind and shadcn/ui + v0) for building the user interface.
- **Backend**: Fastify for the server-side framework, Prisma for database management, and web-push for handling push notifications.
- **Database**: A relational database (e.g., PostgreSQL) managed by Prisma.
- **Authentication**: Clerk for user authentication and management.
- **Service Worker**: Implemented for handling push notifications and offline support.
