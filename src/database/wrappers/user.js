import { getFirestore, collection, getDocs, query, QueryConstraint, getDoc, setDoc, DocumentReference, DocumentData, doc, Unsubscribe, onSnapshot, CollectionReference, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { FirebaseStorage, getStorage, ref, uploadBytes, getDownloadURL, StorageReference, deleteObject } from "firebase/storage";
// import Command from '../entities/stores/command';
import GlocalFirestoreData from '../globalData';
import { auth, db } from "../../firebase";

class UserDb {
    constructor() {
        this.collection = 'Users';
    }



    create(data) {
        // const uid = `${new Date().getTime()}${this.randomNumber(10, 99)}`
        console.log(`${this.collection}`)
        return setDoc(doc(db, `${this.collection}`, data.uid), { ...data, created_at: serverTimestamp() });
        // { ...data, created_at: serverTimestamp() })

    }
    // create(data) {
    //     // const uid = `${new Date().getTime()}${this.randomNumber(10, 99)}`
    //     console.log(`${this.collection}`)
    //     return addDoc(collection(db, `${this.collection}`),
    //         { ...data, created_at: serverTimestamp() })

    // }

    async get(id) {
        const snapshot = await getDoc(doc(db, `${this.collection}`, id))

        console.log("snap", snapshot)

        if (!snapshot.exists || !snapshot.data()) return null;

        return {
            id: snapshot.id,
            ...snapshot.data(),
        }
    }

    // async getByCpf(cpf) {
    //     const snapshot = await firestore()
    //         .collection(`Establishments/${GlocalFirestoreData.establishmentId}/${this.collection}`)
    //         .where('cpf', '==', cpf)
    //         .orderBy('created_at', 'desc')
    //         .limit(1)
    //         .get();

    //     if (snapshot.empty)
    //         return null;

    //     const doc = snapshot.docs[0];
    //     return {
    //         id: doc.id,
    //         ...doc.data(),
    //     }
    // }

    // async getByIdCard(idCard) {
    //     const nfcCommand = await new NfcToCommandDB().get(idCard);
    //     if (!nfcCommand) return null;
    //     return this.get(nfcCommand.commandId);
    // }

    // async update(id, data) {

    //     return await firestore()
    //         .collection(`Establishments/${GlocalFirestoreData.establishmentId}/${this.collection}`)
    //         .doc(id)
    //         .update({
    //             ...data,
    //             last_transfer: firestore.FieldValue.serverTimestamp()
    //         })
    // }

    // randomNumber(min, max) {
    //     return Math.floor(Math.random() * (max - min)) + min;
    // }

}

export default UserDb;