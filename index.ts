require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const db = require("./src/configs/database");
const mainRoute = require('./src/routes/index')
const clientRedis = require('./src/configs/redis')

const app = express();

db.connect()
  .then(() => {
    clientRedis.connect()
    console.log("Database Connected!");
    app.use(
      express.urlencoded({
        extended: false,
      })
    );

    app.use(express.json());

    const corsOptions = {
      origin: ["*"],
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    };

    app.use(cors(corsOptions));

    app.get("/", (req: any, res: any) => {
      res.status(200).json({
        message: "Welcome to Wedank Server",
        status: 200,
        isSuccess: true,
      });
    });

    app.use('/', mainRoute)

    app.use((req: any, res: any) => {
      res.status(404).send({
        message: "URL is wrong!",
      });
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`PORT listening on ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
