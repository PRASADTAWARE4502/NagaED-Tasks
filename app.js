const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let courses = [
    { id: 1, title: "Course 1", description: "Introduction to Programming", duration: "3 weeks" },
    { id: 2, title: "Course 2", description: "Advanced JavaScript", duration: "4 weeks" }
];

// Get all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// Add a new course
app.post('/courses', (req, res) => {
    const newCourse = { id: courses.length + 1, ...req.body };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// Update a course by ID
app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);
    if (!course) return res.status(404).send('Course not found');

    Object.assign(course, req.body);
    res.json(course);
});

// Delete a course by ID
app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    courses = courses.filter(c => c.id !== courseId);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
