const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Configuration
const APP_EMAIL = process.env.APP_EMAIL || 'miltomy1@gmail.com';
const APP_PASSWORD = process.env.APP_PASSWORD || 'Saikik1234^';
const JWT_SECRET = process.env.JWT_SECRET || 'spendwise_super_secret_dev_key_123';

// Generate bcrypt hash of APP_PASSWORD for secure comparison
const PASSWORD_HASH = bcrypt.hashSync(APP_PASSWORD, 10);

app.use(cors());
app.use(express.json());

app.get('/manifest.webmanifest', (req, res) => {
  res.type('application/manifest+json');
  res.sendFile(path.join(__dirname, 'public', 'manifest.webmanifest'));
});

app.use(express.static(path.join(__dirname, 'public')));

// Helper functions for reading/writing data.json
const getInitialData = () => ({
  profile: {
    currency: 'USD',
    hourlyWage: 15.00
  },
  budgets: {
    Food: 200,
    Homelab: 50,
    Entertainment: 100
  },
  transactions: [],
  subscriptions: []
});

const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading data file, resetting to empty structure:', error);
    return getInitialData();
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
};

// Middleware: Authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token is invalid or expired' });
    }
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ROUTES ---

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Compare submitted email and password with hashed APP_PASSWORD
  const isEmailMatch = email && email.toLowerCase() === APP_EMAIL.toLowerCase();
  const isPasswordMatch = bcrypt.compareSync(password, PASSWORD_HASH);

  if (isEmailMatch && isPasswordMatch) {
    // Sign token valid for 30 days
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }
});

// Verify Session Endpoint
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ status: 'authenticated' });
});

// --- PROTECTED DATA API ROUTES ---

// Get all data
app.get('/api/data', authenticateToken, (req, res) => {
  const data = readData();
  res.json(data);
});

// Overwrite all data (used for imports / settings)
app.post('/api/data', authenticateToken, (req, res) => {
  const data = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid data payload' });
  }
  
  if (writeData(data)) {
    res.json({ message: 'Data saved successfully', data });
  } else {
    res.status(500).json({ error: 'Failed to write data to disk' });
  }
});

// Add a transaction
app.post('/api/transactions', authenticateToken, (req, res) => {
  const { type, amount, name, date, category, isNecessary, notes } = req.body;

  if (!type || !amount || !name || !date || !category) {
    return res.status(400).json({ error: 'Missing required transaction fields' });
  }

  const data = readData();
  const newTx = {
    id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    type,
    amount: parseFloat(amount),
    name,
    date,
    category,
    isNecessary: type === 'expense' ? !!isNecessary : true,
    notes: notes || ''
  };

  data.transactions.unshift(newTx); // Add to beginning of array

  if (writeData(data)) {
    res.status(201).json({ message: 'Transaction added successfully', transaction: newTx });
  } else {
    res.status(500).json({ error: 'Failed to save transaction' });
  }
});

// Delete a transaction
app.delete('/api/transactions/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.transactions.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  data.transactions.splice(index, 1);

  if (writeData(data)) {
    res.json({ message: 'Transaction deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

// Add or update a subscription
app.post('/api/subscriptions', authenticateToken, (req, res) => {
  const { id, name, cost, cycle, category, nextRenewal, active } = req.body;

  if (!name || cost === undefined || !cycle || !category || !nextRenewal) {
    return res.status(400).json({ error: 'Missing required subscription fields' });
  }

  const data = readData();
  
  if (id) {
    // Update existing subscription
    const index = data.subscriptions.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    data.subscriptions[index] = {
      id,
      name,
      cost: parseFloat(cost),
      cycle,
      category,
      nextRenewal,
      active: active !== false
    };
  } else {
    // Add new subscription
    const newSub = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      name,
      cost: parseFloat(cost),
      cycle,
      category,
      nextRenewal,
      active: active !== false
    };
    data.subscriptions.unshift(newSub);
  }

  if (writeData(data)) {
    res.json({ message: 'Subscription saved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

// Delete a subscription
app.delete('/api/subscriptions/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.subscriptions.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Subscription not found' });
  }

  data.subscriptions.splice(index, 1);

  if (writeData(data)) {
    res.json({ message: 'Subscription deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});

// Update budgets & profile settings
app.post('/api/settings', authenticateToken, (req, res) => {
  const { profile, budgets } = req.body;
  const data = readData();

  if (profile) {
    data.profile = { ...data.profile, ...profile };
  }
  if (budgets) {
    data.budgets = budgets;
  }

  if (writeData(data)) {
    res.json({ message: 'Settings updated successfully', data });
  } else {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Fallback to index.html for UI client router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` SpendWise Finance Tracker is active!`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(` Login Account: ${APP_EMAIL}`);
  console.log(`===================================================`);
});
