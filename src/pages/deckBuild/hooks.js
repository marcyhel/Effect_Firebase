import React, { useEffect, useState, useContext } from 'react'
import { DefaultContext } from '../../context/context_default';
export function useDeckBuild() {
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
        listCards,
        getListCards,
        is_descktop,
        filterFetch,
        setShowListCards,
        showListCards

    } = useContext(DefaultContext);

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenDeck, setIsOpenDeck] = useState(false);
    const [zoom, setZoom] = useState(true);

    const [listCardDeck, setListCardDeck] = useState({
        GPPFFc7MOYcq1X1JdbmL: 1,
        LeC4mUt8Gjp6PXjVg3LN: 3
    });

    const toggleDrawerFilter = () => {
        setIsOpenFilter(!isOpenFilter);
    };
    const toggleDrawerDeck = () => {
        setIsOpenDeck(!isOpenDeck);
    };
    const toggleZoom = () => {
        setZoom(!zoom);
    };
    // useEffect(() => { console.log(listCards); }, [listCards])
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Defina aqui a largura que define um dispositivo móvel
        // Verifica se a tela é um celular ou não
        const checkDeviceType = (e) => {
            if (e.matches) {
                setIsOpenFilter(false); // É um celular
                setIsOpenDeck(false)
            } else {
                // setIsOpenFilter(true); // É um computador
                setIsOpenDeck(true)
            }
        };
        // Verifica a largura da tela ao carregar a página
        checkDeviceType(mediaQuery);
        // Adiciona um listener para monitorar mudanças na largura da tela
        mediaQuery.addListener(checkDeviceType);
        // Remove o listener quando o componente é desmontado
        return () => {
            mediaQuery.removeListener(checkDeviceType);
        };
    }, []);

    function addCardToDeck(card) {

        var aux_list = listCardDeck
        if (aux_list[card.id]) {
            aux_list[card.id] += 1
        } else {
            aux_list[card.id] = 1
        }
        // console.log(aux_list)
        setListCardDeck({ ...aux_list })
    }
    useEffect(() => {
        // console.log("card List", listCardDeck)
    }, [listCardDeck])
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    var list = range(1, 180);
    return {

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
        addCardToDeck
    }
}