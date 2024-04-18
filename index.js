const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Increase payload size limit (e.g., 50MB)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Import API modules
const postApi = require("./apis/postApi/postApi");
const usersApi = require("./apis/usersApi/usersApi");
const categoryApi = require("./apis/categoryApi/categoryApi");
const logoApi = require("./apis/logoApi/logoApi");
const advertisementApi = require("./apis/advertisementApi/advertisementApi");
const photoGalleryApi = require("./apis/photoGalleryApi/photoGalleryApi");
const videoGalleryApi = require("./apis/videoGalleryApi/videoGalleryApi");
const facebookApi = require("./apis/socialMediaApi/facebookApi");
const twitterApi = require("./apis/socialMediaApi/twitterApi");
const instagramApi = require("./apis/socialMediaApi/instagramApi");
const youtubeApi = require("./apis/socialMediaApi/youtubeApi");
const footerApi = require("./apis/footerApi/footerApi");
const footerThemeApi = require("./apis/footerApi/footerThemeApi");
const bodyThemeApi = require("./apis/bodyThemeApi/bodyThemeApi");
const commentApi = require("./apis/commentApi/commentApi");
const noticeApi = require("./apis/noticeApi/noticeApi");
const paymentApi = require("./apis/paymentApi/paymentApi");
const contactApi = require("./apis/contactApi/contactApi");

const corsConfig = {
  origin: [
    "https://lnews1.sbmaxitpark.com",
    "http://lnews1.sbmaxitpark.com",
    "lnews1.sbmaxitpark.com",
    "http://localhost:5173",
    "https://sunwingsnews.com",
    "http://sunwingsnews.com",
    "https://www.sunwingsnews.com",
    "http://www.sunwingsnews.com",
    "www.sunwingsnews.com",
    "sunwingsnews.com",
  ],

  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// middlewares
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

//mongodb start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oewoyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //collection start
    const postCollection = client.db("sunwings-news").collection("posts");
    const usersCollection = client.db("sunwings-news").collection("users");
    const categoryCollection = client
      .db("sunwings-news")
      .collection("categories");
    const logoCollection = client.db("sunwings-news").collection("logos");
    const advertisementCollection = client
      .db("sunwings-news")
      .collection("advertisements");
    const photoGalleryCollection = client
      .db("sunwings-news")
      .collection("photo-gallery");
    const videoGalleryCollection = client
      .db("sunwings-news")
      .collection("video-gallery");
    const faceookCollection = client.db("sunwings-news").collection("facebook");
    const twitterCollection = client.db("sunwings-news").collection("twitter");
    const instagramCollection = client
      .db("sunwings-news")
      .collection("instagram");
    const youtubeCollection = client.db("sunwings-news").collection("youtube");
    const footerCollection = client.db("sunwings-news").collection("footer");
    const bodyCollection = client.db("sunwings-news").collection("body-theme");
    const commentCollection = client.db("sunwings-news").collection("comments");
    const noticeCollection = client.db("sunwings-news").collection("notice");
    const paymentsCollection = client
      .db("sunwings-news")
      .collection("payments");
    const contactCollection = client
      .db("sunwings-news")
      .collection("user-inquiries");

    //collection end

    // Apis Start
    app.use("/posts", postApi(postCollection));
    app.use("/users", usersApi(usersCollection));
    app.use("/categories", categoryApi(categoryCollection));
    app.use("/logos", logoApi(logoCollection));
    app.use("/advertisements", advertisementApi(advertisementCollection));
    app.use("/photo-gallery", photoGalleryApi(photoGalleryCollection));
    app.use("/video-gallery", videoGalleryApi(videoGalleryCollection));
    app.use("/facebook", facebookApi(faceookCollection));
    app.use("/twitter", twitterApi(twitterCollection));
    app.use("/instagram", instagramApi(instagramCollection));
    app.use("/youtube", youtubeApi(youtubeCollection));
    app.use("/footer", footerApi(footerCollection));
    app.use("/footer-theme", footerThemeApi(footerCollection));
    app.use("/body-theme", bodyThemeApi(bodyCollection));
    app.use("/comments", commentApi(commentCollection));
    app.use("/notice", noticeApi(noticeCollection));
    app.use("/payment", paymentApi(paymentsCollection));
    app.use("/support", contactApi());
    // Apis End

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//mongodb end

// basic setup
app.get("/", (req, res) => {
  res.send("Sunwings News Server is Running.");
});

app.listen(port, () => {
  console.log(`Sunwings News Server is Running on PORT: ${port}`);
});
