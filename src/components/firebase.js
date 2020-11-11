import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCW8bXPvOPugNknm9w3YHIUwxolM_FzBrc",
    authDomain: "crud-udemy-6a72a.firebaseapp.com",
    databaseURL: "https://crud-udemy-6a72a.firebaseio.com",
    projectId: "crud-udemy-6a72a",
    storageBucket: "crud-udemy-6a72a.appspot.com",
    messagingSenderId: "65880371840",
    appId: "1:65880371840:web:c7cf7848030a0ad889ac65"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()

  export {db, auth}