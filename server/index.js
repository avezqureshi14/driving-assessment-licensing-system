const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDatabase = require('./db/connection');
const app = express();
const userRouter = require("./routes/Profile")
const questionRouter = require("./routes/Question")
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' })); 
connectToDatabase();
app.use("/v1/api/user",userRouter);
app.use("/v1/api/question",questionRouter);
app.listen(8800, () => {
  console.log('Server started on port 8800');
});