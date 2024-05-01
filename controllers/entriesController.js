const knex = require("knex")(require("../knexfile"));

const submitFormData = async (req, res) => {
  const { date, mood, symptoms, activities, notes } = req.body;
  if (!date || !mood || !symptoms || !activities) {
    return res.status(400).json({
      message: "Date, mood, symptoms, and activities are required fields",
    });
  }

  try {
    const [id] = await knex("pcos_forms").insert({
      date,
      mood,
      symptoms: JSON.stringify(symptoms),
      activities: JSON.stringify(activities),
      notes,
    });

    const newRecord = await knex
      .select("id", "date", "mood", "symptoms", "activities", "notes")
      .from("pcos_forms")
      .where({ id })
      .first();

    res.status(201).json(newRecord);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to submit PCOS form data: ${error}` });
  }
};

const getAllFormData = async (_req, res) => {
  try {
    const formData = await knex
      .select("id", "date", "mood", "symptoms", "activities", "notes")
      .from("pcos_forms");
    res.status(200).json(formData);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error retrieving PCOS form data: ${err}` });
  }
};

const getFormDataById = async (req, res) => {
  try {
    const formData = await knex("pcos_forms")
      .select("id", "date", "mood", "symptoms", "activities", "notes")
      .where({ id: req.params.id })
      .first();

    if (!formData) {
      return res
        .status(404)
        .json({ message: `PCOS form data with ID ${req.params.id} not found` });
    }

    res.status(200).json(formData);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to retrieve PCOS form data: ${error}` });
  }
};

module.exports = { submitFormData, getAllFormData, getFormDataById };
