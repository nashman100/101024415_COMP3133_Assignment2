# COMP 3133 - Assignment 2: Employee Management System (Frontend)

## ✨ Project Overview

This project is the frontend portion of the Employee Management System developed for COMP 3133 Assignment 2. It is built using **Angular with standalone components** and connects to a GraphQL API (developed in Assignment 1) for managing employees, authentication, file uploads, and more.

---

## 📦 Tech Stack

- **Frontend Framework**: Angular 17 (Standalone API)
- **GraphQL Client**: Apollo Angular
- **Styling**: SCSS
- **Routing**: Angular Standalone Routing
- **Authentication**: Token-based (localStorage)
- **API Communication**: GraphQL over HTTP using Apollo Client
- **Deployment**: Vercel (Frontend), Render/Vercel (Backend)

---

## 🚀 Features

✅ User Signup & Login  
✅ Session Management (Protected Routes)  
✅ View Employee List  
✅ Add, Update, Delete Employees  
✅ Search Employees  
✅ File Upload Support (Profile Picture)  
✅ Fully Responsive Design  
✅ Cloud Deployment Ready

---

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/comp3133-assignment2-frontend.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
ng serve
```

App will run at: `http://localhost:4200`

---

## 🔗 GraphQL API Endpoint

Make sure your backend running and deployed.

```bash
git clone https://github.com/nashman100/101024415_COMP3133_Assignment1.git
```

Set your GraphQL endpoint in `main.ts`:

```ts
const uri = 'http://localhost:4200/graphql'; 
```

---

## 🔐 Authentication

- On successful login or signup, the JWT token is stored in `localStorage`.
- Protected routes are guarded using a custom `auth.service.ts`.
- Token is sent with GraphQL requests using Apollo `setContext`.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── employee-list/
│   │   ├── add-employee/
│   │   └── update-employee/
│   ├── services/
│   │   └── auth.service.ts
│   ├── app.routes.ts
│   └── main.ts
├── assets/
└── styles/
```

---

## 👨‍💻 Author

- **Name**: [Nash Gill]
- **Student ID**: 101024415
- **Course**: COMP 3133 – Web Programming
