URL Shortener
A URL Shortener App built using Node.js and Express.js, where users can create shortened URLs after signing up and logging in. The app secures access with JWT-based authentication, uses middleware to validate user sessions, and leverages the UUID library for generating unique short URLs.

Features
User Authentication:
Signup and login with secure token-based authentication using JWT.
URL Shortening:
Accepts a long URL as input and generates a shortened URL.
Middleware for Security:
Restricts URL shortening service to authenticated users only.
Unique Short URLs:
Uses UUID to generate unique short URL identifiers.
View Shortened URLs:
Displays the original and shortened URLs for logged-in users.

Usage
1. Signup & Login
Navigate to /signup to register a new user.
Navigate to /login to authenticate an existing user.
2. Shorten a URL
After logging in, navigate to the URL shortening dashboard.
Enter a long URL and click Shorten URL.
View the generated shortened URL on the dashboard.
3. Middleware for Route Protection
Non-authenticated users are redirected to the login page if they try to access protected routes.

Technologies Used
Backend: Node.js, Express.js
Templating: EJS
Database: MongoDB
Authentication: JWT
Unique Identifiers: UUID
