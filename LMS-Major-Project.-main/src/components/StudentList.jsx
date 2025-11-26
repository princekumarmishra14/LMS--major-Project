// StudentList component displays a list of all registered students
function StudentList({ students, setSelectedStudent }) {
  return (
    <div>
      {/* Heading for the student list section */}
      <h2>All Students</h2>

      {/* Conditional rendering: show message if no students are registered */}
      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        // Render the list of students
        <ul>
          {students.map((student) => (
            // Each student is rendered as a list item with a unique key
            <li key={student.id}>
              {/* Display student name, standard, and roll number */}
              <strong>{student.stdname}</strong> (Std: {student.standard}, Roll:{" "}
              {student.roll})
              {/* Button to view student details and set selected student */}
              <button
                onClick={() => setSelectedStudent(student)}
                style={{ marginLeft: "10px" }}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Export the component for use in other parts of the application
export default StudentList;