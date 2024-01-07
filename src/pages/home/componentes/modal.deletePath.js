import React from 'react';

import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth.hook';
import axiosInstanceFile from '../../../utils/axiosInstanceFile';


Modal.setAppElement('#root');

function ModalDeletPath({ abrirModal, fecharModal, modalIsOpen, editModal, getPathInside }) {

    const navigate = useNavigate()
    const { setUser } = useAuth();
    const [force, setForce] = useState(editModal.force);
    useEffect(() => {
        try {


            setForce(false)

        } catch (err) {
            console.log(err)
        }

    }, [editModal])
    const sendDeletedInputForce = () => {

    }
    const sendDeletedInput = () => {
        try {
            console.log("delete modal", editModal)
            axiosInstanceFile.delete("/path", {
                data: {
                    id: editModal.id,
                    force: force
                }

            })
                .then((response) => {
                    console.log(response.data)
                    if (response.data.response == "ok") {
                        // navigate('/' + editModal.pathAtual.id)
                        getPathInside(editModal.pathAtual.id)
                        fecharModal()
                    }
                    else {
                        console.log("Não otualizado")
                        setForce(true)
                    }
                })
                .catch((err) => {
                    if (err.response.status === 403) {
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
                    <div className='flex justify-between'><span>{force ? "Existem pastas e arquivos que serão apagadas. Tem certeza que deseja excluir a pasta ?" : " Tem certeza que deseja excluir a pasta ?"}</span></div>
                    <div className='flex justify-end'>
                        <button onClick={fecharModal} className='hover:bg-blue-600 hover:bg-opacity-10  px-2 py-1 rounded-md mr-3'>Cancelar</button>
                        <button onClick={sendDeletedInput} className='hover:bg-blue-600 hover:bg-opacity-10  px-2 py-1 rounded-md'>Ok</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalDeletPath;