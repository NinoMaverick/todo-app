📝 To-Do App with Authentication

A simple yet complete To-Do application built using Node.js, featuring full CRUD functionality and user authentication. 
This app was created as a practical milestone to solidify backend development skills and move from “learning” to shipping real projects.

---

 🔧 Tech Stack

- Backend Framework: Node.js + Express.js  
- Database: MongoDB (via Mongoose ODM)  
- Authentication: JSON Web Tokens (JWT), Password Hashing (bcrypt)  
- Environment Config: `dotenv`  
- Server Monitoring: nodemon (for development)  
- Deployment: Render  
- Version Control: Git + GitHub

---

🚀 Live Demo

👉 [https://todo-app-xs2p.onrender.com](https://todo-app-xs2p.onrender.com)

---

## 📦 Features

- 🔐 User Registration & Login
- ✅ Create, Read, Update, Delete Todos (CRUD)
- 👥 Todos scoped to authenticated users
- 📁 MongoDB data persistence
- 📡 RESTful API architecture
- 🧠 Clean MVC structure (Model-View-Controller)

---

 🧠 Challenges Faced (and Beat)

1. Managing Authentication and Authorization
   - Challenge: Implementing user authentication and authorization (JWT-based) was complex. Handling user registration, login, and token verification required deep understanding of security practices.
   - Solution: leveraged libraries like `jsonwebtoken` and used middleware to protect routes. I also focused on properly managing session state, handling JWT expiry, and securing sensitive user data.

2. Handling MongoDB Connection
   - Challenge: Initially faced issues with MongoDB connectivity, particularly with configuring environment variables and connecting to the database remotely during deployment.
   - Solution: I correctly set up MongoDB and learned how to use `.env` files to store sensitive data. I made sure the `MONGO_URI` was properly referenced in the cloud environment and tested the connection.

3. Routing and API Design
   - Challenge: Structuring and organizing API routes in a clean, modular way was a bbit of challenge. As the app grew, handling CRUD operations and keeping routes clean while managing errors became a balancing act.
   - Solution: Adopted the MVC architecture for better organization, with separate files for controllers, models, and routes. This allowed for scalability and easier debugging.

4. Deployment Issues
   - Challenge: Initial deployment to Render didn't work as expected due to incorrect MongoDB URI setup, leading to failed connection attempts.
   - Solution: I overcame this by ensuring that all environment variables were set correctly and testing them locally before deploying. I also utilized Render's auto-logs to quickly pinpoint and fix issues.

5. Handling Asynchronous Operations
   - Challenge: Working with MongoDB in an asynchronous environment and managing `async/await` calls for creating, reading, updating, and deleting to-do items was challenging, especially when you ran into issues like non-blocking calls and uncaught errors.
   - Solution: You refined your error handling practices and ensured each async operation was wrapped in proper try-catch blocks, reducing runtime errors and improving reliability.

6. API Testing
   - Challenge: Ensuring that the backend API routes were working as intended required extensive testing. Manual testing via Postman became tedious.
   - Solution: I used Postman effectively to test the backend endpoints and made sure that each endpoint handled data appropriately, returning correct responses and handling errors gracefully.

7. Procrastination disguised as perfectionism
-  Internal excuse loop of “not ready yet”
-  Ignored the perfectionism trap and shipped the MVP live
-  This was really important to me, I needed to get out of just 'learning' and actually ship something

---

 📁 File Structure (MVC Architecture)

```
.
├── controllers/
│   └── todoController.js
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── middleware/
│   └── authMiddleware.js
├── server.js
├── .env
├── package.json
```

---

## 🛠️ Getting Started (Local Setup)

1. Clone the repo:
   ```bash
   git clone https://github.com/NinoMaverick/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file and add:
   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. API should be live at `http://localhost:5000`

---

 🧭 Next Improvements

- Add frontend (React or basic HTML/CSS)
- Unit & integration tests
- Error logging service (e.g., Sentry)
- Pagination & sorting
- Rate limiting & input sanitization


  


