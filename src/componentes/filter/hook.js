import React, { useEffect, useState, useContext } from 'react'
import { DefaultContext } from '../../context/context_default';
export function useFilter() {
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
        filterFetch,
        setFilterFetch

    } = useContext(DefaultContext);

    useEffect(() => {

        getSubTipos();
        getTipos();
        getPalavrasChave();
        getFortunas();
        getCausas();
        getRaridade();


    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [causasFilter, setCausasFilter] = useState([]);
    const [tipoFilter, setTipoFilter] = useState([]);




    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]





    useEffect(() => {

        setFilterFetch({
            causasFilter,
            tipoFilter
        })
    }, [causasFilter, tipoFilter])

    // useEffect(() => {
    //     console.log("tipos", tipos)
    //     console.log("tipos", tipos.map(item => { return { 'value': item.id, 'label': item.tipo } }))
    // }, [tipos])

    return {
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

    }

}