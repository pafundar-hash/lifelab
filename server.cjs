require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "LifeLab backend is running" });
});

app.post("/api/identify-plant", upload.single("image"), async (req, res) => {
  try {
    if (!process.env.PLANTNET_API_KEY) {
      return res.status(500).json({
        error: "Plant identification is not configured.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Please upload a plant image.",
      });
    }

    const form = new FormData();

    form.append("images", req.file.buffer, {
      filename: req.file.originalname || "plant.jpg",
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      "https://my-api.plantnet.org/v2/identify/all",
      form,
      {
        params: {
          "api-key": process.env.PLANTNET_API_KEY,
          lang: "en",
        },
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Plant identification error:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      error: "Plant identification failed. Please try another image.",
  });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log("LifeLab backend running at http://localhost:" + PORT);
});