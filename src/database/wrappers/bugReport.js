import { FieldPath, getFirestore, collection, getDocs, query, where, and, or, QueryConstraint, getDoc, setDoc, DocumentReference, DocumentData, doc, Unsubscribe, onSnapshot, CollectionReference, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { FirebaseStorage, getStorage, ref, uploadBytes, StorageReference, deleteObjectref, deleteObject, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
// import Command from '../entities/stores/command';
import GlocalFirestoreData from '../globalData';
import { auth, db } from "../../firebase";

class BugReportDB {
    constructor() {
        this.collection = 'BugReport';
    }


    create(data) {
        return addDoc(collection(db, `${this.collection}`),
            { ...data, created_at: serverTimestamp() })

    }
    async get(id) {
        const snapshot = await getDoc(doc(db, `${this.collection}`, id))

        console.log("snap", snapshot)

        if (!snapshot.exists || !snapshot.data()) return null;

        return {
            id: snapshot.id,
            ...snapshot.data(),
        }
    }
    async getAll(params = {}) {
        const { field, operator, value } = params;

        let collectionRef = collection(db, this.collection);

        // Verifica se há parâmetros de filtro
        if (field && operator && value) {
            collectionRef = query(collectionRef, where(field, operator, value));
        }

        const querySnapshot = await getDocs(collectionRef);

        const datas = [];
        querySnapshot.forEach(doc => datas.push({ id: doc.id, ...doc.data() }));
        return datas;
    }
}
export default BugReportDB;