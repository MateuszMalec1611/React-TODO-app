import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyBLRjBU0OPaWepx3Dugas22ZZUshPu_er4',
    authDomain: 'todo-app-83232.firebaseapp.com',
    databaseURL: 'https://todo-app-83232-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'todo-app-83232',
    storageBucket: 'todo-app-83232.appspot.com',
    messagingSenderId: '334706635139',
    appId: '1:334706635139:web:2cc520250c863ff12846b6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
