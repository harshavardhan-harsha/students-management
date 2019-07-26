const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Students = require("../../models/StudentModel");

// @route GET /api/Students
// @desc get all the students
router.get("/", async (req, res) => {
  try {
    const students = await Students.find({});
    res.send(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/Students/:id
// @desc get student by id
router.get("/:id", async (req, res) => {
  try {
    const student = await Students.findOne({ _id: req.params.id });
    if (!student) {
      return res.send(`No student found with id ${req.params.id}`);
    }
    res.send(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/Students/
// @desc create a student
router.post(
  "/",
  [
    check("name", "Name is required..")
      .not()
      .isEmpty(),
    check("age", "Age is required")
      .not()
      .isEmpty(),
    check("email", "Enter a valid email").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, age, email } = req.body;
    const newStudent = new Students({
      name: name,
      age: age,
      email: email
    });
    try {
      const stu = await newStudent.save();
      res.json(stu);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT /api/Students/:id
// @desc Edit a student
router.put("/:id", async (req, res) => {
  const { name, age, email } = req.body;

  const updatedStudent = {};
  if (name) updatedStudent.name = name;
  if (age) updatedStudent.age = age;
  if (email) updatedStudent.email = email;

  try {
    let student = await Students.findById(req.params.id);
    if (!student) {
      return res.status(404).send(`No student found with id ${req.params.id}`);
    }
    student = await Students.findByIdAndUpdate(req.params.id, { $set: updatedStudent }, { new: true });
    res.send(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/Students/:id
// @desc delete a student
router.delete("/:id", async (req, res) => {
  try {
    let student = await Students.findById(req.params.id);
    if (!student) {
      return res.status(404).send(`No student found with id ${req.params.id}`);
    }
    await Students.findByIdAndDelete(req.params.id);
    res.send("Student deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
