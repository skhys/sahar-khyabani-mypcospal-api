require("dotenv").config();
const express = require("express");
const knex = require("knex");
const dbConfig = require("./knexfile");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const db = knex(dbConfig);

app.use(express.json());
app.use(cors());

app.post("/api/date", (req, res) => {
  const { date, mood, symptoms, activities, comment } = req.body;

  db("entries")
    .insert({
      date,
      mood,
      symptoms: JSON.stringify(symptoms),
      activities: JSON.stringify(activities) || "Didn't Exercise",
      notes: comment,
    })
    .then(() => {
      res.json({ message: "Form submitted successfully" });
    })
    .catch((err) => {
      console.error("Error submitting form data:", err);
      res
        .status(500)
        .json({ error: "An error occurred while submitting form data" });
    });
});

app.get("/api/date", (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    db.select("*")
      .from("entries")
      .then((entries) => {
        res.json(entries);
      })
      .catch((err) => {
        console.error("Error retrieving form data:", err);
        res
          .status(500)
          .json({ error: "An error occurred while retrieving form data" });
      });
  } else {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    db.select("*")
      .from("entries")
      .whereBetween("date", [start, end])
      .then((entries) => {
        res.json(entries);
      })
      .catch((err) => {
        console.error("Error retrieving form data:", err);
        res
          .status(500)
          .json({ error: "An error occurred while retrieving form data" });
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
