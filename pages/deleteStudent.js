import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { getDoc, setDoc } from 'firebase/firestore';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs} from 'firebase/firestore';
import { firebase, db } from '../firebase/clientApp';

const dbInstance = collection(db, 'students');

export default function DeleteStudent() {

  return (
    <div>
      Delete Student
    </div>
  )
}

