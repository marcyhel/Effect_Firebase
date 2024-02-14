import React, { useEffect, useContext, useState, useRef } from 'react'
import { Link } from "react-router-dom";
import { AutoSizer, List, Grid } from 'react-virtualized';

import { DefaultContext } from '../../context/context_default';
import { useDeckBuild } from './hooks';
import Filtro from '../../componentes/filter';
import { Card } from '../listaCards/componentes/card';
import ItemListDeckBuild from './componente/itemList';

import imgBG from "../../assets/imagens/bg_decklist.jpg";

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import GraficoBarras from './componente/grafico_barras';
import CardsCuston from './componente/cards';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DeckBuild = () => {
    const {
        globalFirestoreData,
        getSubTipos,
        subTipos,
        tipos,
        getTipos,
        getPalavrasChave,
        palavraChave,
        getFortunas,
        getCausas,
        causas,
        fortunas,
        getRaridade,
        raridades,
        listCards,
        getListCards,
        is_descktop,
        filterFetch,
        setShowListCards,
        showListCards,
        showCardFlutuante,
        setShowCardFlutuante

    } = useContext(DefaultContext);

    const {
        list,
        isOpenFilter,
        setIsOpenFilter,
        isOpenDeck,
        setIsOpenDeck,
        toggleDrawerFilter,
        toggleDrawerDeck,
        zoom,
        toggleZoom,
        setZoom,
        listCardDeck,
        setListCardDeck,
        listCardDeckMatriz,
        setListCardDeckMatriz,
        addCardToDeck,
        lessCardToDeck,
        deckName,
        setDeckName,
        editName,
        setEditName,
        colapseFortuna,
        setColapseFortuna,
        addCardToDeckMatriz,
        lessCardToDeckMatriz,

    } = useDeckBuild();


    const [column_count, setColumn_count] = useState(3)
    const [flag_att_coluna, setFlag_att_coluna] = useState(3)
    const [forceGridUpdate, setForceGridUpdate] = useState(false); // Estado para forçar a atualização
    const inputReference = useRef(null);


    const delay = async (ms) => {
        return new Promise((resolve) =>
            setTimeout(resolve, ms));
    };

    const calc_column = (larg) => {
        var colun = parseInt(larg / (zoom ? 245 : 145))
        colun = colun == 0 ? 1 : colun

        // console.log("colun", colun)
        if (colun == 1 && column_count != 1) {
            setColumn_count(colun)
            setForceGridUpdate(prevState => !prevState);

        }
        setColumn_count(colun)
    }

    useEffect(() => {
        setForceGridUpdate(prevState => !prevState);
    }, [zoom, showListCards])

    useEffect(() => {
        (async () => {
            try {
                await delay(1000)
                setForceGridUpdate(prevState => !prevState);
            } catch (err) {
                console.log('Error occured when fetching books');
            }
        })();
    }, [])

    useEffect(() => {
        if (!isOpenDeck && !isOpenFilter) {
            setForceGridUpdate(prevState => !prevState);
        }
    }, [isOpenDeck, isOpenFilter])

    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        const index = rowIndex * column_count + columnIndex;
        const card = showListCards[index];

        return (
            <div key={key} style={style} className='flex justify-center items-center flex-1 '>
                {card ? <div className='relative group'>

                    <div onClick={card ? () => { card.deckTipo == 0 ? addCardToDeck(card?.id) : addCardToDeckMatriz(card?.id) } : null}>
                        <Card card={card} zoom={zoom} index={columnIndex + 1} columMax={column_count} />
                    </div>

                    <Link to={'/detail/' + card?.id} target="_blank" className='absolute right-5 top-4 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer group-hover:visible invisible hover:bg-slate-500 bg-slate-600 '><InfoOutlinedIcon></InfoOutlinedIcon></Link>
                </div> : null}
            </div>
        );
    };

    const estiloCard = {
        top: showCardFlutuante ? `${window.innerHeight * 0.66 > showCardFlutuante?.y ? showCardFlutuante?.y : window.innerHeight * 0.66}px` : '0',

    };

    const estiloDoComponente = {
        WebkitFilter: 'drop-shadow(0px 0px 4px #0f0f0f)',
        filter: 'drop-shadow(0px 0px 4px #0f0f0f)',
    };

    useEffect(() => {
        console.log(editName)
        if (editName) {
            inputReference.current.focus();
        }
    }, [editName])

    const divider = () => { return (<div className='flex-1 border-b border-slate-600 h-0'></div>) }

    return (
        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-full w-full bg-cover bg-center flex justify-center md:justify-end items-cente overflow-hidden'>
            <div className={` bg-slate-700 bg-opacity-[94%] h-full w-full flex justify-center md:justify-end items-cente `}>
                {globalFirestoreData.userId ?
                    <div className={`${isOpenFilter || isOpenDeck ? 'md:mr-[320px] duration-200' : 'mr-0 duration-200'} relative w-full h-full pt-20 transition-all p-2  `}>


                        <div className={`${showCardFlutuante && is_descktop ? "" : "hidden"} w-40 h-56  right-0 mr-2 absolute z-40`} style={estiloCard}>
                            <img className=' w-full h-full object-contain' style={estiloDoComponente} src={showCardFlutuante?.url_img} loading="lazy" ></img>
                        </div>

                        <div className='flex space-x-2 mb-2 items-end'>

                            <div className='flex-1 flex lg:space-x-2 lg:flex-row flex-col  lg:items-center justify-center '>
                                <span className='min-w-fit text-2xl font-bold'>Galeria de Cards</span>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <SearchRoundedIcon></SearchRoundedIcon>
                                    </div>
                                    <input type="text" id="simple-search" class="border   text-sm rounded-lg block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Procure pelo nome de alguma carta..." required />
                                </div>

                            </div>
                            <div className='p-4 bg-slate-500 hover:bg-slate-400 text-right w-10 h-10 flex justify-center items-center cursor-pointer rounded' onClick={toggleZoom}>{zoom ? <ZoomOutIcon></ZoomOutIcon> : <ZoomInIcon></ZoomInIcon>}</div>
                            <div className='p-4 bg-slate-500 hover:bg-slate-400 text-right w-10 h-10 flex justify-center items-center cursor-pointer rounded' onClick={toggleDrawerFilter}><FilterAltRoundedIcon></FilterAltRoundedIcon></div>
                            <div className='p-4 bg-slate-500 hover:bg-slate-400 text-right w-10 h-10 flex justify-center items-center cursor-pointer rounded' onClick={toggleDrawerDeck}><StyleRoundedIcon></StyleRoundedIcon></div>

                        </div>

                        <div className={` w-full h-[99%]  pb-[40px]   `}>

                            <AutoSizer>
                                {({ height, width }) => {
                                    // console.log(height, width)
                                    calc_column(width)

                                    return (
                                        <Grid
                                            className={`justify-center  scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm  `}
                                            key={forceGridUpdate}
                                            cellRenderer={cellRenderer}
                                            columnCount={column_count}
                                            columnWidth={(column_count == 1 ? width : column_count == 2 ? width / 2.2 : (zoom ? 245 : 145))} // Largura de cada coluna
                                            height={height}
                                            rowCount={Math.ceil(showListCards.length / column_count)}
                                            rowHeight={(zoom ? 345 : 205)} // Altura de cada linha
                                            width={width} // Largura total do grid
                                        />
                                    )
                                }}
                            </AutoSizer>
                            {/* {listCards.map(item => { return <Card card={item} zoom={zoom} /> })} */}
                        </div>


                        <aside className={`${isOpenDeck ? 'translate-x-0 duration-200' : ' duration-300 translate-x-full '} overflow-x-visible bg-slate-700  pt-16 transition-transform  fixed top-0 right-0 z-30 w-80 h-screen shadow-lg flex flex-col p-3 border-l border-slate-600 border-opacity-60`}>


                            <div className='flex flex-col justify-start overflow-y-auto  scrollbar-thin overflow-x-hidden scrollbar-thumb-slate-600  scrollbar-rounded-sm pr-2 h-full pt-4'>
                                <div className='flex justify-between w-full mb-4'>
                                    <div className='flex items-center '  >
                                        <EditRoundedIcon className='mr-2' />
                                        {editName ?
                                            <div className='relative '>
                                                <input className='text-gray-900 rounded bg-slate-400 p-1 mt-1 ' ref={inputReference} value={deckName} onChange={(e) => { setDeckName(e.target.value) }} ></input>
                                                <div class=" absolute end-1 top-1/4 w-7 rounded-full  hover:bg-slate-500 scale-75 text-slate-900" onClick={() => { setEditName(false) }}><CheckRoundedIcon /></div>
                                            </div> :
                                            <span onClick={() => { setEditName(true); }} className='cursor-pointer'>{deckName}</span>
                                        }


                                    </div>

                                    <div className='rounded-full w-7 h-7 flex justify-center items-center bg-slate-600 hover:bg-opacity-75 cursor-pointer' onClick={toggleDrawerDeck}><CloseRoundedIcon></CloseRoundedIcon>
                                    </div>

                                </div>

                                <div className='flex items-center space-x-3 my-2 mt-4'>
                                    <span className='text-xs text-slate-300'>ARVORE</span>
                                    {divider()}
                                </div>
                                <GraficoBarras></GraficoBarras>
                                <div className=' border border-dashed border-gray-500 rounded-md w-full min-h-[200px] max-h-[300px] h-fit  overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm p-1'>
                                    {listCardDeck.map(item => <ItemListDeckBuild item={item} lessItem={lessCardToDeck} addItem={addCardToDeck} className='overflow-x-visible' > </ItemListDeckBuild>)}
                                </div>

                                <div className='flex items-center space-x-3 my-2 mt-6'>
                                    <span className='text-xs text-slate-300'>MATRIZ</span>
                                    {divider()}
                                </div>

                                {/* <GraficoBarras></GraficoBarras> */}
                                <div className=' border border-dashed border-gray-500 rounded-md w-full  min-h-[200px] max-h-[300px] h-fit overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm p-1'>
                                    {listCardDeckMatriz.map(item => <ItemListDeckBuild item={item} lessItem={lessCardToDeckMatriz} addItem={addCardToDeckMatriz} className='overflow-x-visible' > </ItemListDeckBuild>)}
                                </div>


                                <div className='flex justify-end mt-4 select-none'>
                                    <div className='hover:bg-orange-400 cursor-pointer bg-orange-500 rounded-md px-4 py-2'>Salvar</div>
                                </div>









                            </div>
                        </aside>
                        <aside className={`${isOpenFilter ? 'translate-x-0 duration-200' : ' duration-300 translate-x-full '}  bg-slate-700  pt-20 transition-transform  fixed top-0 right-0 z-30 w-80 h-screen shadow-lg flex flex-col p-3 border-l border-slate-600 border-opacity-60 `}>


                            <Filtro toggleDrawer={toggleDrawerFilter} />
                        </aside>
                    </div>
                    :
                    <div>Precisa logar</div>
                }


            </div>
        </div>
    )
}

export default DeckBuild