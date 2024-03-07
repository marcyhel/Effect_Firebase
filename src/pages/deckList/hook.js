import React, { useEffect, useState, useContext } from 'react'
import { DefaultContext } from '../../context/context_default';

import DeckDB from '../../database/wrappers/deck';
export function useDeckList() {

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

    const [listDecksUser, setListDecksUser] = useState(null);
    const [deckSelect, setDeckSelect] = useState(null)
    const [isOpenDeck, setIsOpenDeck] = useState(false)
    useEffect(() => {
        if (globalFirestoreData) {
            getDecks()
        }
    }, [globalFirestoreData])



    const getDecks = async () => {
        const userDB = new DeckDB()
        if (globalFirestoreData.userId) {
            await userDB.getAll({ field: 'user_id', operator: '==', value: globalFirestoreData.userId }).then((e) => { setListDecksUser(e); console.log("-1-", e) }).catch(err => { console.log("err", err) })
        }

    }
    const changeDeck = (deck) => {
        setDeckSelect(deck)
    }
    const toggleDrawerDeck = (valor) => {
        setIsOpenDeck(valor)
    }

    useEffect(() => {
        resetaDeck()
    }, [])


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
        estiloCard
    }
}
