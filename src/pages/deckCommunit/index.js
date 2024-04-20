import React, { useEffect, useContext, useState, useRef } from 'react'
import { Link } from "react-router-dom";

import { DefaultContext } from '../../context/context_default';

import ItemListDeck from '../deckList/componente/itemListDeck';
import ItemListDeckBuild from '../deckBuild/componente/itemList';
import GraficoBarras from "../deckBuild/componente/grafico_barras"

import imgBG from "../../assets/imagens/communit-155.jpg";
import imgPrimura from "../../assets/imagens/primura-face-60.png";
import imgEnneda from "../../assets/imagens/enneda-face-80.png";

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDeckCommunit } from './hook';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const DeckCommunit = () => {

    const {
        listDecksUser,
        deckSelect,
        setDeckSelect,
        changeDeck,
        isOpenDeck,
        toggleDrawerDeck,
        estiloCard,
        NextPlan,
        snapSize,
        handleInputChange,
        toggleDrawerFilter,
        isOpenFilter
    } = useDeckCommunit();
    const {
        globalFirestoreData,
        listCardDeck,
        showListCards,
        showCardFlutuante,
        is_descktop,
        setDeck_tu_edit,
        conta_cartas_lsit,
        setShowCardFlutuante
    } = useContext(DefaultContext);
    const divider = () => { return (<div className='flex-1 border-b border-slate-600 h-0'></div>) }



    useEffect(() => {
        console.log(deckSelect, 'd')
    }, [deckSelect])


    const estiloDoComponente = {
        WebkitFilter: 'drop-shadow(0px 0px 4px #0f0f0f)',
        filter: 'drop-shadow(0px 0px 4px #0f0f0f)',
    };

    const estiloDoComponenteImg = {
        WebkitFilter: 'drop-shadow(0px 0px 2px #000000)',
        filter: 'drop-shadow(0px 0px 2px #000000)',
    };

    const handleNavigateExternal = (id) => {
        const currentURL = window.location.href;
        window.open(currentURL.split("/")[0] + "/detail/" + id, '_blank');
    };
    useEffect(() => {
        if (!isOpenDeck) {
            setShowCardFlutuante(false);
        }
    }, [isOpenDeck])

    useEffect(() => {

    }, [])

    return (
        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-full w-full bg-cover bg-center flex justify-center md:justify-end items-cente overflow-hidden'>
            <div className={`${isOpenDeck || isOpenFilter ? 'md:mr-[320px] duration-200' : 'mr-0 duration-200'} bg-slate-700 bg-opacity-[94%] w-full h-full pt-16 transition-all  `}>

                <div id='lista' className='bg-gradient-to-b from-transparent via-transparent to-slate-900 w-full h-full p-4 overflow-y-auto  scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm '>
                    <div className='flex space-x-2 mb-2 items-end'>

                        <div className='flex-1 flex  lg:space-x-2 lg:flex-row flex-col  lg:items-center justify-start '>
                            <span className='min-w-fit text-2xl font-bold'>Galeria de Decks</span>
                            {/* <div class="relative w-full">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <SearchRoundedIcon></SearchRoundedIcon>
                                </div>
                                <input type="text" id="simple-search" onChange={handleInputChange} class="border   text-sm rounded-lg block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Procure pelo nome de algum deck..." required />
                            </div> */}

                        </div>
                        {/* <div className='p-4 bg-slate-500 hover:bg-slate-400 text-right w-10 h-10 flex justify-center items-center cursor-pointer rounded' onClick={() => { }}>{zoom ? <ZoomOutIcon></ZoomOutIcon> : <ZoomInIcon></ZoomInIcon>}</div> */}
                        {/* <div className='p-4 bg-slate-500 hover:bg-slate-400 text-right w-10 h-10 flex justify-center items-center cursor-pointer rounded' onClick={() => { toggleDrawerFilter(!isOpenFilter) }}><FilterAltRoundedIcon></FilterAltRoundedIcon></div> */}
                    </div>


                    <div className='flex flex-wrap  space-x-2 space-y-2'>
                        <div className={`${showCardFlutuante && is_descktop ? "" : "hidden"} w-40 h-56  right-80 mr-2 absolute z-40`} style={estiloCard}>
                            <img className=' w-full h-full object-contain' style={estiloDoComponente} src={showCardFlutuante?.url_img} loading="lazy" ></img>
                        </div>

                        {/* <Link to='/deck-build' className=' bg-slate-600 md:w-44 md:h-56 w-36 h-48 border border-slate-700 rounded-2xl shadow hover:bg-slate-500 cursor-pointer p-1 mt-[8px] ml-[8px] '>
                            <div className='flex justify-center items-center w-full h-full border rounded-xl border-slate-400 border-opacity-50'>
                                <AddRoundedIcon className=" text-gray-20 scale-[2] "></AddRoundedIcon>
                            </div>


                        </Link> */}

                        {listDecksUser ? listDecksUser.map(item => { return <div onClick={() => { toggleDrawerDeck(true); changeDeck(item) }}><ItemListDeck deck={item} profile={true}></ItemListDeck> </div> }) : null}
                        <div className='w-full flex justify-center' >{snapSize > listDecksUser.length ? <div className='cursor-pointer border border-slate-500 hover:bg-slate-400 px-4 py-2 rounded' onClick={NextPlan}>Carregar mais</div> : null}</div>

                        {/* <aside className={`${isOpenFilter ? 'translate-x-0 duration-200' : ' duration-300 translate-x-full '} overflow-x-visible bg-slate-700  pt-16 transition-transform  fixed top-0 right-0 z-30 w-80 h-screen shadow-lg flex flex-col p-3 border-l border-slate-600 border-opacity-60`}>


                            <div className='flex flex-col justify-start overflow-y-auto  scrollbar-thin overflow-x-hidden scrollbar-thumb-slate-600  scrollbar-rounded-sm pr-2 h-full pt-4'>
                                <div className='flex justify-between w-full mb-4'>
                                    <div className='flex items-center '  >


                                        <span className='cursor-pointer'>Filtro</span>



                                    </div>

                                    <div className='rounded-full w-7 h-7 flex justify-center items-center bg-slate-600 hover:bg-opacity-75 cursor-pointer' onClick={() => { toggleDrawerFilter(false) }}><CloseRoundedIcon></CloseRoundedIcon>
                                    </div>

                                </div>




                            </div>
                        </aside> */}
                        <aside className={`${isOpenDeck ? 'translate-x-0 duration-200' : ' duration-300 translate-x-full '} overflow-x-visible bg-slate-700  pt-16 transition-transform  fixed top-0 right-0 z-30 w-80 h-screen shadow-lg flex flex-col p-3 border-l border-slate-600 border-opacity-60`}>

                            {deckSelect ?
                                <div className='flex flex-col justify-start overflow-y-auto  scrollbar-thin overflow-x-hidden scrollbar-thumb-slate-600  scrollbar-rounded-sm pr-2 h-full pt-4'>
                                    <div className='flex justify-between w-full mb-4'>
                                        <div className='flex items-center '  >


                                            <span className='cursor-pointer'>{deckSelect.nome}</span>



                                        </div>

                                        <div className='rounded-full w-7 h-7 flex justify-center items-center bg-slate-600 hover:bg-opacity-75 cursor-pointer' onClick={() => { toggleDrawerDeck(false) }}><CloseRoundedIcon></CloseRoundedIcon>
                                        </div>

                                    </div>

                                    <div className='flex items-center justify-around space-x-3 my-2 mt-4 rounded-md border border-slate-800 bg-slate-800 bg-opacity-50 p-1'>
                                        <div className='text-2xl text-slate-300 flex flex-col items-center'><div className='text-sm'>Arvore</div><div>
                                            {conta_cartas_lsit(deckSelect.arvore)}/
                                            {conta_cartas_lsit(deckSelect.arvore) > 40 ? '50' : conta_cartas_lsit(deckSelect.arvore) > 30 ? '40' : '30'}
                                        </div></div>
                                        <div className='text-2xl text-slate-300 flex flex-col items-center'><div className='text-sm'>Matriz</div><div>
                                            {conta_cartas_lsit(deckSelect.matriz)}/
                                            {conta_cartas_lsit(deckSelect.matriz) > 40 ? '50' : conta_cartas_lsit(deckSelect.matriz) > 30 ? '40' : '30'}
                                        </div></div>

                                    </div>
                                    <div className='flex items-center space-x-3 my-2 mt-4'>
                                        <span className='text-xs text-slate-300'>QUEBRADOR</span>
                                        {divider()}
                                    </div>

                                    <div>
                                        {deckSelect.quebrador ? <ItemListDeckBuild item={{ id: deckSelect.quebrador }} lessItem={() => { handleNavigateExternal(deckSelect.quebrador) }} addItem={() => { }} className='overflow-x-visible' > </ItemListDeckBuild> : null}
                                    </div>



                                    <div className='flex items-center space-x-3 my-2 mt-4'>
                                        <span className='text-xs text-slate-300'>ARVORE</span>
                                        {divider()}
                                    </div>
                                    <GraficoBarras listCardDeck={deckSelect.arvore}></GraficoBarras>
                                    <div className=' border border-dashed border-gray-500 rounded-md w-full min-h-[200px] max-h-[300px] h-fit  overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm p-1'>
                                        {deckSelect.arvore.map(item => <ItemListDeckBuild item={item} lessItem={() => { handleNavigateExternal(item.id) }} addItem={() => { }} className='overflow-x-visible' > </ItemListDeckBuild>)}
                                    </div>

                                    <div className='flex items-center space-x-3 my-2 mt-6'>
                                        <span className='text-xs text-slate-300'>MATRIZ</span>
                                        {divider()}
                                    </div>

                                    {/* <GraficoBarras></GraficoBarras> */}
                                    <div className=' border border-dashed border-gray-500 rounded-md w-full  min-h-[200px] max-h-[300px] h-fit overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm p-1'>
                                        {deckSelect.matriz.map(item => <ItemListDeckBuild item={item} lessItem={() => { handleNavigateExternal(item.id) }} addItem={() => { }} className='overflow-x-visible' > </ItemListDeckBuild>)}
                                    </div>

                                    <div className='flex justify-end mt-4 select-none mb-6'>
                                        <Link to='/edita-deck' onClick={() => { setDeck_tu_edit(deckSelect) }} className={`bg-orange-500 hover:bg-orange-400 cursor-pointer  rounded-md px-4 py-2`}  >Editar</Link>
                                    </div>
                                    {/* <div className='flex justify-end mt-4 select-none'>
                                    <div className={`${load ? "bg-orange-300" : "bg-orange-500"} hover:bg-orange-400 cursor-pointer  rounded-md px-4 py-2`} onClick={() => { salveDeck() }} disable={load} >Salvar</div>
                                </div> */}


                                </div> : null}
                        </aside>

                    </div>
                </div>



            </div>

        </div>
    )
}

export default DeckCommunit