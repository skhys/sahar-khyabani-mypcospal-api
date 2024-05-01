const express = require("express");
const knex = require("knex");
const dbConfig = require("./knexfile");

const app = express();
const PORT = process.env.PORT || 5000;

const db = knex(dbConfig);

app.use(express.json());

app.post("/api/date", (req, res) => {
  const { date, mood, symptoms, activities, notes } = req.body;

  db("entries")
    .insert({
      date,
      mood,
      symptoms: JSON.stringify(symptoms),
      activities: JSON.stringify(activities),
      notes,
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
