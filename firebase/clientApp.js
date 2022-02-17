import {initializeApp} from '@firebase/app';
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCv1iRxvTD1wTOtLt2ywawoqOyXBQgBGW0',
  authDomain: 'greek-life-sms.firebaseapp.com',
  projectId: 'greek-life-sms',
  storageBucket: 'greek-life-sms.appspot.com',
  messagingSenderId: '189468329603',
  appId: '1:189468329603:web:0b3de9090223666ce93db6',
  measurementId: 'G-F3ZQNEQJ66'
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
