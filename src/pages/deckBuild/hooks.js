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
        showListCards,
        showCardFlutuante,
        setShowCardFlutuante,
        listCardDeck,
        setListCardDeck,
        listCardDeckMatriz,
        setListCardDeckMatriz

    } = useContext(DefaultContext);

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenDeck, setIsOpenDeck] = useState(false);
    const [zoom, setZoom] = useState(true);
    const [editName, setEditName] = useState(false);
    const [colapseFortuna, setColapseFortuna] = useState(false);


    const [deckName, setDeckName] = useState('Novo Deck');



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

    function addCardToDeck(cardId) {

        var aux_list = listCardDeck;
        console.log(aux_list)
        if (aux_list.filter((e => e.id == cardId)).length > 0) {
            for (let item of aux_list) {
                if (item.id == cardId) {
                    item.qtd += 1
                }
            }
        }
        else {
            aux_list.push(
                { id: cardId, qtd: 1 },
            )
        }


        // console.log(aux_list)
        setListCardDeck([...aux_list])
    }
    function lessCardToDeck(cardId) {
        console.log("Entrando em lessCardToDeck");
        console.log("cardId:", cardId);
        var aux_list = listCardDeck;
        if (aux_list.filter((e => e.id == cardId)).length > 0) {
            if (aux_list.find((e => e.id == cardId)).qtd <= 1) {
                aux_list = aux_list.filter((elemento) => elemento.id !== cardId);
                setShowCardFlutuante(null)
            } else {
                for (let item of aux_list) {
                    if (item.id == cardId) {
                        item.qtd -= 1
                    }
                }
            }

        }
        console.log(cardId, aux_list)
        setListCardDeck([...aux_list])

    }

    function addCardToDeckMatriz(cardId) {

        var aux_list = listCardDeckMatriz;
        console.log(aux_list)
        if (aux_list.filter((e => e.id == cardId)).length > 0) {
            for (let item of aux_list) {
                if (item.id == cardId) {
                    item.qtd += 1
                }
            }
        }
        else {
            aux_list.push(
                { id: cardId, qtd: 1 },
            )
        }


        // console.log(aux_list)
        setListCardDeckMatriz([...aux_list])
    }
    function lessCardToDeckMatriz(cardId) {
        console.log("Entrando em lessCardToDeck");
        console.log("cardId:", cardId);
        var aux_list = listCardDeckMatriz;
        if (aux_list.filter((e => e.id == cardId)).length > 0) {
            if (aux_list.find((e => e.id == cardId)).qtd <= 1) {
                aux_list = aux_list.filter((elemento) => elemento.id !== cardId);
                setShowCardFlutuante(null)
            } else {
                for (let item of aux_list) {
                    if (item.id == cardId) {
                        item.qtd -= 1
                    }
                }
            }

        }
        console.log(cardId, aux_list)
        setListCardDeckMatriz([...aux_list])

    }


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
        listCardDeckMatriz,
        setListCardDeckMatriz,
        addCardToDeck,
        lessCardToDeck,
        addCardToDeckMatriz,
        lessCardToDeckMatriz,
        deckName,
        setDeckName,
        editName,
        setEditName,
        colapseFortuna,
        setColapseFortuna,


    }
}