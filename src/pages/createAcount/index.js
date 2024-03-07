import React, { useState, useEffect } from 'react'
import vincent from "../../assets/imagens/vincent_low70.jpg";
import vincentMob from "../../assets/imagens/vincentMob.jpg";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserDb from '../../database/wrappers/user';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

import { TailSpin } from 'react-loader-spinner'
const CreatAcount = () => {
    const navigate = useNavigate()
    const alert = useAlert()
    const [imgBG, setImgBG] = useState("../../assets/imagens/beta_amanna.jpg")
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [load, setLoad] = useState(false);

    const emailChange = event => {
        setEmail(event.target.value);
    };
    const senhaChange = event => {
        setSenha(event.target.value);
    };
    const nomeChange = event => {
        setNome(event.target.value);
    };
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Defina aqui a largura que define um dispositivo móvel
        const checkDeviceType = (e) => {
            if (e.matches) {
                setImgBG(vincentMob); // É um celular
            } else {
                setImgBG(vincent); // É um computador
            }
        };
        checkDeviceType(mediaQuery);
        mediaQuery.addListener(checkDeviceType);

        return () => {
            mediaQuery.removeListener(checkDeviceType);
        };
    }, []);



    async function criaUser() {
        // funcao para verificar se email ou senha sao vazios
        // if (verificaSeTemEntradaVazia(dados, setDados)) return
        setLoad(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            // Adicionando informações do usuário à coleção "Users"
            const userDB = new UserDb()
            await userDB.create({
                uid: user.uid,
                nome: nome,
                role: "user",
                email: email,
            })
            // await addDoc(collection(db, "Users"), );

            setLoad(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            alert.error('Email ou senha inválido!');
            setLoad(false);
        }


    }


    return (
        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-screen w-screen bg-cover bg-center flex justify-center md:justify-end items-center  '>

            <div className='w-5/6  max-w-[400px] max-h-[500px] min-h-min backdrop-blur-lg  bg-slate-600 bg-opacity-25 shadow-2xl rounded-lg  md:mr-28 mr-0 lg:mr-44 flex flex-col p-6'>
                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium  text-white">Nome</label>
                    <input onChange={nomeChange} value={nome} type="text" id="first_name" className="border  text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="João" required />
                </div>
                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium  text-white">Email</label>
                    <input onChange={emailChange} value={email} type="text" id="first_name" className="border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="exemplo@gmail.com" required />
                </div>
                <div className='mb-4'>
                    <label className="block mb-2 text-sm font-medium  text-white">Senha</label>
                    <input onChange={senhaChange} value={senha} type="password" id="first_name" className="border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                </div>

                <button onClick={() => { criaUser() }} disabled={load} className={`${load ? "" : "hover:bg-green-900"} bg-green-800  py-2 rounded-xl text-white mt-10 flex justify-center items-center`}>
                    {load ? <TailSpin
                        height="24"
                        width="24"
                        color="#ffffff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /> : "Criar conta"}

                </button>


            </div>



        </div>
    )

}

export default CreatAcount