import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import imgBG from "../../assets/imagens/bg_list.jpg";
import { DefaultContext } from '../../context/context_default';
import Select from 'react-select'
import { AutoSizer, List, Grid } from 'react-virtualized';
import { useListCard } from './hooks';

import { Card } from './componentes/card';
import Filtro from '../../componentes/filter';
import AdsComponent from '../componentes/adsense';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const ListaCards = () => {
    const navigate = useNavigate()
    const {
        subTipos,
        tipos,
        palavraChave,
        causas,
        fortunas,
        raridades,
        is_descktop,
        listCards,
        showListCards,
        list,
        isOpen,
        setIsOpen,
        toggleDrawer,
        zoom,
        setZoom,
        toggleZoom,
        search,
        searchChange
    } = useListCard()

    const [column_count, setColumn_count] = useState(3)
    const [flag_att_coluna, setFlag_att_coluna] = useState(3)
    const [forceGridUpdate, setForceGridUpdate] = useState(false); // Estado para forçar a atualização

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


    }, [zoom, isOpen, showListCards])
    useEffect(() => {
        // if ((column_count == 1 && flag_att_coluna != 1) || (column_count != 1 && flag_att_coluna == 1) || (column_count == 1 && flag_att_coluna == 1)) {
        //     setForceGridUpdate(prevState => !prevState);
        //     console.log("Força a atualização do grid")
        // }
        // setFlag_att_coluna(column_count)

    }, [column_count, zoom])

    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        const index = rowIndex * column_count + columnIndex;
        const card = showListCards[index];

        return (
            <Link to={card ? "/detail/" + card?.id : null} key={key} style={style} className='flex justify-center items-center flex-1'>
                {card && <Card card={card} zoom={zoom} index={columnIndex + 1} columMax={column_count} />}
            </Link>
        );
    };
    const COLUMN_COUNT = 3;
    return (

        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-full w-full bg-cover bg-center flex justify-center md:justify-end items-cente overflow-hidden'>
            <div className={`${isOpen ? 'md:mr-[320px] duration-200' : 'mr-0 duration-200'} bg-slate-700 bg-opacity-[94%] w-full h-full pt-20 transition-all  `}>
                <div className='bg-gradient-to-b from-transparent via-transparent to-slate-900 w-full h-full p-2 '>
                    <div className='flex space-x-2 mb-2 items-end'>

                        <div className='flex-1 flex lg:space-x-2 lg:flex-row flex-col  lg:items-center justify-center '>
                            <span className='min-w-fit text-2xl font-bold'>Galeria de Cards</span>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <SearchRoundedIcon></SearchRoundedIcon>
                                </div>
                                <input type="text" id="simple-search" onChange={searchChange} class="border   text-sm rounded-lg block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Procure pelo nome de alguma carta..." required />
                            </div>

                        </div>
                        <div className='p-4 bg-slate-500 hover:bg-slate-400 text-right w-10 h-10 flex justify-center items-center cursor-pointer rounded' onClick={toggleZoom}>{zoom ? <ZoomOutIcon></ZoomOutIcon> : <ZoomInIcon></ZoomInIcon>}</div>
                        <div className='p-4 bg-slate-500 hover:bg-slate-400 text-right w-10 h-10 flex justify-center items-center cursor-pointer rounded' onClick={toggleDrawer}><FilterAltRoundedIcon></FilterAltRoundedIcon></div>
                    </div>

                    <div className={` w-full h-[99%]  pb-[40px]   `}>


                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3580760315178127"
                            crossorigin="anonymous"></script>






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

                </div>
            </div>

            <aside className={`${isOpen ? 'translate-x-0 duration-200' : ' duration-300 translate-x-full '}  bg-slate-700  pt-20 transition-transform  fixed top-0 right-0 z-30 w-80 h-screen shadow-lg flex flex-col p-3 border-l border-slate-600 border-opacity-60`}>


                <Filtro toggleDrawer={toggleDrawer} search={search} />
            </aside>
        </div>

    )
}

export default ListaCards