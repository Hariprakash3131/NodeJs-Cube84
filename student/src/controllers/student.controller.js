let students = [];
let nextId = 1;

const getStudents = (req, res) => {
    res.status(200).json(students);
};

const getStudentById = (req, res) => {
    const student = students.find((item) => item.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
};

const createStudent = (req, res) => {
    const student = {
        id: nextId,
        ...req.body
    };

    nextId += 1;
    students.push(student);

    res.status(201).json(student);
};

const updateStudent = (req, res) => {
    const studentIndex = students.findIndex((item) => item.id === Number(req.params.id));

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students[studentIndex] = {
        ...students[studentIndex],
        ...req.body,
        id: students[studentIndex].id
    };

    return res.status(200).json(students[studentIndex]);
};

const deleteStudent = (req, res) => {
    const studentIndex = students.findIndex((item) => item.id === Number(req.params.id));

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    return res.status(200).json(deletedStudent[0]);
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
