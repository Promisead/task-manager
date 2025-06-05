
# 📝 Task Manager App

A full-stack task management application built using **React**, **Express.js**, and **MongoDB**, featuring an animated clock, editable tasks, modal-based delete confirmations, and persistent task storage.

---

## 🔗 Live Demo

👉 [View Live Demo Here](https://task-manager.vercel.app)

---

## 📸 Screenshots

### 💻 Laptop View

![Laptop View](./task_image_laptop.jpg)

### 📱 Tablet View

![Tablet View](./task_image_tab.jpg)

### 📞 Mobile View

![Mobile View](./task_image_mobile.jpg)

---

## 🚀 Features

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as completed
- ✅ Stylish modal confirmation for deletions
- ✅ Persistent backend with MongoDB
- ✅ Animated live clock 
- ✅ Responsive and modern UI using React and CSS

---

## 📦 Technologies Used

### Frontend:
- React + TypeScript
- Vite for development bundling
- React Icons
- CSS for styling

### Backend:
- Express.js
- MongoDB + Mongoose
- dotenv and CORS

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/promisead/task-manager.git
cd task-manager
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

Then start the server:

```bash
npm run dev
```

> Make sure MongoDB is running locally, or replace the URI with your Atlas connection string.

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `/frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the React development server:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing the App

- Add a task with a title & description.
- Click the checkbox to mark complete (slashes it out).
- Edit and update a task.
- Delete a task using the modal confirmation.
- Confirm all changes reflect in MongoDB.

---

## 📁 Folder Structure

```
task-manager/
│      
│   
│── backend/              # Express API and MongoDB
│   ├── src/
│   │   ├── server.js
│   │   ├── models
│   │   └── controllers
│   │   └── routes
│   └── .env
│
├── frontend/              # React frontend (Vite + TS)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── components/
│   │       └── Clock.tsx
│   └── .env
```

---

## ❗ Assumptions

- Tasks must have a title (description optional).
- No authentication—this app is for single-user usage.
- MongoDB is expected to be available via connection string.
- Vite handles React build/development without additional config.

---

## 📄 License

MIT License – feel free to use and modify!

---

## 👤 Author

Developed by [PROMISE DUKE](https://github.com/promisead)
