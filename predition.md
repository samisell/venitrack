Football Prediction Web App - Agent Guidelines
Architecture
Type: Node.js web application with Express.js framework and MySQL database

Structure: MVC pattern with models/, routes/, controllers/, views/, public/, services/, and config/ directories

Database: MySQL with Sequelize ORM, schema at database/schema.sql

Frontend: Bootstrap 5 + vanilla JavaScript + Chart.js for analytics

Key Components
Authentication: JWT-based auth in middleware/authMiddleware.js

Database: Sequelize connection in config/database.js, models in models/

APIs: RESTful endpoints in routes/ (auth.js, matches.js, predictions.js)

Templates: EJS templates in views/ with partials for header/footer

Admin Panel: Match management and system analytics in /admin routes

User Portal: Prediction dashboard and history in /user routes

AI Integration: DeepSeek API service in services/aiService.js

Football Data: API integration in services/footballApi.js

Development Commands
Install Dependencies: npm install

Run Development Server: npm run dev (uses nodemon for hot reloading)

Run Production Server: npm start

Database Setup:

Create database from database/schema.sql

Seed sample data with npm run seed

Environment: Copy .env.example to .env and configure credentials

Code Style
JavaScript:

Use ES6+ syntax (const/let, arrow functions)

Async/await for asynchronous operations

Proper error handling with try/catch

Variables: camelCase for variables and functions

Security:

Always use parameterized queries (Sequelize)

bcrypt for password hashing

Input validation with express-validator

JWT for authentication

Validation:

Validate all API inputs

Use middleware for repetitive checks

Notifications:

Use SweetAlert2 for client-side notifications

Nodemailer for email notifications

Headers:

Always check JWT token in protected routes

Use proper CORS headers for API endpoints

API Documentation
Base URL: /api/v1

Endpoints:

POST /auth/register - User registration

POST /auth/login - User login

GET /matches - Get upcoming matches

GET /matches/:id - Get match details with AI prediction

POST /predictions - Submit a prediction

GET /predictions - Get user's prediction history

GET /predictions/accuracy - Get user's prediction accuracy stats

Deployment Checklist
Set up MySQL database in cPanel

Configure .env with production credentials

Install Node.js dependencies (npm install --production)

Build frontend assets (if using bundlers)

Set up process manager (PM2 recommended)

Configure reverse proxy (if needed)

Set up SSL certificate

Schedule cron jobs for data updates

Maintenance Procedures
Daily:

Check error logs

Verify API quota usage

Backup database

Weekly:

Review prediction accuracy metrics

Update team statistics

Monthly:

Rotate API keys

Update dependencies

Review security settings

Troubleshooting Guide
Database Issues:

Check connection settings in .env

Verify database permissions

API Failures:

Check API key validity

Review rate limits

Authentication Problems:

Verify JWT secret

Check token expiration

Performance Bottlenecks:

Optimize database queries

Implement caching for frequent requests

Feature Roadmap
Next Version:

Live match updates

Social sharing of predictions

Leaderboard system

Future:

Mobile app integration

Advanced betting system

Machine learning model training