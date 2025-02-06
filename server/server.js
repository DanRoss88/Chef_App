import express from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import routes from './routes';
import rateLimit from 'express-rate-limit';

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply Rate Limiting Middleware to all requests
app.use(limiter);

// Handle 404 requests
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found!' });
  });

// Routes 
app.use('api/', routes)

// Server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

