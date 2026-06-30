const students = require("../data/students");

// GET All Students
const getStudents = (req, res) => {
  res.json(students);
};

// GET Student By ID
const getStudentById = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
};

// POST Student
const createStudent = (req, res) => {
  const student = {
    id: students.length + 1,
    ...req.body,
  };

  students.push(student);

  res.status(201).json(student);
};

// PUT Student
const updateStudent = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  student.name = req.body.name;
  student.age = req.body.age;

  res.json(student);
};

// DELETE Student
const deleteStudent = (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  students.splice(index, 1);

  res.json({
    message: "Deleted Successfully",
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};