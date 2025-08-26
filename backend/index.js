require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoutes');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// app.use('/api/auth',authRoute);
app.use('/api/recipes', recipeRoutes);
app.use('/api', authRoute);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to the MongoDb")).catch((err) => console.log("MongoDb connection error",err))



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});