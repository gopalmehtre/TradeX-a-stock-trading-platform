# TradeX

A full-stack stock trading platform built with Node.js, Express, and React that allows users to manage their portfolio, place orders, and track holdings and positions.

## Project Structure

The project consists of three main components:

- **backend/** - Node.js/Express REST API server
- **frontend/** - React-based user interface
- **dashboard/** - Admin/analytics dashboard

## Features

### Authentication & Authorization
- User signup and login with JWT-based authentication
- Secure token-based session management
- Protected routes with middleware verification

### Trading Operations
- Place new orders
- View all holdings
- Track positions
- Order history management
- Update holdings information

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **MongoDB** - Database (via Mongoose models)
- **dotenv** - Environment configuration

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm package manager

### Installation

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd Stock\ trading\ platform
   ```

2. **Setup Backend**
   ```sh
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   TOKEN_KEY=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   PORT=8000
   ```

4. **Setup Frontend**
   ```sh
   cd ../frontend
   npm install
   ```

5. **Setup Dashboard**
   ```sh
   cd ../dashboard
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```sh
   cd backend
   npm start
   ```

2. **Start Frontend Development Server**
   ```sh
   cd frontend
   npm run dev
   ```

3. **Start Dashboard (optional)**
   ```sh
   cd dashboard
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - User login
- `POST /` - Check authentication status

### Trading Operations (Protected Routes)
- `GET /allHoldings` - Retrieve user's holdings
- `GET /allPositions` - Retrieve user's positions
- `POST /newOrder` - Place a new order
- `PUT /holdings/:name` - Update holding information
- `GET /allOrders` - Retrieve all user orders

## Project Components

### Backend Structure

#### Controllers
- `AuthController.js` - Handles user authentication (signup, login)
- `dashboardManager.js` - Manages trading operations

#### Middlewares
- `AuthMiddleware.js` - JWT verification and user authentication
  - `userVerification` - Protects routes
  - `checkAuthStatus` - Validates authentication status

#### Models
- `UserModel.js` - User schema
- `HoldingModel.js` - Holdings schema
- `PositionModel.js` - Positions schema
- `OrderModel.js` - Orders schema

#### Routes
- `Routes.js` - API endpoint definitions

#### Utilities
- `processOrder.js` - Order processing logic

## Security Features

- JWT-based authentication
- HTTP-only cookies for token storage
- Protected API routes with middleware verification
- Environment-based configuration for sensitive data

## Development

### Code Quality
Both frontend and dashboard use ESLint for maintaining code quality. Configuration files are located at:
- `frontend/eslint.config.js`
- `dashboard/eslint.config.js`

### Build Tools
- Vite is used for both frontend and dashboard
- Configuration files: `vite.config.js`

## Author

Gopal Mehtre.
