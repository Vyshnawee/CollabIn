# CollabIn

A full-stack, LinkedIn-style social networking platform built for developers — create a professional profile, showcase your skills and projects, and discover and connect with other developers.

**Live Repo:** [github.com/Vyshnawee/CollabIn](https://github.com/Vyshnawee/CollabIn)

---

## ✨ Features

- **Developer Profiles** — Create and edit a professional profile highlighting your skills, projects, and experience.
- **Discover Developers** — Browse and search for other developers on the platform.
- **Connections System** — Send, accept, and reject connection requests to build your developer network (similar to LinkedIn's connection model).
- **Secure Authentication** — JWT-based authentication protecting all user routes and APIs.
- **Real-Time Profile Updates** — Manage and update your profile and connections in real time.
- **Responsive UI** — Clean, mobile-friendly interface built with React.js, Redux Toolkit, and Tailwind CSS.

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Redux Toolkit (state management)
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- JWT (JSON Web Token) Authentication

**Database**
- MongoDB (Mongoose schemas for users, connection requests, and network relationships)

---

## 🏗 Architecture Overview

- **REST API** — Express.js exposes secure REST endpoints consumed by the React frontend.
- **Auth Flow** — Users register/login and receive a JWT, which is attached to subsequent requests to access protected routes.
- **Data Model** — MongoDB stores user profiles, connection requests (pending/accepted/rejected), and the resulting network relationships between users.
- **State Management** — Redux Toolkit manages frontend state for auth, profiles, and connections, keeping the UI in sync with the backend.

---

## 📂 Project Structure

```
CollabIn/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages (Profile, Feed, Connections, etc.)
│   │   ├── redux/          # Redux Toolkit slices & store
│   │   └── App.js
│   └── package.json
├── server/                  # Node.js/Express backend
│   ├── models/              # Mongoose schemas (User, Connection, etc.)
│   ├── routes/               # REST API routes
│   ├── controllers/          # Route handlers/business logic
│   ├── middleware/           # JWT auth middleware
│   └── server.js
├── .env.example
└── README.md
```

> Adjust the tree above to match your actual folder layout if it differs.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- A MongoDB instance (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Vyshnawee/CollabIn.git
cd CollabIn
```

### 2. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure environment variables
Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the app
```bash
# Start the backend (from /server)
npm start

# Start the frontend (from /client, in a separate terminal)
npm start
```

The frontend will typically run on `http://localhost:3000` and the backend on `http://localhost:5000` (adjust based on your actual configuration).

---

## 🔑 Core API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT |
| GET | `/api/users/:id` | Get a developer's profile |
| PUT | `/api/users/:id` | Update profile info |
| POST | `/api/connections/request` | Send a connection request |
| PUT | `/api/connections/:id/accept` | Accept a connection request |
| PUT | `/api/connections/:id/reject` | Reject a connection request |
| GET | `/api/connections` | List a user's connections |

> Update this table to reflect your actual route names/paths.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. Add your preferred license (e.g., MIT) here.

---

## 👤 Author

**Gabbeta Vyshnawee**
- GitHub: [@Vyshnawee](https://github.com/Vyshnawee)
- LeetCode: [gabbetavyshnawee](https://leetcode.com/u/gabbetavyshnawee/)
