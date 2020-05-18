const express = require("express");
const path = require("path");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Define a route.
app.get("/", (req, res) => {
  res.render("home");
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up');
})

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/search', (req, res) => {
  res.render("search");
})

app.get("/profile", (req, res) => {
  res.render("profile");
});

// Define a port and start listening for connections.
const port = 4001;

app.listen(port, () => console.log(`Listening on port ${port}...`));
