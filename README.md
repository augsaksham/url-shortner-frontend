# URL Shortener Frontend

A modern web application built with Angular that provides URL shortening services with user authentication and management capabilities.

## Features

- User authentication (Login/Register)
- URL shortening with custom expiry dates
- Dashboard to manage shortened URLs
- Copy-to-clipboard functionality
- URL access statistics
- Automatic URL validation
- Responsive design

## Auth Page:
![Auth Page](src/assets/auth.png)

## Dashboard Page: 
![Dashboard Page](src/assets/dashboard.png)

## User Journey

```mermaid
graph TD
    A[User Visits Site] --> B{Has Account?}
    B -->|No| C[Register]
    B -->|Yes| D[Login]
    C --> D
    D --> E[Dashboard]
    E --> F[Enter Long URL]
    F --> G[Set Expiry Days]
    G --> H[Generate Short URL]
    H --> I[View in URL List]
    I --> J[Copy/Share URL]
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    
    U->>F: Enter Credentials
    F->>B: Authentication Request
    B->>B: Validate Credentials
    B->>F: Return JWT Token
    F->>F: Store Token
    F->>U: Redirect to Dashboard
```

## System Architecture

```mermaid
graph LR
    A[Angular Frontend] --> B[Auth Guard]
    B --> C[Protected Routes]
    A --> D[Services]
    D --> E[Auth Service]
    D --> F[Dashboard Service]
    E --> G[Backend API]
    F --> G
```

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/augsaksham/url-shortner-frontend
cd url-shortner-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
ng serve
```

4. Navigate to `http://localhost:4200`

## Project Structure

```
url-shortner-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   └── dashboard/
│   │   ├── services/
│   │   ├── guards/
│   │   └── app.module.ts
│   ├── assets/
│   └── environments/
└── package.json
```
