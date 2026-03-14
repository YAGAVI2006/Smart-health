# Smart Health Application

A comprehensive health monitoring web application built with React and Node.js that helps users track symptoms, get disease predictions, and receive personalized medical advice.

## 🌟 Features

- 🔐 **User Authentication** - Secure registration and login system
- 📊 **Symptom Assessment** - Comprehensive symptom checklist with severity levels
- 🏥 **Disease Prediction** - AI-powered health condition prediction based on symptoms
- 💊 **Medication Tracking** - Track medication types, names, and dosage schedules
- 👨‍⚕️ **Doctor Consultation** - Record doctor consultation status
- 🏠 **Home Remedies** - Personalized home remedy recommendations
- 📈 **Admin Dashboard** - Statistics and analytics for administrators
- 🗺️ **Health Map** - Visual representation of health data
- 🌙 **Dark Theme UI** - Modern, eye-friendly dark interface
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **CSS3** - Custom styling with dark theme

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YAGAVI2006/Smart-health.git
cd smart-health
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

4. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the connection string in `backend/config/db.js`

5. **Start the backend server:**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

6. **Start the frontend (in a new terminal):**
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

## 📖 Usage

### For Users:
1. **Register** a new account or **login** with existing credentials
2. **Complete Symptom Assessment:**
   - Check relevant symptoms from the comprehensive list
   - Select severity level (Mild/Moderate/Severe)
   - Specify duration of symptoms
   - Indicate medication usage and details
   - Note doctor consultation status
3. **View Results:**
   - See predicted health condition
   - Get personalized home remedies
   - Receive medical advice based on severity
4. **Track Progress** through your dashboard

### For Administrators:
- Access admin dashboard for system statistics
- View user reports and health trends
- Monitor application usage

## 📁 Project Structure

```
smart-health/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Report.js          # Health report schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── report.js          # Report submission routes
│   ├── server.js              # Main server file
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SymptomForm.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Map.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── README.md
└── .gitignore
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Reports
- `POST /api/reports` - Submit symptom report
- `GET /api/reports/stats` - Get admin statistics (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for health monitoring and awareness
- Uses disease prediction algorithms for educational purposes
- Always consult healthcare professionals for medical advice

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**⚠️ Disclaimer:** This application is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
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
