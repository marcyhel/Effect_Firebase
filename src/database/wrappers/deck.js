import { FieldPath, getFirestore, collection, getDocs, query, where, and, or, QueryConstraint, getDoc, setDoc, DocumentReference, DocumentData, doc, Unsubscribe, onSnapshot, CollectionReference, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { FirebaseStorage, getStorage, ref, uploadBytes, StorageReference, deleteObjectref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
// import Command from '../entities/stores/command';
import GlocalFirestoreData from '../globalData';
import { auth, db } from "../../firebase";

class DeckDB {
    constructor() {
        this.collection = 'Decks';
    }

    // create(data) {
    //     // const uid = `${new Date().getTime()}${this.randomNumber(10, 99)}`
    //     console.log(`${this.collection}`)
    //     return setDoc(doc(db, `${this.collection}`, data.uid), { ...data, created_at: serverTimestamp() });
    //     // { ...data, created_at: serverTimestamp() })

    // }
    create(data) {
        // const uid = `${new Date().getTime()}${this.randomNumber(10, 99)}`
        console.log(`${this.collection}`)
        return addDoc(collection(db, `${this.collection}`),
            { ...data, created_at: serverTimestamp() })

    }
    generateUniqueFileName(file) {
        const timestamp = Date.now(); // Obtém um timestamp único
        const fileName = `${timestamp}_${file.name}`;
        return fileName;
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

    async update(id, data) {
        const deckRef = doc(db, this.collection, id);

        // Obtém o snapshot do documento
        const snapshot = await getDoc(deckRef);

        // Verifica se o documento existe antes de tentar atualizá-lo
        if (snapshot.exists()) {
            // Atualiza o documento no banco de dados
            await updateDoc(deckRef, {
                ...data,
                updated_at: serverTimestamp(),
            });
        } else {
            // Lidere com o caso em que o documento não existe
            console.error(`Documento com ID ${id} não existe.`);
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

export default DeckDB;