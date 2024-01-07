import React, { useEffect, createContext, useState } from "react";
import { auth } from '../firebase';

import GlocalFirestoreData from '../database/globalData';
import { jwtDecode } from 'jwt-decode';

import UserDb from "../database/wrappers/user";
import SubTipoDb from "../database/wrappers/subTipos";
import TipoDb from "../database/wrappers/tipos";
import PalavraChaveDb from "../database/wrappers/palavraChave";
import CausasDB from "../database/wrappers/causas";
import FortunasDB from "../database/wrappers/fortunas";
import RaridadesDB from "../database/wrappers/raridades";
import CardDB from "../database/wrappers/cards";

export const DefaultContext = createContext({})

export default function DefaultProvider({ children }) {
    // const [user, setUser] = useState('');

    const [is_descktop, setIs_descktop] = useState(true);
    const [globalFirestoreData, setGlobalFirestoreData] = useState({});
    const [subTipos, setSubTipos] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [palavraChave, setPalavraChave] = useState([]);
    const [causas, setCausas] = useState([]);
    const [fortunas, setFortunas] = useState([]);
    const [raridades, setRaridades] = useState([]);
    const [listCards, setListCards] = useState([]);
    const [filterFetch, setFilterFetch] = useState({
        name: '',
        filter: {}
    });



    useEffect(() => {
        console.log("aquii")
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

    // -------------filtro-----------
    useEffect(() => {
        // filterFetch
        console.log("alterado Lista")
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
            console.log("buscando SUb")
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
            })
        }

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
            setFilterFetch
        }}>
            {children}



        </DefaultContext.Provider>
    );
}
