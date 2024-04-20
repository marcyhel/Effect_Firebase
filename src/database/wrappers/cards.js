import { FieldPath, getFirestore, collection, getDocs, query, where, and, or, QueryConstraint, getDoc, setDoc, DocumentReference, DocumentData, doc, Unsubscribe, onSnapshot, CollectionReference, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { FirebaseStorage, getStorage, ref, uploadBytes, StorageReference, deleteObjectref, deleteObject, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
// import Command from '../entities/stores/command';
import GlocalFirestoreData from '../globalData';
import { auth, db } from "../../firebase";

class CardDB {
    constructor() {
        this.collection = 'Cards';
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

    async update(id, data) {

        const docRef = doc(db, this.collection, id);

        return updateDoc(docRef, {
            ...data,
            updated_at: serverTimestamp()
        });
    }

    async deleteFile(url) {
        try {
            // Obtém a referência do arquivo no Firebase Storage
            const fileRef = ref(storage, url);

            // Deleta o arquivo do Firebase Storage
            await deleteObject(fileRef);

            // Retorna true para indicar que o arquivo foi excluído com sucesso
            return true;
        } catch (error) {
            // Em caso de erro, você pode tratar aqui ou apenas retornar false
            console.error("Erro ao excluir o arquivo:", error);
            return false;
        }
    }
    generateUniqueFileName(file) {
        const timestamp = Date.now(); // Obtém um timestamp único
        const fileName = `${timestamp}_${file.name}`;
        return fileName;
    }
    async uploadFile(img) {
        if (!img) return;

        const newFileName = this.generateUniqueFileName(img); // Obtém um novo nome de arquivo único
        const storageRef = ref(storage, `images/${newFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // Se necessário, você pode realizar ações com o progresso aqui
                },
                (error) => {
                    reject(error); // Rejeita a Promise em caso de erro
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL); // Resolve a Promise com a URL de download
                        })
                        .catch((error) => {
                            reject(error); // Rejeita a Promise em caso de erro ao obter a URL
                        });
                }
            );
        });
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

export default CardDB;