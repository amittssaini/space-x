const express = require('express');
require('dotenv').config();
const cors = require('cors')
const spaceRouter = require('./routes/space.route')
const PORT = process.env.PORT;

const app = express();
app.listen(PORT,()=>console.log(`port is listen at ${PORT}`))
app.use(cors())
app.use(express.json());

app.use('/api/space',spaceRouter);