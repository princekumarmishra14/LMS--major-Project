// StudentProfile component displays detailed information about a single student
function StudentProfile({ student }) {
  return (
    <div>
      {/* Heading for the profile section */}
      <h2>Student Profile</h2>

      {/* Display student ID */}
      <p><strong>ID:</strong> {student.id}</p>

      {/* Display student name */}
      <p><strong>Name:</strong> {student.stdname}</p>

      {/* Display student standard/class */}
      <p><strong>Standard:</strong> {student.standard}</p>

      {/* Display student age */}
      <p><strong>Age:</strong> {student.age}</p>

      {/* Display student roll number */}
      <p><strong>Roll:</strong> {student.roll}</p>
    </div>
  );
}

// Export the component for use in other parts of the application
export default StudentProfile;