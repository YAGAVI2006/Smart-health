# Smart Health

A comprehensive healthcare web application for symptom tracking, disease prediction, and outbreak monitoring.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Symptom Reporting**: Patients can submit symptoms with location data
- **Disease Prediction**: AI-powered prediction based on symptoms (Cholera, Typhoid, Dysentery, Gastroenteritis)
- **Admin Dashboard**: View disease statistics with interactive charts
- **Outbreak Map**: Real-time visualization of reported cases on an interactive map
- **Role-based Access**: Separate dashboards for patients and administrators

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React with React Router
- Axios for API calls
- Recharts for data visualization
- Leaflet for interactive maps

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd smart-health
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/smarthealth
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Database Setup
Make sure MongoDB is running locally:
```bash
# On Windows
mongod --dbpath "C:\data\db"

# On macOS/Linux
sudo mongod --dbpath /usr/local/var/mongodb
```

## Running the Application

### Development Mode
1. Start the backend:
```bash
cd backend
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build
```bash
cd frontend
npm run build
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Patient Dashboard**: Submit symptom reports with location
3. **Admin Dashboard**: View disease statistics and outbreak data
4. **Outbreak Map**: Visualize all reported cases geographically

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Reports
- `POST /api/reports` - Submit symptom report (authenticated)
- `GET /api/reports` - Get all reports for map (authenticated)
- `GET /api/reports/stats` - Get disease statistics (admin only)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
3. `npm install`
4. `npm start`

## Features

- User registration/login (patient/admin)
- Patient dashboard with symptom reporting
- AI prediction (simple rule-based) for Cholera, Typhoid, Dysentery, Gastroenteritis
- Reports stored in MongoDB
- Admin dashboard with chart statistics
- Outbreak map view using Leaflet
- Responsive UI using basic CSS

## Deploying

Push to GitHub and use services like Heroku (backend) and Vercel/Netlify (frontend). Make sure environment variables are set.
