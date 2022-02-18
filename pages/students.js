import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { getDoc, getDocs, setDoc } from 'firebase/firestore';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit} from 'firebase/firestore';
import { firebase, db } from '../firebase/clientApp';

import Link from 'next/link'

const dbInstance = collection(db, 'students');

export default function Students() {
	const [studentsArray, setStudentsArray] = useState([]);
	const getStudents = () => {
		getDocs(dbInstance).then((data) => {
			setStudentsArray(data.docs.map((item) => {
				return { ...item.data(), id: item.id }
			}));
		})
	};

	useEffect(() => {
		getStudents();
	}, []);

  return (
    <div>
      <h2>Student List</h2>
      <table border="1">
        <thead>
          <tr>
          <th></th>
          <th>Student Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Org Name</th>
          <th>Active</th>
          <th>Dues Paid</th>
          <th>GPA</th>
          <th>Year</th>
          <th>Telephone</th>
          <th>Email</th>
          </tr>
        </thead>
        <tbody>
			{studentsArray.map((student) => {
				return(
				<tr key={student.id}>
          <td><Link href={{pathname: "/student", query: {id: student.id}}} passHref><button>View</button></Link></td>
          <td>{student.studentId}</td>
					<td>{student.firstName}</td>
					<td>{student.lastName}</td>
          <td>{student.orgName}</td>
          <td>{student.active}</td>
          <td>{student.duesPaid}</td>
          <td>{student.gpa}</td>
          <td>{student.year}</td>
          <td>{student.tel}</td>
          <td>{student.email}</td>
				</tr>
				)
			})}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={11}>
              <Link href="/addStudent" passHref>
                <button style={{float: 'right'}}>Add Student</button>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
		</div>
  )
}
