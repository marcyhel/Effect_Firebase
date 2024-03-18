import React, { useEffect, useState, useContext } from 'react'
import { DefaultContext } from '../../../context/context_default';

// import imgBG from "../../../assets/imagens/2.png";
// import imgBG2 from "../../../assets/imagens/97. Thallarsce Quebrador de Realidades.png";

const ItemListDeck = ({ deck, profile = false }) => {
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
        usersList

    } = useContext(DefaultContext);
    const [card, setCard] = useState(null);
    const [causa, setCausa] = useState(null);
    const [fortunas_finais, setFortunas_finais] = useState(null);
    useEffect(() => {
        setCard(listCards.find(e => e.id == deck.quebrador))

        var matriz = deck.matriz.map(e => e.id)
        console.log(matriz)
        var cards_fortunas = listCards.filter(e => matriz.includes(e.id))
        var fortunas_id = [];
        var fortunas_fi = [];
        for (let item of cards_fortunas) {
            fortunas_id.push([...item.fortuna])
        }
        fortunas_id = fortunas_id.flat();
        fortunas_id = fortunas_id.filter((valor, indice, array) => {
            return array.indexOf(valor) === indice;
        });

        console.log('//', cards_fortunas)
        console.log("d", fortunas_id)

        fortunas_fi = fortunas.filter(e => fortunas_id.includes(e.id))
        setFortunas_finais(fortunas_fi)
        console.log("final", fortunas_fi)
    }, [listCards])
    useEffect(() => {
        setCausa(causas.find(e => e.id == card?.causa))
    }, [card])
    useEffect(() => {
        console.log(causa)
    }, [causa])


    const calcularDiferenca = (data, up) => {

        const milliseconds = data?.seconds * 1000 + Math.round(data?.nanoseconds / 1e6);

        const data1 = new Date(milliseconds);
        const data2 = new Date();

        const diferencaEmMilissegundos = Math.abs(data2 - data1);

        const segundos = Math.floor(diferencaEmMilissegundos / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        if (up) {
            if (dias > 0) {
                return `Atualizado há ${dias} ${dias !== 1 ? 'dias' : 'dia'}`;
            } else if (horas > 0) {
                return `Atualizado há ${horas} h`;
            } else if (minutos > 0) {
                return `Atualizado há ${minutos} min`;
            } else {
                return `Atualizado há ${segundos} s`;
            }
        }
        if (dias > 0) {
            return `Criado há ${dias} ${dias !== 1 ? 'dias' : 'dia'}`;
        } else if (horas > 0) {
            return `Criado há ${horas} h`;
        } else if (minutos > 0) {
            return `Criado há ${minutos} min`;
        } else {
            return `Criado há ${segundos} s`;
        }

    };

    const estiloDoComponente = {
        WebkitFilter: 'drop-shadow(0px 0px 1px #000000)',
        filter: 'drop-shadow(0px 0px 1px #000000)',
    };

    const estiloDoComponentFortunasquentes = {
        WebkitFilter: 'drop-shadow(0px 0px 1px #ff0000)',
        filter: 'drop-shadow(0px 0px 1px #ff0000)',

    };
    const estiloDoComponentFortunaslgidas = {
        WebkitFilter: 'drop-shadow(0px 0px 2px #00a0ff)',
        filter: 'drop-shadow(0px 0px 2px #00a0ff)',

    };

    return (


        <div style={{ backgroundImage: `url(${card?.url_img})`, backgroundPosition: 'center', backgroundPositionY: -90 }
        } className='bg-slate-600 md:w-44 md:h-56 w-36 h-48 border border-slate-700 rounded-2xl shadow hover:bg-slate-500 cursor-pointer  overflow-hidden relative' >
            <div className='bg-slate-600 bg-opacity-40 hover:bg-opacity-40 hover:bg-slate-400  w-full h-full'>
                <div className='bg-gradient-to-b from-transparent  to-slate-800 w-full h-full flex flex-col justify-end p-2'>
                    <div className='flex justify-between items-center'>< div className='text-xs' >{deck?.updated_at ? calcularDiferenca(deck?.updated_at, true) : calcularDiferenca(deck?.created_at, false)}</div > <div className='w-10 h-10'>{causa ? <img style={estiloDoComponente} src={require('../../../assets/imagens/' + causa.causa + '.png')}></img> : null}</div></div>
                    <div className='flex-1'></div>
                    < div style={{ textShadow: '0px 0px 3px rgba(0, 0, 0, 1)' }} className='  font-bold' >{deck.nome}</div >
                    <div>
                        <img></img>
                        <div>{usersList.find(e => e.id == deck.user_id)?.nome}</div>
                    </div>
                    <div className='border-b border-slate-200 border-opacity-50'></div>
                    < div className='flex mt-2 md:h-6 h-5' >
                        {fortunas_finais ? fortunas_finais.map(el => {
                            return <img className=" md:w-6  w-5" style={(el.tipo == 'Ign' || el.tipo == 'Karma' || el.tipo == 'Verbus') ? estiloDoComponentFortunasquentes : estiloDoComponentFortunaslgidas} src={require('../../../assets/imagens/' + el.tipo.toLowerCase() + '.png')} ></img>
                        }) : null}
                    </div >
                </div>


            </div>
            {/* <img src={imgBG2} alt="Imagem" class="z-0 absolute top-[-63px] left-[-10px] object-cover  w-[200px] h-[570px] [clip-path:polygon(12%_11%,120%_11%,120%_50%,12%_50%)]"></img> */}


        </div >




    )
}

export default ItemListDeck