const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const productRoutes = require('./routes/productRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const creditNoteRoutes = require('./routes/creditNoteRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// --- AUTO-CREATE DATABASE TABLES ON STARTUP ---
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Thanks',
    database: process.env.DB_NAME || 'acounting',
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: true
    }
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to MySQL database.");

    db.query(`CREATE TABLE IF NOT EXISTS users (...)`, (err) => { ... });
    // ... (you can leave the rest of the table creation out for the serverless function, 
    // but it's fine to leave it. Actually, for Vercel, it's better to remove the 
    // db.connect block because serverless functions connect on demand. 
    // But let's keep it simple and just fix the app.listen issue).
});

// Actually, to keep it 100% simple and bulletproof, let's remove the db.connect block 
// from server.js and just rely on the pool in db.js. Vercel will use the pool.

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/inventory', productRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/credit-notes', creditNoteRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Atas Books API!" });
});

// Set the port
const PORT = process.env.PORT || 5000;

// ONLY USE app.listen IF NOT ON VERCEL
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// EXPORT THE APP FOR VERCEL
module.exports = app;
