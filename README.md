# Micro-Services Architecture

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)

A complete microservices-based application built with Node.js, Express, MongoDB, and RabbitMQ.

[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub stars](https://img.shields.io/github/stars/shubhamdagar9854/MICRO-SERVICE.svg)](https://github.com/shubhamdagar9854/MICRO-SERVICE/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shubhamdagar9854/MICRO-SERVICE.svg)](https://github.com/shubhamdagar9854/MICRO-SERVICE/network)

</div>

## 📋 Table of Contents

- [Architecture Overview](#️-architecture-overview)
- [Services](#-services)
- [Project Structure](#-project-structure)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Docker Support](#🐳-docker-support)
- [Monitoring & Logging](#-monitoring--logging)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🏗️ Architecture Overview

This project demonstrates a microservices architecture with the following services:

```mermaid
graph TB
    Client[Client Application] --> Gateway[API Gateway :3000]
    Gateway --> UserService[User Service :3001]
    Gateway --> CaptainService[Captain Service :3002]
    Gateway --> RideService[Ride Service :3003]
    
    UserService --> MongoDB1[(MongoDB)]
    CaptainService --> MongoDB2[(MongoDB)]
    RideService --> MongoDB3[(MongoDB)]
    
    UserService --> RabbitMQ[RabbitMQ]
    CaptainService --> RabbitMQ
    RideService --> RabbitMQ
```

- **User Service** - Handles user authentication, registration, and profile management
- **Captain Service** - Manages captain/driver operations
- **Ride Service** - Handles ride booking and management
- **API Gateway** - Central entry point for all client requests

## 🚀 Services

### User Service
- **Port**: 3001
- **Features**: 
  - User registration and login
  - JWT authentication
  - Profile management
  - Token blacklisting for logout

### Captain Service
- **Port**: 3002
- **Features**:
  - Captain registration and verification
  - Vehicle management
  - Availability status

### Ride Service
- **Port**: 3003
- **Features**:
  - Ride booking
  - Ride tracking
  - Payment integration

### API Gateway
- **Port**: 3000
- **Features**:
  - Request routing
  - Load balancing
  - Authentication middleware

## � Project Structure

```
MICRO-SERVICE/
├── user/                    # User Service
│   ├── controllers/         # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── service/            # Business logic
│   ├── db/                 # Database configuration
│   ├── app.js              # Express app setup
│   ├── server.js           # Server startup
│   └── package.json        # Dependencies
├── captain/                # Captain Service
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── service/
│   ├── db/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── ride/                   # Ride Service
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── service/
│   ├── db/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── gateway/                # API Gateway
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── user-backup/            # Backup of original user service
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## �️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Message Queue**: RabbitMQ
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Logging**: Morgan
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- RabbitMQ
- Git

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shubhamdagar9854/MICRO-SERVICE.git
cd MICRO-SERVICE
```

### 2. Install dependencies for each service
```bash
# User Service
cd user
npm install

# Captain Service
cd ../captain
npm install

# Ride Service
cd ../ride
npm install

# API Gateway
cd ../gateway
npm install
```

### 3. Set up environment variables
Create `.env` file in each service directory with the following variables:

**User Service (.env)**:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/user-service
JWT_SECRET=your-jwt-secret-key
RABBITMQ_URL=amqp://localhost:5672
```

**Captain Service (.env)**:
```
PORT=3002
MONGODB_URI=mongodb://localhost:27017/captain-service
RABBITMQ_URL=amqp://localhost:5672
```

**Ride Service (.env)**:
```
PORT=3003
MONGODB_URI=mongodb://localhost:27017/ride-service
RABBITMQ_URL=amqp://localhost:5672
```

**API Gateway (.env)**:
```
PORT=3000
USER_SERVICE_URL=http://localhost:3001
CAPTAIN_SERVICE_URL=http://localhost:3002
RIDE_SERVICE_URL=http://localhost:3003
```

### 4. Start MongoDB and RabbitMQ
```bash
# Start MongoDB
mongod

# Start RabbitMQ (if using Docker)
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### 5. Start all services
```bash
# Start User Service
cd user && npm start

# Start Captain Service (in new terminal)
cd captain && npm start

# Start Ride Service (in new terminal)
cd ride && npm start

# Start API Gateway (in new terminal)
cd gateway && npm start
```

## 📡 API Endpoints

### User Service
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `GET /users/profile` - Get user profile

### Captain Service
- `POST /captains/register` - Register new captain
- `GET /captains/:id` - Get captain details
- `PUT /captains/:id/status` - Update captain availability

### Ride Service
- `POST /rides/book` - Book a ride
- `GET /rides/:id` - Get ride details
- `PUT /rides/:id/status` - Update ride status

### API Gateway
All requests are routed through the gateway:
- `POST /api/users/register` -> User Service
- `POST /api/users/login` -> User Service
- `POST /api/rides/book` -> Ride Service
- etc.

## 🔧 Development

### Running in Development Mode
```bash
# For any service
npm run dev
```

### Database Schema
Each service has its own MongoDB database with isolated schemas.

### Message Queue Communication
Services communicate asynchronously using RabbitMQ for:
- Ride booking notifications
- Captain availability updates
- User notifications

## 🐳 Docker Support

You can run the entire stack using Docker:
```bash
docker-compose up
```

## 📊 Monitoring & Logging

- Each service logs requests using Morgan
- Logs can be aggregated using ELK stack or similar
- Health check endpoints available for monitoring

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using the port
netstat -tulpn | grep :3000
# Kill the process
sudo kill -9 <PID>
```

#### 2. MongoDB Connection Failed
```bash
# Check MongoDB status
sudo systemctl status mongod
# Start MongoDB
sudo systemctl start mongod
```

#### 3. RabbitMQ Connection Issues
```bash
# Check RabbitMQ status
sudo systemctl status rabbitmq-server
# Restart RabbitMQ
sudo systemctl restart rabbitmq-server
```

#### 4. Service Not Starting
- Check if all environment variables are set
- Verify database connections
- Check service logs for errors

#### 5. CORS Issues
Make sure the API Gateway is properly configured with CORS middleware.

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG=* npm start
```

### Health Check Endpoints
Each service has a health check endpoint:
- `GET /health` - Service health status
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Note**: This is a demonstration project for learning microservices architecture concepts.
