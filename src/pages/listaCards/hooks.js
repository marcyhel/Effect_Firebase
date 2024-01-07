import React, { useEffect, useState, useContext } from 'react'
import { DefaultContext } from '../../context/context_default';
export function useListCard() {
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
        filterFetch

    } = useContext(DefaultContext);

    useEffect(() => {

        getSubTipos();
        getTipos();
        getPalavrasChave();
        getFortunas();
        getCausas();
        getRaridade();
        getListCards();


    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [zoom, setZoom] = useState(true);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const toggleZoom = () => {
        setZoom(!zoom);
    };
    useEffect(() => { console.log(listCards); }, [listCards])
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Defina aqui a largura que define um dispositivo móvel
        // Verifica se a tela é um celular ou não
        const checkDeviceType = (e) => {
            if (e.matches) {
                setIsOpen(false); // É um celular
            } else {
                setIsOpen(true); // É um computador
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

    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    var list = range(1, 180);
    return {

        subTipos,
        tipos,
        is_descktop,

        palavraChave,


        causas,
        fortunas,

        raridades,
        listCards,

        list,
        isOpen,
        setIsOpen,
        toggleDrawer,
        zoom,
        toggleZoom,
        setZoom
    }
}