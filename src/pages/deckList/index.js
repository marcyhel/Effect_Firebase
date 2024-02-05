import React, { useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom";

import { DefaultContext } from '../../context/context_default';

import imgBG from "../../assets/imagens/bg_decklist.jpg";

import AddRoundedIcon from '@mui/icons-material/AddRounded';
const DeckList = () => {

    const {
        globalFirestoreData,

    } = useContext(DefaultContext);

    return (

        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-full w-full bg-cover bg-center flex justify-center md:justify-end items-cente overflow-hidden'>
            <div className={` bg-slate-700 bg-opacity-[94%] w-full h-full pt-20 transition-all p-4  `}>
                {globalFirestoreData.userId ?
                    <div className='grid'>
                        <Link to='/deck-build' className='flex justify-center items-center bg-slate-600 w-44 h-56 border border-slate-700 rounded-2xl shadow hover:bg-slate-500 cursor-pointer '>
                            <AddRoundedIcon className=" text-gray-20 scale-[2] "></AddRoundedIcon>
                        </Link>
                    </div>
                    :
                    <div>Precisa logar</div>
                }

            </div>

        </div>


    )
}

export default DeckList