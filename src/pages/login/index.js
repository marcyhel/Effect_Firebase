import React, { useState, useEffect } from 'react'
import causa from "../../assets/imagens/beta_amanna_low70.jpg";
import causaMob from "../../assets/imagens/beta_amanna_mobile.jpg";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

import { useNavigate } from "react-router-dom";

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import { TailSpin } from 'react-loader-spinner'
const Login = () => {
    const navitage = useNavigate()
    const alert = useAlert()
    const [imgBG, setImgBG] = useState("../../assets/imagens/beta_amanna_low70.jpg")
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [load, setLoad] = useState(false);

    const emailChange = event => {
        setEmail(event.target.value);
    };
    const senhaChange = event => {
        setSenha(event.target.value);
    };
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Defina aqui a largura que define um dispositivo móvel
        const checkDeviceType = (e) => {
            if (e.matches) {
                setImgBG(causaMob); // É um celular
            } else {
                setImgBG(causa); // É um computador
            }
        };
        checkDeviceType(mediaQuery);
        mediaQuery.addListener(checkDeviceType);

        return () => {
            mediaQuery.removeListener(checkDeviceType);
        };
    }, []);


    async function realizarLogin() {
        // funcao para verificar se email ou senha sao vazios
        // if (verificaSeTemEntradaVazia(dados, setDados)) return
        setLoad(true)
        signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // dispatch({ type: "LOGIN", payload: user })
            setLoad(false)
            navitage("/")
        })
            .catch((error) => {
                console.log(error)
                alert.error('Email ou senha invalido!')
                setLoad(false)
            });


    }

    async function recuperaSenha() {
        setLoad(true)
        try {
            if (!email) {
                alert.info('Informe o email!')
                setLoad(false)
                return false;
            }
            await sendPasswordResetEmail(auth, email).then((res) => {
                console.log(res)
                setLoad(false)
                alert.success('Email de redefinição de senha enviado!')
            });
        } catch (err) {
            alert.error('Erro ao tentar emviar email de recuperação de senha')
        }
        setLoad(false)

    }

    return (
        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-screen w-screen bg-cover bg-center flex justify-center md:justify-end items-center  '>
            <Link to="/" className='bg-slate-600 shadow bg-opacity-25  backdrop-blur-lg  md:mr-28 mr-0 w-10 h-10 flex justify-center items-center rounded-full top-[5%]  left-[40px] absolute text-white hover:bg-opacity-50 cursor-pointer'>
                <ArrowBackIosNewRoundedIcon />
            </Link>
            <div className='w-5/6  max-w-[400px] max-h-[500px] min-h-min backdrop-blur-lg  bg-slate-600 bg-opacity-25 shadow-2xl rounded-lg  md:mr-28 mr-0 lg:mr-44 flex flex-col p-6'>

                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium  text-white">Email</label>
                    <input onChange={emailChange} value={email} disabled={load} type="text" id="first_name" className={`${load ? "opacity-50" : ""} border  text-sm rounded-lg   block w-full p-2.5 bg-gray-200 border-gray-300 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500`} placeholder="exemplo@gmail.com" required />
                </div>
                <div className='mb-4'>
                    <label className="block mb-2 text-sm font-medium  text-white">Senha</label>
                    <input onChange={senhaChange} value={senha} disabled={load} type="password" id="first_name" className={`${load ? "opacity-50" : ""} border   text-sm rounded-lg   block w-full p-2.5 bg-gray-200 border-gray-300 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500`} placeholder="" required />
                </div>
                <Link onClick={() => { recuperaSenha() }} className='hover:text-blue-500 text-white mb-11'>Esqueci a minha senha !</Link>
                <button onClick={load ? () => { } : () => { realizarLogin() }} disabled={load} className={`${load ? "bg-pink-500 hover:bg-pink-500" : "bg-pink-600 hover:bg-pink-700"} bg-pink-600 hover:bg-pink-700 py-2 rounded-xl text-white mb-4 flex justify-center items-center`}>
                    {load ? <TailSpin
                        height="24"
                        width="24"
                        color="#ffffff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /> : "Entrar"}

                </button>
                <div className='w-10 h-10'>


                </div>
                <Link to='/creat-acount' className='hover:text-blue-500 text-white'>Criar uma conta</Link>

            </div>



        </div>
    )
}

export default Login