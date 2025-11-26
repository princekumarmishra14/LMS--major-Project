import { useState } from "react";
import StudentRegistration from "./components/StudentRegistration";
import StudentList from "./components/StudentList";
import StudentProfile from "./components/StudentProfile";
import DeleteStudent from "./components/DeleteStudent";
import UpdateStudent from "./components/UpdateStudent";
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';

function App() {
  // Main student list state
  const [students, setStudents] = useState([]);

  // To show selected student for profile/update/delete
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    
    <div>
      <div style={{ margin: "30px", fontFamily: "Arial" }}>
      <h1>Student Management App</h1>

      Registration Component
      <Router>
        <div>
      <ul style={{listStyleType:"none",backgroundColor:"blue",width:"100%",float:"left"}}>
        <li style={{float:"left",backgroundColor:"blue",padding:"10px 20px"}}><Link to="/" style={{textDecoration:"none",color:"white"}}>Student Registration</Link></li>
        <li style={{float:"left",backgroundColor:"blue",padding:"10px 20px"}}><Link to="/stdlist" style={{textDecoration:"none",color:"white"}}>Student List</Link></li>
        <li style={{float:"left",backgroundColor:"blue",padding:"10px 20px"}}><Link to="/profile" style={{textDecoration:"none",color:"white"}}>Student Profile</Link></li>
      </ul>
      </div>
      <br/>

        <Routes>
          <Route path="/" element={<StudentRegistration  students={students} setStudents={setStudents}/>}/>
          <Route path="/stdlist" element={<StudentList students={students}
        setSelectedStudent={setSelectedStudent}/>}/>
          <Route path="/profile" element={selectedStudent && <StudentProfile student={selectedStudent} />}/>
        </Routes>
      
      </Router>

      <hr />

      {/* Update Student */}
      {selectedStudent && (
        <UpdateStudent
          student={selectedStudent}
          students={students}
          setStudents={setStudents}
        />
      )}

      {/* Delete Student */}
      {selectedStudent && (
        <DeleteStudent
          student={selectedStudent}
          students={students}
          setStudents={setStudents}
          setSelectedStudent={setSelectedStudent}
        />
      )}
    </div>
    </div>
    
  );
}

export default App;
