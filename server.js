const express = require('express');
const cors = require('cors');

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

// ONLY USE app.listen IF NOT ON VERCEL
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// EXPORT THE APP FOR VERCEL
module.exports = app;
