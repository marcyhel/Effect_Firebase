import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { DefaultContext } from '../../context/context_default';

import DeckDB from '../../database/wrappers/deck';
import { Search } from '@mui/icons-material';
export function useDeckCommunit() {

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
        setListCardDeckMatriz,
        quebradorDeck,
        setQuebradorDeck,
        globalFirestoreData,
        resetaDeck

    } = useContext(DefaultContext);

    const [listDecksUser, setListDecksUser] = useState([]);
    const [deckSelect, setDeckSelect] = useState(null)
    const [snapShot, setSnapShot] = useState(null)
    const [snapSize, setSnapSize] = useState(0)
    const [isOpenDeck, setIsOpenDeck] = useState(false)
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [search, setSearch] = useState('')

    const lastDeckRef = useRef(null)
    const observer = useRef(null)

    const [debounceTimeout, setDebounceTimeout] = useState(null);


    async function getDecks(field = null, operator = null, value = null, busca = null) {

        const userDB = new DeckDB()
        console.log("inicial")
        if (!snapShot) {
            console.log("inicial")
            var { datas, querySnapshot, size } = await userDB.getAllCommunit({ field, operator, value, orderByField: 'timestamp' })
            setSnapShot(querySnapshot)
            setSnapSize(size)
            setListDecksUser([...listDecksUser, ...datas]);
            console.log("-1-", datas, size)


        } else {
            console.log("Reacegaa")
            var { datas, querySnapshot, size } = await userDB.getAllCommunit({ field, operator, value, orderByField: 'timestamp', after: !busca ? snapShot.docs[snapShot.docs.length - 1] : null })
            setSnapShot(querySnapshot)
            setSnapSize(size)
            setListDecksUser([...listDecksUser, ...datas]);
            console.log("-1-", datas, size)

        }
    }
    const handleSearch = useCallback(async () => {
        // Lógica para buscar no banco de dados usando o searchTerm
        console.log(`Buscando por "${search}"`);
        setSnapShot(null)
        setSnapSize(0)
        setListDecksUser([]);
        getDecks('nome', '<=', search, true)

        // .where('name', '>=', queryText)
        // .where('name', '<=', queryText+ '\uf8ff')

    }, [search]);

    const handleInputChange = useCallback((event) => {
        const newSearchTerm = event.target.value;
        setSearch(event.target.value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            handleSearch();
        }, 700); // 500 milissegundos = 0.5 segundos

        setDebounceTimeout(timeout);
    }, [debounceTimeout, handleSearch]);


    // const steInfinito = async () => {
    //     setInfinit(infinit + 1)
    // }

    const NextPlan = async () => {
        console.log(listDecksUser.length, snapSize)
        if (listDecksUser.length < snapSize) {
            getDecks()
        }


    }
    const changeDeck = (deck) => {
        setDeckSelect(deck)
    }
    const toggleDrawerDeck = (valor) => {
        setIsOpenDeck(valor)
    }
    const toggleDrawerFilter = (valor) => {
        setIsOpenFilter(valor)
    }

    useEffect(() => {
        getDecks()
        resetaDeck()
    }, [])

    function searchChange(event) {
        setSearch(event.target.value);
    }


    const estiloCard = {
        top: showCardFlutuante ? `${window.innerHeight * 0.66 > showCardFlutuante?.y ? showCardFlutuante?.y : window.innerHeight * 0.66}px` : '0',

    };

    return {
        listDecksUser,
        deckSelect,
        setDeckSelect,
        changeDeck,
        isOpenDeck,
        toggleDrawerDeck,
        estiloCard,
        NextPlan,
        lastDeckRef,
        snapSize,
        handleInputChange,
        toggleDrawerFilter,
        isOpenFilter

    }
}
