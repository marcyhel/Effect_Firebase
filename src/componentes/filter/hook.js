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
        setFilterFetch,
        listCards,
        setShowListCards,
        showListCards

    } = useContext(DefaultContext);

    useEffect(() => {

        // getSubTipos();
        // getTipos();
        // getPalavrasChave();
        // getFortunas();
        // getCausas();
        // getRaridade();


    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [custos, setCustos] = useState(['0', '1', '2', '3', '4', '5', '6', '7']);
    const [causasFilter, setCausasFilter] = useState([]);
    const [tipoFilter, setTipoFilter] = useState([]);
    const [custoFilter, setCustoFilter] = useState([]);
    const [vidaFilter, setVidaFilter] = useState([]);
    const [poderFilter, setPoderFilter] = useState([]);
    const [fortunasFilter, setFortunasFilter] = useState([]);
    const [subTiposFilter, setSubTiposFilter] = useState([]);
    const [raridadeFilter, setRaridadeFilter] = useState([]);
    const [fortunasCustoFilter, setFortunasCustoFilter] = useState([]);




    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]





    useEffect(() => {

        setFilterFetch({
            causasFilter,
            tipoFilter,
            custoFilter,
            vidaFilter,
            poderFilter,
            fortunasFilter,
            subTiposFilter,
            raridadeFilter,
            fortunasCustoFilter
        })
    }, [causasFilter,
        tipoFilter,
        custoFilter,
        vidaFilter,
        poderFilter,
        fortunasFilter,
        subTiposFilter,
        raridadeFilter,
        fortunasCustoFilter
    ])

    useEffect(() => {
        // console.log(tipoFilter)
        var cartasFiltradas = listCards

        if (causasFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                causasFilter.some(causa => carta.causa === causa.id)
            );
        }
        if (tipoFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                tipoFilter.some(tipo => carta.tipo.includes(tipo.id))
            );
        }
        if (fortunasFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                fortunasFilter.some(fortuna => carta.fortuna.includes(fortuna.id))
            );
        }
        if (subTiposFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                subTiposFilter.some(sub_tipo => carta.sub_tipo.includes(sub_tipo.id))
            );
        }
        if (raridadeFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                raridadeFilter.some(raridade => carta.raridade === raridade.id)
            );
        }
        if (custoFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                (custoFilter.includes('7') && parseInt(carta.custo) >= 7) || custoFilter.includes(carta.custo)
            );
        }
        if (vidaFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                (vidaFilter.includes('7') && parseInt(carta.vida) >= 7) || vidaFilter.includes(carta.vida)
            );
        }
        if (poderFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                (poderFilter.includes('7') && parseInt(carta.p_a) >= 7) || poderFilter.includes(carta.p_a)
            );
        }
        if (fortunasCustoFilter.length) {
            cartasFiltradas = cartasFiltradas.filter(carta =>
                fortunasCustoFilter.some(fortuna => carta.fortunaCusto.includes(fortuna.id))
            );
        }


        setShowListCards(cartasFiltradas)

        // console.log(cartasFiltradas)

    }, [filterFetch])

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

    }

}