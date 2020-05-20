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
    const artistId = parseInt(req.params.id, 10)
    // const data = await fetch(`http://localhost:8080/artist/${artistId}`)
    // const { name, biography } = await data.json()
    // console.log(name, biography)
    console.log(artistId)
    res.render("home");
});

app.get('/search', (req, res) => {
    res.render("search");
})

app.get('/collection/playlist', (req, res) => {
    res.render('collection');
})

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
})

app.get('/log-in', (req, res) => {
    res.render('log-in');
});


app.get("/profile", (req, res) => {
    res.render("profile");
});

// Define a port and start listening for connections.
const port = 4001;

app.listen(port, () => console.log(`Listening on port ${port}...`));
