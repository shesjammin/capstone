import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs} from 'firebase/firestore';
import { firebase, db } from '../firebase/clientApp';

import Link from 'next/link'
import Router from 'next/router';
import { useRouter } from 'next/router';

const dbInstance = collection(db, 'students');

export default function EditStudent() {
  const router = useRouter();
  const { query: {id}, } = router;
  const studentSchema = {
    active: true,
    studentId: '',
    duesPaid: 0,
    gpa: 0,
    year: 2022,
    orgName: '',
    firstName: '',
    lastName: '',
    tel: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    countryCode: 'USA'
  };
  const [student, setStudent] = useState(studentSchema);

  const getStudent = (id) => {
    if (id) {
      const singleStudent = doc(db, 'students', id);
      getDoc(singleStudent).then((studentRecord) => {
        setStudent({...studentRecord.data(), id: studentRecord.id});
      });
    }
  };

  const updateStudent = (field, data) => {
    if (field && student[field]) {
      student[field] = data;
      setStudent({...student});
    }
  };

  const saveStudent = async (event) => {
    event.preventDefault();
    const singleStudent = doc(db, 'students', id);
    Object.keys(studentSchema).forEach((key) => {
      if (event.target[key] && student.hasOwnProperty(key)) {
        updateStudent(key, event.target[key].value);
      }
    });
    updateDoc(singleStudent, student).then(() => {
      Router.push({pathname: "/student", query: {id: student.id}});
    });
  };

	useEffect(() => {
		getStudent(id);
	}, [router.query.id]);


  return (
    <div>
      <h2>Edit Student Record</h2>
      <div>
        <Link href="/students" passHref>
          <button>Return to Student List</button>
        </Link>
        <Link href={{pathname: "/student", query: {id: student.id}}} passHref>
          <button>View Student Record</button>
        </Link>
      </div>
      <form onSubmit={saveStudent}>
        <fieldset>
          <legend>Greek Status</legend>
          <div>
            <label>Active</label>
            <select id="active" name="active" value={student.active} onChange={(e) => updateStudent('active', e.target.value)} required>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div>
            <label>Org Name</label>
            <select id="orgName" name="orgName" value={student.orgName} onChange={(e) => updateStudent('orgName', e.target.value)} required>
              <option value="Delta Delta Delta">Delta Delta Delta</option>
              <option value="Delta Gamma">Delta Gamma</option>
              <option value="Gamma Sigma Theta">Delta Sigma Theta</option>
              <option value="Gamma Phi Beta">Gamma Phi Beta</option>
            </select>
          </div>
          <div>
            <label>Dues Paid</label>
            $<input id="duesPaid" type="number" name="duesPaid" value={student.duesPaid} onChange={(e) => updateStudent('duesPaid', e.target.value)} required />
          </div>
        </fieldset>
        <fieldset>
          <legend>Student Info</legend>
          <div>
            <label>First Name</label>
            <input id="firstName" type="text" name="firstName" value={student.firstName} onChange={(e) => updateStudent('firstName', e.target.value)} required />
          </div>
          <div>
            <label>Last Name</label>
            <input id="lastName" type="text" name="lastName" value={student.lastName} onChange={(e) => updateStudent('lastName', e.target.value)} required />
          </div>
          <div>
            <label>Student Id</label>
            <input id="studentId" type="number" name="studentId" value={student.studentId} onChange={(e) => updateStudent('studentId', e.target.value)} required />
          </div>
          <div>
            <label>Year</label>
            <input id="year" type="number" name="year" value={student.year} onChange={(e) => updateStudent('year', e.target.value)} required />
          </div>
          <div>
            <label>GPA</label>
            <input id="gpa" type="number" name="gpa" value={student.gpa} onChange={(e) => updateStudent('gpa', e.target.value)} required />
          </div>
        </fieldset>
        <fieldset>
          <legend>Student Contact</legend>
          <div>
            <label>Telephone</label>
            <input id="tel" type="tel" name="tel" value={student.tel} onChange={(e) => updateStudent('tel', e.target.value)}/>
          </div>
          <div>
            <label>Email</label>
            <input id="email" type="email" name="email" value={student.email} onChange={(e) => updateStudent('email', e.target.value)}/>
          </div>
          <div>
            <label>Address 1</label>
            <input id="address1" type="text" name="address1" value={student.address1} onChange={(e) => updateStudent('address1', e.target.value)}/>
          </div>
          <div>
            <label>Address 2</label>
            <input id="address2" type="text" name="address2" value={student.address2} onChange={(e) => updateStudent('address2', e.target.value)} />
          </div>
          <div>
            <label>City</label>
            <input id="city" type="text" name="city" value={student.city} onChange={(e) => updateStudent('city', e.target.value)} />
          </div>
          <div>
            <label>State</label>
            <input id="state" type="text" name="state" value={student.state} onChange={(e) => updateStudent('state', e.target.value)} />
          </div>
          <div>
            <label>Postal Code</label>
            <input id="postalCode" type="text" name="postalCode" value={student.postalCode} onChange={(e) => updateStudent('postalCode', e.target.value)} />
          </div>
          <div>
            <label>Country Code</label>
            <input id="countryCode" type="text" name="countryCode" value={student.countryCode} onChange={(e) => updateStudent('countryCode', e.target.value)} />
          </div>
        </fieldset>
        <button type="submit">Update Student</button>
      </form>
    </div>
  )
}
