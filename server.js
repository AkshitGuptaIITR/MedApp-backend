const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  // useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected')
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server Started on Port', PORT);
});