const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbms/index");
const app = express();
const userRoute = require("./routes/user.routes")
const appointmentRoute = require("./routes/appointment.routes");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

    app.use('/api/user', userRoute);
    app.use('/api/appointment', appointmentRoute);
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


