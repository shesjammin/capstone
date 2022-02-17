import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { getDoc, setDoc } from 'firebase/firestore';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs} from 'firebase/firestore';
import { firebase, db } from '../firebase/clientApp';

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
			{studentsArray.map((student) => {
				return(
				<div key={student.id}>
					<span>{student.firstName}</span>
					<span>{student.lastName}</span>
				</div>
				)
			})}
		</div>
  )
}
