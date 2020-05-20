const express = require("express");
const morgan = require("morgan");
const { environment } = require('./config');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const collectionsRouter = require('./routes/collections');
const albumsRouter = require('./routes/albums');
const artistsRouter = require('./routes/artists');
const playlistsRouter = require('./routes/playlists');
const homeRouter = require('./routes/browse');
const db = require('./db/models')
const app = express();


app.use(cors({ origin: "http://localhost:4001" }));
//app.use(requireAuth);
app.use(morgan("dev"));
app.use(express.json());
app.use('/', indexRouter);
app.use('/browse', homeRouter);
app.use('/user', usersRouter);
app.use('/collection', collectionsRouter);
app.use('/album', albumsRouter);
app.use('/artist', artistsRouter);
app.use('/playlist', playlistsRouter);


// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    err.errors = ["Could not find string of resource"]
    next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
