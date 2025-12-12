const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { connectDB } = require("./config/dbConn");

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static("public"));

app.use("/", require("./routes/root"));

app.use("/datatable", require("./routes/datatableRoutes"));

app.use("/dvd", require("./routes/dvdRoutes"));

app.use("/export", require("./routes/exportRoutes"));

app.use((req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found!" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const result = connectDB();
if (result) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
