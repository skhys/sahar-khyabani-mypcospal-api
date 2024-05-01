const router = require("express").Router();

const {
  submitFormData,
  getFormDataById,
  getAllFormData,
} = require("../controllers/entriesControllers");


router.post("/", submitFormData);

router.get("/", getAllFormData);

router.get("/:id", getFormDataById);


module.exports = router;
