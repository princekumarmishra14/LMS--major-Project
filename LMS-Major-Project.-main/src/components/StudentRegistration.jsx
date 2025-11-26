// Importing useState hook from React to manage component state
import { useState } from "react";

// StudentRegistration component allows users to input and register a new student
function StudentRegistration({ students, setStudents }) {
  // Initializing form state with empty fields for student details
  const [form, setForm] = useState({
    id: "",
    stdname: "",
    standard: "",
    age: "",
    roll: "",
  });

  // Function to handle input changes and update corresponding field in form state
  function handleChange(e) {
    const { name, value } = e.target;
    // Using spread operator to preserve existing state and update only the changed field
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevents default form submission behavior (page reload)

    // Basic validation: ensure required fields are filled
    if (!form.id || !form.stdname) {
      alert("Please fill all required fields!");
      return;
    }

    // Add the new student to the existing students list
    setStudents([...students, form]);

    // Reset the form fields after successful submission
    setForm({ id: "", stdname: "", standard: "", age: "", roll: "" });
  }

  return (
    <div>
      {/* Heading for the registration form */}
      <h2>Register New Student</h2>

      {/* Form element with onSubmit handler */}
      <form onSubmit={handleSubmit}>
        {/* Input field for Student ID */}
        <label htmlFor="id">Student ID:</label>
        <input
          type="text"
          name="id"
          placeholder="Student ID"
          value={form.id}
          onChange={handleChange}
        />
        <br />

        {/* Input field for Student Name */}
        <label htmlFor="id">Student Name:</label>
        <input
          type="text"
          name="stdname"
          placeholder="Student Name"
          value={form.stdname}
          onChange={handleChange}
        />
        <br />

        {/* Input field for Student Standard */}
        <label htmlFor="id">Student Standard:</label>
        <input
          type="text"
          name="standard"
          placeholder="Standard"
          value={form.standard}
          onChange={handleChange}
        />
        <br />

        {/* Input field for Student Age */}
        <label htmlFor="id">Student Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <br />

        {/* Input field for Student Roll Number */}
        <label htmlFor="id">Student Roll no.:</label>
        <input
          type="number"
          name="roll"
          placeholder="Roll Number"
          value={form.roll}
          onChange={handleChange}
        />
        <br />

        {/* Submit button to add student */}
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

// Exporting the component for use in other parts of the application
export default StudentRegistration;