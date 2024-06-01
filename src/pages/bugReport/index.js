import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-modal';
import { DefaultContext } from '../../context/context_default';
import BugReportDB from '../../database/wrappers/bugReport';
import { useAlert } from 'react-alert'
import PestControlRoundedIcon from '@mui/icons-material/PestControlRounded';

// Defina o elemento do aplicativo para o React Modal
Modal.setAppElement('#root');

const BugReport = ({ visible }) => {
    const {
        globalFirestoreData,
        deslogar,
        is_descktop,
        switchModalBug
    } = useContext(DefaultContext);

    var alert = useAlert();
    const [title, setTitle] = useState('')
    const [descricao, setDescricao] = useState('')
    const [is_enviable, setIs_enviable] = useState(false)

    useEffect(() => {
        if (title !== '' && descricao !== '') {
            setIs_enviable(true);
        } else {
            setIs_enviable(false);
        }
    }, [title, descricao]);

    useEffect(() => {
        setDescricao('')
        setTitle('')
    }, [visible]);

    const send = () => {
        var data = {
            url: window.location.href,
            email: globalFirestoreData.useremail ? globalFirestoreData.useremail : null,
            userId: globalFirestoreData.userId ? globalFirestoreData.userId : null,
            title: title,
            descricao: descricao
        };
        // console.log(data);
        const bug = new BugReportDB();
        bug.create(data).then(e => {
            // console.log('success', e);
            alert.success('Reportado com sucesso');
        }).catch(err => {
            // console.log('Erro', err);
            alert.error('Algo deu errado!');
        });
        switchModalBug()
        // console.log(globalFirestoreData)
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(37, 49, 64, 0.8)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(37, 49, 64, 1)',
            padding: 0,
            width: '90%',
            maxWidth: 500
        }
    };

    return (
        <Modal
            isOpen={visible}
            onRequestClose={switchModalBug}
            style={customStyles}
        >
            <div className='bg-slate-500 flex flex-col max-w-xl w-full p-3'>
                <div className='flex justify-center mb-1 items-center'>
                    <div className='text-white font-bold text-lg flex-1 flex justify-start items-center'>
                        <PestControlRoundedIcon className="w-5 h-5 transition duration-75 text-white group-hover:text-white mr-1" />
                        Bug Report
                    </div>
                    <div onClick={switchModalBug} className='flex justify-center items-center rounded-full text-white bg-slate-600 hover:bg-slate-700 hover:border hover:border-gray-900 w-5 h-5 text-center pb-1 cursor-pointer'>x</div>
                </div>
                <div>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobre</label>
                        <input type="text" onChange={(event) => { setTitle(event.target.value) }} value={title} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />

                        <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Descrição</label>
                        <textarea rows="5" onChange={(event) => { setDescricao(event.target.value) }} value={descricao} id="descricao" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='flex justify-end mt-4 select-none'>
                        <div onClick={send} className={`${is_enviable ? "bg-orange-500 hover:bg-orange-400 cursor-pointer" : "bg-orange-300 opacity-50"} text-white rounded-md px-4 py-2`}>Enviar</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default BugReport;
