// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsG7-rm1Tv4cJuDWRrpuSPoLN6Z-HgCsY",
    authDomain: "chat-app-6bb95.firebaseapp.com",
    databaseURL: "https://chat-app-6bb95-default-rtdb.firebaseio.com",
    projectId: "chat-app-6bb95",
    storageBucket: "chat-app-6bb95.appspot.com",
    messagingSenderId: "635307177541",
    appId: "1:635307177541:web:fc5956b3b778e172d2152c",
    measurementId: "G-8N2M1KZCBF"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});




const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();