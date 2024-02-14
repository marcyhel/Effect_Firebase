import React from 'react'

import ItensCheck from '../../pages/listaCards/componentes/itensCheck'
import ItensCheckCost from '../../pages/listaCards/componentes/itensCheckCost';
import ItensSelect from '../../pages/listaCards/componentes/itensSelect';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { useFilter } from './hook'

const Filtro = ({ toggleDrawer }) => {
    const {
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
        custos,


        causasFilter,
        tipoFilter,
        custoFilter,
        vidaFilter,
        poderFilter,
        fortunasFilter,
        fortunasCustoFilter,
        subTiposFilter,
        raridadeFilter,

        setCausasFilter,
        setTipoFilter,
        setCustoFilter,
        setVidaFilter,
        setPoderFilter,
        setFortunasFilter,
        setFortunasCustoFilter,
        setSubTiposFilter,
        setRaridadeFilter
    } = useFilter()
    const divider = () => { return (<div className='flex-1 border-b border-slate-600 h-0'></div>) }
    return (
        <div className='flex flex-col justify-start overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm pr-2 h-full '>
            <div className='flex justify-between w-full mb-4'><span>Filtros</span> <div className='rounded-full w-7 h-7 flex justify-center items-center bg-slate-600 hover:bg-opacity-75 cursor-pointer' onClick={toggleDrawer}><CloseRoundedIcon></CloseRoundedIcon></div> </div>

            <div className='flex items-center space-x-3 my-2'>
                <span className='text-xs text-slate-300'>CAUSAS</span>
                {divider()}
                <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`} onClick={() => { setCausasFilter([]) }}>Limpar</span>
            </div>
            <div className='grid grid-cols-2 gap-4'>

                {causas.map((element) => { return <ItensCheck value={element} filter={causasFilter} setValue={setCausasFilter} text={element.causa}></ItensCheck> })}


            </div>



            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>TIPOS</span>
                {divider()}
                {/* <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`}>Limpar</span> */}
            </div>
            <div className=''>
                {tipos ? <ItensSelect value={tipos} setValue={setTipoFilter} ></ItensSelect> : null}

            </div>


            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>SUB TIPOS</span>
                {divider()}
                {/* <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`}>Limpar</span> */}
            </div>
            <div className=''>
                {subTipos ? <ItensSelect value={subTipos} setValue={setSubTiposFilter} ></ItensSelect> : null}

            </div>


            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>RARIDADES</span>
                {divider()}
                {/* <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`}>Limpar</span> */}
            </div>
            <div className=''>
                {raridades ? <ItensSelect value={raridades} setValue={setRaridadeFilter} ></ItensSelect> : null}

            </div>



            <div className=' border-b border-slate-400 h-0 mt-4'></div>




            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>VIDA</span>
                {divider()}
                <span className={`${vidaFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`} onClick={() => { setVidaFilter([]) }}>Limpar</span>
            </div>
            <div className='flex border border-slate-500'>
                {custos.map((element) => { return <ItensCheckCost value={element} filter={vidaFilter} setValue={setVidaFilter} text={element == '7' ? '+' + element : element}></ItensCheckCost> })}
            </div>

            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>PODER</span>
                {divider()}
                <span className={`${poderFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`} onClick={() => { setPoderFilter([]) }}>Limpar</span>
            </div>
            <div className='flex border border-slate-500'>
                {custos.map((element) => { return <ItensCheckCost value={element} filter={poderFilter} setValue={setPoderFilter} text={element == '7' ? '+' + element : element}></ItensCheckCost> })}
            </div>

            <div className=' border-b border-slate-400 h-0 mt-4'></div>





            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>INTERAÇÃO COM FORTUNAS</span>

                {divider()}
                {/* <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`}>Limpar</span> */}
            </div>

            <div className=''>
                {fortunas ? <ItensSelect value={fortunas} setValue={setFortunasFilter} ></ItensSelect> : null}

            </div>

            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>FORTUNAS NO CUSTO</span>

                {divider()}
                {/* <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`}>Limpar</span> */}
            </div>

            <div className=''>
                {fortunas ? <ItensSelect value={fortunas} setValue={setFortunasCustoFilter} ></ItensSelect> : null}

            </div>

            <div className='flex items-center space-x-3 my-2 mt-4'>
                <span className='text-xs text-slate-300'>CUSTOS</span>
                {divider()}
                <span className={`${custoFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`} onClick={() => { setCustoFilter([]) }}>Limpar</span>
            </div>
            <div className='flex border border-slate-500'>
                {custos.map((element) => { return <ItensCheckCost value={element} filter={custoFilter} setValue={setCustoFilter} text={element == '7' ? '+' + element : element}></ItensCheckCost> })}
            </div>









        </div>
    )
}

export default Filtro