import React from 'react'
import Select from 'react-select'
import ItensCheck from '../../pages/listaCards/componentes/itensCheck'


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


        causasFilter,
        tipoFilter,

        setCausasFilter,
        setTipoFilter
    } = useFilter()
    return (
        <div>
            <div className='flex justify-between w-full mb-4'><span>Filtros</span> <div className='rounded-full w-7 h-7 flex justify-center items-center bg-slate-600 hover:bg-opacity-75 cursor-pointer' onClick={toggleDrawer}><CloseRoundedIcon></CloseRoundedIcon></div> </div>

            <div className='flex items-center space-x-3 my-2'>
                <span className='text-xs text-slate-300'>CAUSAS</span>
                <div className='flex-1 border-b border-slate-300 h-0'></div>
                <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`} onClick={() => { setCausasFilter([]) }}>Limpar</span>
            </div>
            <div className='grid grid-cols-2 gap-4'>

                {causas.map((element) => { return <ItensCheck value={element} filter={causasFilter} setValue={setCausasFilter} text={element.causa}></ItensCheck> })}


            </div>



            <div className='flex items-center space-x-3 my-2'>
                <span className='text-xs text-slate-300'>TIPOS</span>
                <div className='flex-1 border-b border-slate-300 h-0'></div>
                {/* <span className={`${causasFilter.length > 0 ? 'text-yellow-300' : 'text-slate-500'} text-xs cursor-pointer`}>Limpar</span> */}
            </div>
            {/* <div className='grid grid-cols-2 gap-4'>

                {causas.map((element) => { return <div >d</div> })}


            </div> */}
            <div className=''>
                {tipos ? <Select
                    closeMenuOnSelect={false}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            // borderColor: state.isFocused ? 'grey' : 'red',
                            backgroundColor: 'rgb(71 85 105)'
                        }),
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary25: 'rgb(91 105 125)',
                            primary: 'rgb(101 125 135)',
                            neutral0: 'rgb(71 85 105)',
                            neutral10: 'rgb(151 165 185)',
                            neutral40: 'rgb(200 230 250)',
                            neutral60: 'rgb(151 165 185)',
                            neutral90: 'green'
                        },
                    })}
                    onChange={(e) => { console.log("selec", e); setTipoFilter(e.map(item => { return { 'id': item.value, 'tipo': item.label } })) }}

                    isMulti
                    options={tipos.map(item => { return { 'value': item.id, 'label': item.tipo } })}
                /> : null}

            </div>
            {/* 
        <div className="min-h-min flex-1 md:min-w-min min-w-[300px]">
            <div className='relative'>
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Palavras Chaves</label>
                <div className='bg-slate-500 w-full h-11 rounded-md p-1 mb-1 flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm border border-gray-800 border-1'>
                    {selectPalavrasChave.map(item => {
                        return <div className='bg-slate-600 pl-3 pr-1 py-1 rounded-lg flex justify-center items-center'>{item.nome} <button onClick={() => { removePalavrasChave(item) }} className='flex justify-center items-center ml-2 h-6 w-6 rounded-full hover:bg-slate-700'>x</button> </div>
                    })}
                </div>
                <input onChange={palavrasChaveChange} value={valuePalavrasChave} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                {filterPalavrasChave.length ? <div className='w-full max-h-[150px]   z-50 bg-white absolute rounded-md mt-1 overflow-y-scroll p-4'>
                    {filterPalavrasChave.map(item => {
                        return (<div key={item.id} onClick={() => { addPalavrasChave(item) }} className='text-black hover:bg-slate-200 py-2 px-4 rounded cursor-pointer'>{item.nome}</div>)
                    })}
                </div> : null}

            </div>
        </div> */}
        </div>
    )
}

export default Filtro