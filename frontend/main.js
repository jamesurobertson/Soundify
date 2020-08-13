const express = require("express");
const path = require("path");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Define a route.
app.get("/", (req, res) => {
  res.render("layout");
});

app.get("/browse", (req, res) => {
  res.render("home");
});

app.get("/browse/artist/:id(\\d+)", async (req, res) => {
  const artistId = parseInt(req.params.id, 10);
  res.render("home");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/collection/playlist", (req, res) => {
  res.render("collection");
});

app.get("/playlist/:id(\\d+)", (req, res) => {
  // playlistId = parseInt(req.params.id)
  // const playlists = await fetch(`localhost:8080/playlist/${playlistId}`,
  // )
  // res.render("playlist", { playlists })
  res.render("playlist");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.get("/log-in", (req, res) => {
  res.render("log-in");
});

app.get("/home-landing", (req, res) => {
  res.render("home-landing");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/artist");

// Define a port and start listening for connections.
const port = 4001;

app.listen(port, () => console.log(`Listening on port ${port}...`));
