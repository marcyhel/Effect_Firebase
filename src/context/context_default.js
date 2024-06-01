import React, { useEffect, createContext, useState } from "react";
import { auth } from '../firebase';

import GlocalFirestoreData from '../database/globalData';
import { jwtDecode } from 'jwt-decode';
// import { useAlert } from 'react-alert'
import BugReport from "../pages/bugReport";

import UserDb from "../database/wrappers/user";
import SubTipoDb from "../database/wrappers/subTipos";
import TipoDb from "../database/wrappers/tipos";
import PalavraChaveDb from "../database/wrappers/palavraChave";
import CausasDB from "../database/wrappers/causas";
import FortunasDB from "../database/wrappers/fortunas";
import RaridadesDB from "../database/wrappers/raridades";
import CardDB from "../database/wrappers/cards";


import imgBG from "../assets/imagens/bg_card.jpg";
import imgIgn from "../assets/imagens/ign.png";
import imgVerbus from "../assets/imagens/verbus.png";
import imgKarma from "../assets/imagens/karma.png";
import imgGnos from "../assets/imagens/gnos.png";
import imgOmna from "../assets/imagens/omna.png";
import imgDnama from "../assets/imagens/dnama.png";

export const DefaultContext = createContext({})

export default function DefaultProvider({ children }) {
    // const [user, setUser] = useState('');
    const [showBugReport, setShowBugReport] = useState(false);
    const [is_descktop, setIs_descktop] = useState(true);
    const [globalFirestoreData, setGlobalFirestoreData] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [subTipos, setSubTipos] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [palavraChave, setPalavraChave] = useState([]);
    const [causas, setCausas] = useState([]);
    const [fortunas, setFortunas] = useState([]);
    const [raridades, setRaridades] = useState([]);
    const [listCards, setListCards] = useState([]);
    const [showListCards, setShowListCards] = useState([]);
    const [showCardFlutuante, setShowCardFlutuante] = useState(null);
    const [filterFetch, setFilterFetch] = useState({
        name: '',
        filter: {}
    });
    const [listCardDeck, setListCardDeck] = useState([]);
    const [listCardDeckMatriz, setListCardDeckMatriz] = useState([]);
    const [quebradorDeck, setQuebradorDeck] = useState(null);
    const [deckName, setDeckName] = useState('Novo Deck');
    const [deck_tu_edit, setDeck_tu_edit] = useState(null);
    const [share_deck, setShare_deck] = useState(true);

    useEffect(() => {
        // console.log("aquii")
        getListCards()
        let isSign = false;
        const onSubscriber = auth.onAuthStateChanged(user => {
            if (user) {
                if (isSign) return;

                console.log('Esta logado', user);
                const onLogin = async () => {
                    const token = await user.getIdToken()
                    const tokenData = jwtDecode(token)
                    console.log("toeken", tokenData)
                    const userDB = new UserDb()
                    await userDB.get(tokenData.user_id).then(result => {
                        console.log('getUser', result)
                        GlocalFirestoreData.userId = tokenData.user_id
                        GlocalFirestoreData.userName = result.nome || '';
                        GlocalFirestoreData.useremail = result.email || '';
                        GlocalFirestoreData.role = result.role || 'user';

                        const userData = {
                            userId: tokenData.user_id,
                            userName: result.nome || '',
                            useremail: result.email || '',
                            role: result.role || 'user',

                        };

                        setGlobalFirestoreData(prevState => ({
                            ...prevState,
                            ...userData
                        }));
                    }).catch(err => {
                        console.log("err", err)
                        auth.signOut();
                    })

                }

                return onLogin();
            } else {
                console.log('Não Esta logado');

                // isSign = false;
                // setMenuSelected(null)
                // setUser(null)
            }
        })

        return onSubscriber;
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Defina aqui a largura que define um dispositivo móvel

        // Verifica se a tela é um celular ou não
        const checkDeviceType = (e) => {
            if (e.matches) {
                setIs_descktop(false); // É um celular
            } else {
                setIs_descktop(true); // É um computador
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
    useEffect(() => {
        getSubTipos();
        getUsers();
        getTipos();
        getPalavrasChave();
        getFortunas();
        getCausas();
        getRaridade();
        getListCards();



    }, [])

    // -------------filtro-----------
    useEffect(() => {
        // filterFetch
        // console.log("alterado Lista")
    }, [filterFetch])

    const deslogar = () => {
        auth.signOut();
        GlocalFirestoreData.userId = ''
        GlocalFirestoreData.userName = '';
        GlocalFirestoreData.useremail = '';
        GlocalFirestoreData.role = '';

        const userData = {
            userId: '',
            userName: '',
            useremail: '',
            role: '',

        };

        setGlobalFirestoreData(prevState => ({
            ...prevState,
            ...userData
        }));
    }

    const getSubTipos = async () => {
        if (subTipos.length == 0) {
            // console.log("buscando SUb")
            const subTipoDB = new SubTipoDb()
            await subTipoDB.getAll().then(resultado => {
                setSubTipos(resultado)
            })
        }
    }
    const getTipos = async () => {
        if (tipos.length == 0) {
            const tipoDB = new TipoDb()
            await tipoDB.getAll().then(resultado => {
                setTipos(resultado)
            })
        }
    }
    const getPalavrasChave = async () => {
        if (palavraChave.length == 0) {
            const palavraChaveDB = new PalavraChaveDb()
            await palavraChaveDB.getAll().then(resultado => {
                setPalavraChave(resultado)
            })
        }
    }
    const getFortunas = async () => {
        if (fortunas.length == 0) {
            const fortunasDB = new FortunasDB()
            await fortunasDB.getAll().then(resultado => {
                setFortunas(resultado)
            })
        }
    }
    const getCausas = async () => {
        if (causas.length == 0) {
            const causasDB = new CausasDB()
            await causasDB.getAll().then(resultado => {
                setCausas(resultado)
            })
        }
    }
    const getRaridade = async () => {
        if (raridades.length == 0) {
            const raridadesDB = new RaridadesDB()
            await raridadesDB.getAll().then(resultado => {
                setRaridades(resultado)
            })
        }
    }
    const getListCards = async () => {
        if (listCards.length == 0) {
            const cardDB = new CardDB()
            await cardDB.getAll().then(resultado => {
                setListCards(resultado)
                setShowListCards(resultado)
            })
        }

    }
    const getUsers = async () => {
        if (raridades.length == 0) {
            const raridadesDB = new UserDb()
            await raridadesDB.getAll().then(resultado => {
                setUsersList(resultado)
            })
        }
    }

    function HTMLRenderer({ html }) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }


    const replacesAll = (string, search, replace) => {
        return string.split(search).join(replace);
    }

    const validar_deckId_vs_userId = () => {
        if (deck_tu_edit?.user_id && globalFirestoreData?.userId == deck_tu_edit?.user_id) {
            return true
        }
        return false

    }
    const conta_cartas_lsit = (list) => {
        return list.reduce((accumulator, currentValue) => accumulator + currentValue.qtd, 0);
    }

    const resetaDeck = () => {
        setListCardDeckMatriz([])
        setListCardDeck([])
        setQuebradorDeck(null)
        setDeckName("Novo Deck")
        setShare_deck(true)
    }

    const switchModalBug = () => {
        setShowBugReport(!showBugReport)
    }
    const alertSucess = (msg) => {
        // var alert = useAlert();
        // alert.success(msg);
    }

    const replaceText = (text) => {
        var img_quente = '<img style="width : 20px; height: 20px; display:inline; -webkit-filter: drop-shadow(0px 0px 3px #ff0050); filter: drop-shadow(0px 0px 3px #ff0050);" src='
        var img_algida = '<img style="width : 20px; height: 20px; display:inline; -webkit-filter: drop-shadow(0px 0px 3px #00a0ff); filter: drop-shadow(0px 0px 3px #00a0ff);" src='

        var num_algida = '<span style="text-shadow:0px 0px 5px #00a0ff; display:inline;" >'
        var num_quente = '<span style="text-shadow:0px 0px 5px #ff0050; display:inline;" >'
        var num_neltro = '<span style="text-shadow:0px 0px 5px #ffffff; display:inline;" >'
        // console.log('text ====>', text)
        text = replacesAll(text, '[ign]', `${img_quente} ${imgIgn} ></img>`)
        text = replacesAll(text, '[verbus]', `${img_quente} ${imgVerbus} ></img>`)
        text = replacesAll(text, '[karma]', `${img_quente} ${imgKarma} ></img>`)
        text = replacesAll(text, '[gnos]', `${img_algida} ${imgGnos} ></img>`)
        text = replacesAll(text, '[dnama]', `${img_algida} ${imgDnama} ></img>`)
        text = replacesAll(text, '[omna]', `${img_algida} ${imgOmna} ></img>`)

        text = replacesAll(text, '[h-destruicao]', `[▲]`)
        text = replacesAll(text, '[destruicao]', `▲`)
        text = replacesAll(text, '[h-controle]', `[▶]`)
        text = replacesAll(text, '[controle]', `▶`)
        text = replacesAll(text, '[h-criacao]', `[▼]`)
        text = replacesAll(text, '[criacao]', `▼`)
        text = replacesAll(text, '[h-alteracao]', `[◀]`)
        text = replacesAll(text, '[alteracao]', `◀`)

        text = replacesAll(text, '[1-a]', `${num_algida} 1 </span>`)
        text = replacesAll(text, '[1-q]', `${num_quente} 1 </span>`)
        text = replacesAll(text, '[1-n]', `${num_neltro} 1 </span>`)
        text = replacesAll(text, '[2-a]', `${num_algida} 1 </span>`)
        text = replacesAll(text, '[2-q]', `${num_quente} 1 </span>`)
        text = replacesAll(text, '[2-n]', `${num_neltro} 1 </span>`)


        return text
    }

    return (
        <DefaultContext.Provider value={{
            // user,
            // setUser,
            globalFirestoreData,
            deslogar,
            getSubTipos,
            subTipos,
            tipos,
            getTipos,
            getPalavrasChave,
            palavraChave,
            getFortunas,
            fortunas,
            getCausas,
            causas,
            getRaridade,
            raridades,
            getListCards,
            listCards,
            is_descktop,

            filterFetch,
            setFilterFetch,
            replaceText,
            HTMLRenderer,
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
            deck_tu_edit, setDeck_tu_edit,
            validar_deckId_vs_userId,
            deckName,
            setDeckName,
            conta_cartas_lsit,
            resetaDeck,
            usersList,
            share_deck, setShare_deck,
            switchModalBug,
            alertSucess
        }}>
            {children}

            <BugReport visible={showBugReport}></BugReport>

        </DefaultContext.Provider>
    );
}
