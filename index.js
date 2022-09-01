require("dotenv").config();
const express = require('express');
const auth = require("./routes/auth");
const users = require("./routes/users");
const songs = require("./routes/songs");   
const playlists = require("./routes/playlists");
const search = require("./routes/search");
     
const { connection } = require("./database/config");

connection();

const app = express();

const port = process.env.PORT || 8000;
app.listen(port, console.log(`conectado usando el puerto ${port}`));

app.use(express.json());
app.use("/api", auth);
app.use("/api/users", users);
app.use("/api/songs", songs);
app.use("/api/playlists", playlists);
app.use("/api/search", search);