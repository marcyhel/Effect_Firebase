import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { DefaultContext } from '../context/context_default';
import { Dropdown } from 'rsuite';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AdsComponent from '../pages/componentes/adsense';

import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GridViewIcon from '@mui/icons-material/GridView';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Groups2Icon from '@mui/icons-material/Groups2';
import PestControlRoundedIcon from '@mui/icons-material/PestControlRounded';
// import useAuth from '../hooks/useAuth.hook';


const NavBar = (props) => {
    const {
        globalFirestoreData,
        deslogar,
        is_descktop,
        switchModalBug
    } = useContext(DefaultContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!is_descktop) {
            setIsOpen(false); // É um celular
        } else {
            setIsOpen(true); // É um computador
        }
    }, [is_descktop])


    // const { signout } = useAuth();
    return (
        <div>


            <nav className="fixed top-0 z-50 w-full bg-gray-800 border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={toggleDrawer} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm  rounded-lg sm:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link to="/" className="flex ms-2 md:me-24">
                                <img src={require("../assets/imagens/logo_lazy.png")} className="h-9 me-3" alt="Effect Logo" />
                                <h1 className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">{is_descktop ? 'Effect: Conflicting Causes' : 'Effect'}</h1>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>

                                    <Button
                                        id="basic-button"
                                        size="small"
                                        fullWidth={false}
                                        // aria-controls={open ? 'basic-menu' : undefined}
                                        variant={'text'}
                                        // aria-expanded={open ? 'true' : undefined}
                                        onClick={globalFirestoreData.userName ? handleClick : () => { }}
                                        x={{ ml: 2 }}
                                    >
                                        {globalFirestoreData.userName ? (
                                            <div className="flex justify-center items-center" >
                                                <div className="text-white pr-4">{globalFirestoreData.userName}</div>
                                                <img className="w-8 h-8 rounded-full" src={require("../assets/imagens/profile.png")} alt="user photo" />
                                            </div>
                                        ) : (
                                            <Link to='/login'><div className='text-white'>Login </div></Link>
                                        )}

                                    </Button>
                                    <Menu

                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem className='bg-slate-500' onClick={() => { deslogar(); handleClose(); }}>Sair</MenuItem>


                                    </Menu>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </nav >

            <aside id="closeDrawer" aria-label="Sidebar" aria-hidden="true" className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 z-40 w-56 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700`}>
                <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto justify-between  bg-gray-800">
                    <ul className="space-y-2 font-medium ">
                        <li>
                            <Link to="/list" onClick={() => { setIsOpen(false) }} className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group">
                                {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg> */}
                                <GridViewIcon className="w-5 h-5 transition duration-75 text-gray-400  group-hover:text-white"></GridViewIcon>
                                <span className="ms-3">Lista de Cards</span>
                            </Link>
                        </li>
                        {globalFirestoreData.role == "admin" ?
                            <li>
                                <Link to="/up-card" onClick={() => { setIsOpen(false) }} className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700  group">
                                    {/* <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                 <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                             </svg> */}
                                    <CloudUploadIcon className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"></CloudUploadIcon>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Upload Cards</span>
                                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium  rounded-full bg-gray-700 text-gray-300">Adm</span>
                                </Link>
                            </li>
                            : null}

                        <li>
                            <Link to="/deck-communit" onClick={() => { setIsOpen(false) }} className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group">
                                {/* <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg> */}
                                <Groups2Icon className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"></Groups2Icon>
                                <span className="flex-1 ms-3 whitespace-nowrap">Decks da galera</span>
                                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/deck-list" onClick={() => { setIsOpen(false) }} className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Meus decks</span>
                            </Link>
                        </li>







                        {/* <li>
                            <Link to="/login" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
                            </Link>
                        </li> */}
                        {/* <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                            </a>
                        </li> */}


                    </ul>
                    <div className='mb-5'>
                        <a href="#" onClick={() => { switchModalBug(); setIsOpen(false) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <PestControlRoundedIcon className="flex-shrink-0 w-6 h-6  transition duration-75 text-gray-400  group-hover:text-white"></PestControlRoundedIcon>
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Bug Report</span>
                        </a>
                        <span className='ml-3 text-slate-500 '>v 0.1.0</span>
                    </div>
                </div>
            </aside>
            <aside aria-label="Sidebar" onClick={toggleDrawer} aria-hidden="true" className={`sm:hidden block ${isOpen ? 'translate-x-0 left-56' : '-translate-x-full'} transition-transform  bg-opacity-25 backdrop-blur-sm fixed top-0 left-0 z-40 w-full h-screen`}></aside>

            <div className="sm:ml-56 bg-slate-700 flex-1 h-screen text-white  overflow-y-auto">
                {props.children}

            </div>

        </div >

    )
}

export default NavBar