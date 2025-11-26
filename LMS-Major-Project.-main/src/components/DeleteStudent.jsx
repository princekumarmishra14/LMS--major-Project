// DeleteStudent component handles the deletion of a student from the list
function DeleteStudent({ student, students, setStudents, setSelectedStudent }) {
  // Function to handle the deletion logic
  function handleDelete() {
    // Create a new list excluding the student to be deleted
    const updatedList = students.filter((s) => s.id !== student.id);
    // Update the students state with the new list
    setStudents(updatedList);
    // Clear the selected student (if any)
    setSelectedStudent(null);
  }

  return (
    <div>
      {/* Button to trigger the delete action */}
      <button onClick={handleDelete} style={{ background: "red", color: "#fff" }}>
        Delete Student
      </button>
    </div>
  );
}

// Export the component for use in other parts of the application
export default DeleteStudent;