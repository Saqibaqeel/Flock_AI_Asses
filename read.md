# Wishlist Management System

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to manage products and create wishlists with JWT-based authentication.

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for REST API
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - ODM for MongoDB
- **JSON Web Tokens (JWT)** - Secure user authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React** - UI component library
- **React Router** - Client-side navigation
- **Zustand** - State management
- **Axios** - HTTP client for API calls
- **React Hot Toast** - User notifications
- **Bootstrap** - Responsive styling

## Authentication System

### JWT Implementation
1. **User Registration**
   - Password hashed with bcrypt before storage
   - JWT token generated upon successful registration
   - Token stored in client's localStorage

2. **User Login**
   - Credentials verified against hashed password
   - New JWT issued with user ID payload
   - Token expiration set to 1 hour

3. **Protected Routes**
   - Authentication middleware verifies JWT on protected endpoints
   - Bearer token sent in Authorization header
   - Token validation using secret key

### Security Features
- Password hashing with bcrypt (salt rounds: 10)
- HTTP-only cookies for token storage (optional)
- Token expiration handling
- Protected API endpoints
- Client-side route protection

## Backend Authentication Flow

```javascript
// JWT Middleware Example
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized access' });
  }
};

// Login Controller Example
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
};

### Backend .env
MONGODB_URI=mongodb_connection_string
JWT_SECRET=your_secure_secret_key
PORT=5000

### frontend .env
REACT_APP_API_BASE_URL=http://localhost:5000
### keyFeature
User authentication/authorization system

Product creation and management

Wishlist creation with collaborator support

REST API endpoints with CRUD operations

Responsive web interface

Protected client-side routes

Error handling and validation

State management with Zustand

## API end points 
**User Authentication**

Method	Path	Description
POST	/api/auth/signup	Create new user
POST	/api/auth/login	Authenticate user

**Products**

Method	Path	Description
GET	/api/products	Get all products
POST	/api/products	Create new product
GET	/api/products/:id	Get single product

**Wishlists**

Method	Path	Description
POST	/api/wishlists	Create new wishlist
GET	/api/wishlists	Get user wishlists
PUT	/api/wishlists/:id	Update wishlist
DELETE	/api/wishlists/:id	Delete wishlist

##Folder structure

backend/
├── controllers/       # Route controllers
├── models/            # MongoDB models
├── routes/            # Express routes
├── middleware/        # Auth middleware
├── utility/           # Helper functions
└── server.js          # Main server file



frontend/
├── public/
├── src/
│   ├── components/    # Reusable components
│   ├
│   ├── store/         # Zustand stores
│   ├── utility/       # Axios configuration
│   └── App.js         # Main application component
└── package.json
