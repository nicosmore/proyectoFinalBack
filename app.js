const express = require("express");
const config = require("./src/config/env.config");
const cors = require('cors');
const apiRoutes = require("./src/routers/app.routers");
const errorMiddleware = require("./src/middlewares/error.middleware");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const dbConfig = require("./src/config/db.config");
const passport = require("./src/middlewares/passport");


const app = express();

//App Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./src/views'));


app.use(
  session({
    name: "proyectoFinalSession",
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.connectTo(config.DB_NAME),
    }),
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', './src/views');

//Api routes
app.use("/api", apiRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  const html = `Servidor express | Port: ${config.PORT} | Environment:${config.NODE_ENV} | DB:${config.DATASOURCE} | - <b>PID => ${process.pid}</b> - ${new Date().toLocaleString()}`;
  res.send(html);
});

module.exports = app;
