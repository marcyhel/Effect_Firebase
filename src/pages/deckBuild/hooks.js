import React, { useEffect, useState, useContext } from 'react'
import { DefaultContext } from '../../context/context_default';
import { useAlert } from 'react-alert'
import moment from 'moment';
import DeckDB from '../../database/wrappers/deck';
export function useDeckBuild() {
    const {
        tipos,
        listCards,
        setShowCardFlutuante,
        listCardDeck,
        setListCardDeck,
        listCardDeckMatriz,
        setListCardDeckMatriz,
        quebradorDeck,
        setQuebradorDeck,
        globalFirestoreData,
        deckName, setDeckName,
        deck_tu_edit

    } = useContext(DefaultContext);

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenDeck, setIsOpenDeck] = useState(false);
    const [zoom, setZoom] = useState(true);
    const [editName, setEditName] = useState(false);
    const [colapseFortuna, setColapseFortuna] = useState(false);
    const [load, setLoad] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [search, setSearch] = useState('');



    const alert = useAlert()


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
        var card = listCards.find(e => e.id == cardId)
        var flag_quebrador = false;
        if (card) {
            card.tipo.forEach(element => {
                const find_tipo = tipos.find(e => e.id == element)
                console.log(find_tipo)
                if (find_tipo.tipo == "Quebrador") {
                    flag_quebrador = true
                }
            });
        }
        if (flag_quebrador) {
            console.log("aquiiii111")
            setQuebradorDeck({ id: cardId, qtd: 1 })
        } else {
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

    async function salveDeck() {
        setLoad(true)
        if (quebradorDeck) {
            var form = {}
            form['nome'] = deckName;
            form['arvore'] = listCardDeck;
            form['matriz'] = listCardDeckMatriz;
            form['quebrador'] = quebradorDeck.id;
            form['user_id'] = globalFirestoreData.userId;
            // form['create_at'] = moment().toString();
            const userDB = new DeckDB()
            await userDB.create(
                form
            ).then((e) => {
                alert.success('Deck salvo com sucesso');
                console.log(e)
            }).catch(err => {
                alert.error('Erro ao salvar deck')
            })
            console.log(form);
        } else {
            alert.error('Selecione um Quebrador')
        }
        setLoad(false)

    }
    async function updateDeck() {
        setLoad(true);

        if (quebradorDeck && deck_tu_edit.id) {
            var form = {};
            form['nome'] = deckName;
            form['arvore'] = listCardDeck;
            form['matriz'] = listCardDeckMatriz;
            form['quebrador'] = quebradorDeck.id;
            // form['create_at'] = moment().toString();

            const userDB = new DeckDB();
            console.log(deck_tu_edit.id)
            await userDB.update(deck_tu_edit.id, form) // Assumindo que você tenha um método de atualização no seu DeckDB
                .then((e) => {
                    alert.success('Deck atualizado com sucesso');
                    console.log(e);
                })
                .catch(err => {
                    console.error(err);
                    alert.error('Erro ao atualizar o deck');
                });

            console.log(form);
        } else {
            alert.error('Selecione um Quebrador');
        }

        setLoad(false);
    }

    function searchChange(event) {
        setSearch(event.target.value);
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

        editName,
        setEditName,
        colapseFortuna,
        setColapseFortuna,
        salveDeck,
        updateDeck,
        setQuebradorDeck,
        quebradorDeck,
        load,
        search,
        searchChange,
        editMode,
        setEditMode

    }
}