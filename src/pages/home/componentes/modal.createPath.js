import React from 'react';

import Modal from 'react-modal';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth.hook';
import axiosInstanceFile from '../../../utils/axiosInstanceFile';


Modal.setAppElement('#root');

function ModalPath({ abrirModal, fecharModal, modalIsOpen, editModal, getPathInside }) {
    const [input, setInput] = useState("");
    const navigate = useNavigate()
    const { user, setUser } = useAuth();
    useEffect(() => {
        try {
            console.log("user", input)
            if (editModal.edit) {
                setInput(editModal.nome)
            } else {
                setInput("")
            }
        } catch (err) {
            console.log(err)
        }

    }, [modalIsOpen])

    const erro = (err) => { }
    const sendEditInput = () => {
        try {
            axiosInstanceFile.put("/path", {
                "id": editModal.id,
                "nome": input
            })
                .then((response) => {
                    console.log(response.data)
                    if (response.data[0] == 1) {
                        // navigate('/' + editModal.pathAtual.id)
                        getPathInside(editModal.pathAtual.id)
                        fecharModal()
                    }
                    else {
                        console.log("Não otualizado")
                    }
                })
                .catch((err) => {
                    if (err.response.status == 403) {
                        navigate('/login')
                        setUser(null)
                    }
                    console.error("ops! ocorreu um erro" + err);
                });
        } catch (err) {
            console.log(err)
        }
    }

    const sendCreateInput = () => {
        try {
            axiosInstanceFile.post("/path", {
                "nome": input,
                "dad": editModal.pathAtual.id,
                "user": user.id
            })
                .then((response) => {
                    console.log(response.data)

                    // navigate('/' + editModal.pathAtual.id)
                    getPathInside(editModal.pathAtual.id)
                    fecharModal()


                })
                .catch((err) => {
                    if (err.response.status == 403) {
                        navigate('/login')
                        setUser(null)
                    }
                    console.error("ops! ocorreu um erro" + err);
                });
        } catch (err) {
            console.log(err)
        }
    }
    // Código JSX necessário para criar uma modal simples que abre e fecha
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={fecharModal}
                contentLabel="Modal de exemplo"
                className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-10"

            >
                <div className='bg-white p-4 rounded shadow-lg flex flex-col w-80 text-gray-700'>
                    <div className='flex justify-between'><span>{editModal.edit ? 'Renomear' : 'Criar'} pasta</span></div>
                    <input value={input} onChange={(e) => [setInput(e.target.value), erro("")]} className='bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' ></input>
                    <div className='flex justify-end'>
                        <button onClick={fecharModal} className='hover:bg-blue-600 hover:bg-opacity-10  px-2 py-1 rounded-md mr-3'>Cancelar</button>
                        <button onClick={editModal.edit ? sendEditInput : sendCreateInput} className='hover:bg-blue-600 hover:bg-opacity-10  px-2 py-1 rounded-md'>Ok</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalPath;