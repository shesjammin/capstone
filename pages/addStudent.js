import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { addDoc, getDoc, setDoc } from 'firebase/firestore';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs} from 'firebase/firestore';
import { firebase, db } from '../firebase/clientApp';

import Link from 'next/link'
import Router from 'next/router';

const dbInstance = collection(db, 'students');

export default function AddStudent() {
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

  const saveStudent = async (event) => {
    event.preventDefault();
    Object.keys(studentSchema).forEach((key) => {
      if (event.target[key] && student.hasOwnProperty(key)) {
        student[key] = event.target[key].value;
      }
    });
    addDoc(dbInstance, student).then(() => {
      Router.push('/students');
    });
  };

  const updateStudent = (key, data) => {
    if (key && student.hasOwnProperty(key)) {
      student[key] = data;
      setStudent({...student});
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <div style={{float: 'right'}}>
        <Link href="/" passHref><a>Logout</a></Link>
      </div>
      <form onSubmit={saveStudent}>
        <fieldset>
          <legend>Greek Status</legend>
          <div>
            <label>Active</label>
            <select id="active" name="active" defaultValue={student.active} onChange={(e) => updateStudent('active', e.target.value)} required>
              <option defaultValue={true}>True</option>
              <option defaultValue={false}>False</option>
            </select>
          </div>
          <div>
            <label>Org Name</label>
            <select id="orgName" name="orgName" defaultValue={student.orgName} onChange={(e) => updateStudent('orgName', e.target.value)} required>
              <option defaultValue="Delta Delta Delta">Delta Delta Delta</option>
              <option defaultValue="Delta Gamma">Delta Gamma</option>
              <option defaultValue="Gamma Sigma Theta">Delta Sigma Theta</option>
              <option defaultValue="Gamma Phi Beta">Gamma Phi Beta</option>
            </select>
          </div>
          <div>
            <label>Dues Paid</label>
            $<input id="duesPaid" type="number" name="duesPaid" defaultValue={student.duesPaid} onChange={(e) => updateStudent('duesPaid', e.target.value)} required />
          </div>
        </fieldset>
        <fieldset>
          <legend>Student Info</legend>
          <div>
            <label>First Name</label>
            <input id="firstName" type="text" name="firstName" defaultValue={student.firstName} onChange={(e) => updateStudent('firstName', e.target.value)} required />
          </div>
          <div>
            <label>Last Name</label>
            <input id="lastName" type="text" name="lastName" defaultValue={student.lastName} onChange={(e) => updateStudent('lastName', e.target.value)} required />
          </div>
          <div>
            <label>Student Id</label>
            <input id="studentId" type="text" name="studentId" defaultValue={student.studentId} onChange={(e) => updateStudent('studentId', e.target.value)} required />
          </div>
          <div>
            <label>Year</label>
            <input id="year" type="text" name="year" defaultValue={student.year} onChange={(e) => updateStudent('year', e.target.value)} required />
          </div>
          <div>
            <label>GPA</label>
            <input id="gpa" type="text" name="gpa" defaultValue={student.gpa} onChange={(e) => updateStudent('gpa', e.target.value)} required />
          </div>
        </fieldset>
        <fieldset>
          <legend>Student Contact</legend>
          <div>
            <label>Telephone</label>
            <input id="tel" type="tel" name="tel" defaultValue={student.tel} onChange={(e) => updateStudent('tel', e.target.value)}/>
          </div>
          <div>
            <label>Email</label>
            <input id="email" type="email" name="email" defaultValue={student.email} onChange={(e) => updateStudent('email', e.target.value)}/>
          </div>
          <div>
            <label>Address 1</label>
            <input id="address1" type="text" name="address1" defaultValue={student.address1} onChange={(e) => updateStudent('address1', e.target.value)}/>
          </div>
          <div>
            <label>Address 2</label>
            <input id="address2" type="text" name="address2" defaultValue={student.address2} onChange={(e) => updateStudent('address2', e.target.value)}/>
          </div>
          <div>
            <label>City</label>
            <input id="city" type="text" name="city" defaultValue={student.city} onChange={(e) => updateStudent('city', e.target.value)}/>
          </div>
          <div>
            <label>State</label>
            <input id="state" type="text" name="state" defaultValue={student.state} onChange={(e) => updateStudent('state', e.target.value)}/>
          </div>
          <div>
            <label>Postal Code</label>
            <input id="postalCode" type="text" name="postalCode" defaultValue={student.postalCode} onChange={(e) => updateStudent('postalCode', e.target.value)}/>
          </div>
          <div>
            <label>Country Code</label>
            <input id="countryCode" type="text" name="countryCode" defaultValue={student.countryCode} onChange={(e) => updateStudent('countryCode', e.target.value)}/>
          </div>
        </fieldset>
        <button type="submit">Add Student</button>
      </form>
    </div>
  )
}
