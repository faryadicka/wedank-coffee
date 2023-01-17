require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = 5000;

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

const corsOptions = {
  origin: ["*"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "x-access-token"],
};

app.use(cors(corsOptions));

app.get("/", (req: any, res: any) => {
  res.status(200).json({
    message: "Welcome to Wedank Server",
    status: 200,
    isSuccess: true,
  });
});

app.use((req: any, res: any) => {
  res.status(404).send({
    message: "URL is wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`PORT listening on ${PORT}`);
});
