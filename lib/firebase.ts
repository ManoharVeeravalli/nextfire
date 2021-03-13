import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCnCzg7GZPYPmP3ptoKXwuU0JWxsU8yo_k",
    authDomain: "nextfire-147.firebaseapp.com",
    projectId: "nextfire-147",
    storageBucket: "nextfire-147.appspot.com",
    messagingSenderId: "80523271115",
    appId: "1:80523271115:web:107c4880f58929d9de344e",
    measurementId: "G-TZXFE3EZCT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username: string) {
    const userRef = firestore.collection('users');
    const query = userRef.where('username', '==', username).limit(1)
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}


/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    };
}


