// Importing useState hook from React to manage local component state
import { useState } from "react";

// UpdateStudent component allows editing and updating a student's standard and roll number
function UpdateStudent({ student, students, setStudents }) {
  // Initializing local state with current values of the selected student
  const [updated, setUpdated] = useState({
    standard: student.standard,
    roll: student.roll,
  });

  // Function to handle input changes and update the local state accordingly
  function handleChange(e) {
    const { name, value } = e.target;
    // Update only the changed field while preserving the rest
    setUpdated((prev) => ({ ...prev, [name]: value }));
  }

  // Function to apply the updates to the students list
  function handleUpdate() {
    // Create a new list with the updated student data
    const newList = students.map((s) =>
      s.id === student.id ? { ...s, ...updated } : s
    );
    // Update the students state with the modified list
    setStudents(newList);
    // Notify the user of successful update
    alert("Student updated successfully!");
  }

  return (
    <div>
      {/* Heading for the update section */}
      <h3>Update Student Info</h3>

      {/* Input field for updating standard */}
      <input
        type="text"
        name="standard"
        placeholder="New Standard"
        value={updated.standard}
        onChange={handleChange}
      />

      {/* Input field for updating roll number */}
      <input
        type="number"
        name="roll"
        placeholder="New Roll"
        value={updated.roll}
        onChange={handleChange}
      />

      {/* Button to trigger the update function */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

// Exporting the component for use in other parts of the application
export default UpdateStudent;