import { getFirestore, collection, getDocs, query, where, QueryConstraint, getDoc, setDoc, DocumentReference, DocumentData, doc, Unsubscribe, onSnapshot, CollectionReference, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { FirebaseStorage, getStorage, ref, uploadBytes, getDownloadURL, StorageReference, deleteObject } from "firebase/storage";
// import Command from '../entities/stores/command';
import GlocalFirestoreData from '../globalData';
import { auth, db } from "../../firebase";

class FortunasDB {
    constructor() {
        this.collection = 'Fortunas';
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

export default FortunasDB;