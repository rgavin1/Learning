const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let redisClient;

(async () => {
  try {
    redisClient = redis.createClient({
      // Ran into 504 error: This is the solution
      url: "redis://redis:6379",
      // socket: { port: 6379 },
      // host: REDIS_URL,
      // port: REDIS_PORT,
      legacyMode: true,
    });
    await redisClient.connect();
    console.log("");
    console.error(
      "****************************************************\n",
      " ----------------  CONNECTED -------------------------",
      "\n****************************************************"
    );
  } catch (err) {
    console.error(
      "****************************************************\n",
      err,
      "\n****************************************************"
    );
  }
})();

/**
 * Routes:
 *  - Posts
 *  - Users (Auth)
 */
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

/**
 * This may not be best practice. Let's say the connection
 * to the mongo database via mongoose fails. How are we going to
 * handle this disaster? Oh! :wave I know, use a setTimeout function
 * to attempt again after 5 seconds.
 *
 *
 */
const connectionWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("successfully connected to db"))
    .catch((e) => {
      console.log(e);
      // attempt another connection after 5 seconds
      setTimeout(connectionWithRetry, 5000);
    });
};

connectionWithRetry();

/**
 * Middleware:
 *  - The express.json allows the req.body to be
 *    used in the request.
 */
app.use(express.json());
app.use(cors({}));
app.enable("trust proxy");
/**
 * This Redis middleware is used to create session cookies
 */
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  })
);

app.get("/api/v1/", (req, res) => {
  res.send("<h2>Hey Ramsey | Created Custom Docker Image</h2>");
  console.log("yeah it ran");
});

/**
 * :orange_book: Note: Best Practice by prefixing the route
 * with `/api/v#/`. Sticking the script :100:
 *
 */
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("listen of PORT: ", PORT));
