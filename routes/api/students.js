const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../../models/StudentModel");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { name, age, email } = req.body;

    const newStudent = new Student({
      name: name,
      age: age,
      email: email
    });

    try {
      const student = await newStudent.save();
      res.json(student);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.put("/:id", async (req, res) => {
  const { name, age, email } = req.body;
  const updatedStudent = {};
  if (name) updatedStudent.name = name;
  if (age) updatedStudent.age = age;
  if (email) updatedStudent.email = email;

  try {
    let student = Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send(`Student not found with id${req.params.id}`);
    }
    student = await Student.findByIdAndUpdate(req.params.id, { $set: updatedStudent }, { new: true });
    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let student = Student.findById(req.params.id);
    if (!student) {
      return res.status(400).send(`Student not found with id${req.params.id}`);
    }
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: "Student Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
