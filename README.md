# 💼 Job Portal - Full Stack MERN Application

> A comprehensive job portal platform built with the MERN stack. Connect job seekers with opportunities and enable recruiters to manage their job postings efficiently.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [File Upload (Cloudinary)](#file-upload-cloudinary)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

Job Portal is a full-stack web application that connects job seekers with employers. The platform provides:

- **Job Seekers**: Browse job listings, apply for positions, track applications, and manage profiles
- **Recruiters**: Post job openings, review applications, manage companies, and update hiring status
- **Real-time Updates**: Live application counts and status updates
- **Secure Authentication**: JWT-based authentication with cookie management

This project was developed as a final year college project showcasing full-stack development capabilities.

---

## 🚀 Features

### For Job Seekers
✅ **User Authentication**
- Secure signup and login
- JWT token-based authentication
- Profile management and updates

✅ **Job Discovery**
- Browse all available jobs
- Advanced search and filtering
- Job category carousel
- Job details view with company information

✅ **Job Applications**
- One-click job application
- Track applied jobs
- View application status
- Prevent duplicate applications

✅ **Profile Management**
- Upload resume (via Cloudinary)
- Update profile information
- Profile dialog for quick edits

### For Recruiters
✅ **Company Management**
- Create and manage company profiles
- Upload company logo
- Add company details (website, industry, location)
- View all company jobs

✅ **Job Posting**
- Create new job postings
- Set requirements and qualifications
- Manage multiple job listings
- View job applicants per listing

✅ **Application Management**
- View all applicants for each job
- Update application status (pending, accepted, rejected)
- Track hiring progress
- View applicant resumes and profiles

✅ **Admin Dashboard**
- Comprehensive admin interface
- All jobs management
- All companies management
- Applicants management

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (18+) - UI Framework
- **Vite** - Build tool for fast development
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Sonner** - Toast notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** (5.1+) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **DataURI** - File conversion

### Development Tools
- **Nodemon** - Auto-reload on file changes
- **npm** - Package manager
- **Git** - Version control

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** - [Local](https://www.mongodb.com/try/download/community) or [Cloud](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign Up](https://cloudinary.com/) for file uploads
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Priyanshi-678/jobportal.git
cd jobportal
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/jobportal
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal

SECRET_KEY=your_jwt_secret_key_here
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

### Frontend (`frontend/.env.local`)

Create a `.env.local` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Note:** API endpoints are already configured in `frontend/src/utils/constant.js`

---

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs at: `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: `http://localhost:5173` (or next available port)

### Option 2: Run Both Concurrently

From the root directory, if you have `concurrently` installed:

```bash
npm install -g concurrently
concurrently "npm run dev --prefix backend" "npm run dev --prefix frontend"
```

---

## 📂 Project Structure

```
jobportal/
│
├── backend/
│   ├── controllers/          # Route handlers
│   │   ├── authController.js
│   │   ├── user.controller.js
│   │   ├── job.controller.js
│   │   ├── company.controller.js
│   │   └── application.controller.js
│   │
│   ├── models/               # Database schemas
│   │   ├── user.model.js
│   │   ├── job.model.js
│   │   ├── company.model.js
│   │   └── application.model.js
│   │
│   ├── routes/               # API endpoints
│   │   ├── authRoutes.js
│   │   ├── user.routes.js
│   │   ├── job.route.js
│   │   ├── company.route.js
│   │   └── application.route.js
│   │
│   ├── middlewares/          # Custom middleware
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   │
│   ├── utils/                # Utility functions
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── datauri.js
│   │
│   ├── index.js              # Server entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── auth/
│   │   │   ├── admin/
│   │   │   ├── shared/
│   │   │   ├── ui/
│   │   │   ├── Home.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── JobDescription.jsx
│   │   │   └── ...
│   │   │
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useGetAllJobs.jsx
│   │   │   ├── useGetAllCompanies.jsx
│   │   │   ├── useGetAppliedJobs.jsx
│   │   │   └── ...
│   │   │
│   │   ├── redux/            # Redux state management
│   │   │   ├── authSlice.js
│   │   │   ├── jobSlice.js
│   │   │   ├── companySlice.js
│   │   │   ├── applicationSlice.js
│   │   │   └── store.js
│   │   │
│   │   ├── utils/            # Utility files
│   │   │   └── constant.js
│   │   │
│   │   ├── lib/              # Library functions
│   │   │   └── utils.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   │
│   ├── public/               # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── jsconfig.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
GET    /api/auth/logout           - Logout user
```

### User Routes
```
GET    /api/v1/user/profile       - Get user profile
POST   /api/v1/user/profile/update - Update user profile
```

### Job Routes
```
GET    /api/v1/job/get            - Get all jobs
GET    /api/v1/job/get/:id        - Get single job
POST   /api/v1/job/post           - Post new job (Recruiter)
GET    /api/v1/job/admin/jobs     - Get jobs posted by recruiter
```

### Company Routes
```
GET    /api/v1/company/get        - Get all companies
POST   /api/v1/company/register   - Register company
GET    /api/v1/company/get/:id    - Get company by ID
PUT    /api/v1/company/update/:id - Update company (Recruiter)
```

### Application Routes
```
GET    /api/v1/application/apply/:id     - Submit application
GET    /api/v1/application/get           - Get user's applications
GET    /api/v1/application/applicants/:id - Get job applicants
POST   /api/v1/application/status/:id/update - Update application status
```

---

## 💡 Usage Guide

### For Job Seekers

1. **Sign Up**: Create a new account with email and password
2. **Complete Profile**: Add your resume and profile information
3. **Browse Jobs**: Explore available job listings
4. **Apply**: Click "Apply Now" on any job listing
5. **Track Applications**: View your applied jobs and their status

### For Recruiters

1. **Sign Up**: Create recruiter account
2. **Create Company**: Register your company with details
3. **Post Jobs**: Create new job postings with requirements
4. **Manage Applications**: Review applicant profiles and update status
5. **Track Hiring**: Monitor applicant progress

### For Admins

1. Access admin dashboard
2. View all jobs and companies
3. Manage users and job listings
4. Monitor applications and hiring

---

## 📸 File Upload (Cloudinary)

### Setting Up Cloudinary

1. **Create Account**: Sign up at [Cloudinary](https://cloudinary.com/)
2. **Get Credentials**:
   - Cloud Name
   - API Key
   - API Secret
3. **Add to `.env`**:
   ```env
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   ```

### Upload Features
- Resume uploads for job seekers
- Company logo uploads for recruiters
- Automatic image optimization
- Secure storage

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contributing Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes before submitting PR
- Update README if needed

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💼 Author

**Priyanshi** - [GitHub Profile](https://github.com/Priyanshi-678)

---

## 📞 Support

For support and questions:
- Open an [Issue](https://github.com/Priyanshi-678/jobportal/issues)
- Contact via email or GitHub
- Check existing issues for solutions

---

## 🎓 Learning Resources

This project showcases:
- Full-stack MERN development
- RESTful API design
- JWT authentication
- Redux state management
- Tailwind CSS styling
- File upload handling
- MongoDB data modeling
- React hooks and components
- Error handling and validation

---

## 🗺️ Roadmap

Future enhancements:
- [ ] Email notifications for applications
- [ ] Advanced job filtering and search
- [ ] Real-time notifications with WebSocket
- [ ] Interview scheduling system
- [ ] Rating and review system
- [ ] Job recommendation engine
- [ ] Mobile app version
- [ ] Dark mode support

---

## 📊 Project Statistics

- **Frontend**: 18+ Components
- **Backend**: 5+ Controllers
- **Database Models**: 4+ Collections
- **API Endpoints**: 20+ Routes
- **Total Lines of Code**: 5000+

---

**Last Updated**: March 2024
**Version**: 1.0.0

---

**Made with ❤️ for learning and professional development**

---

🔐 Environment Variables

Create a ".env" file in backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

---

👩‍💻 Author

Priyanshi Dwivedi

---

📌 Note

This project is for educational purposes.
