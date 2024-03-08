import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { DefaultContext } from '../../context/context_default';
import { useNavigate } from "react-router-dom";
import { Card } from '../listaCards/componentes/card';

import imgBG from "../../assets/imagens/bg_card.jpg";
import imgIgn from "../../assets/imagens/ign.png";
import imgVerbus from "../../assets/imagens/verbus.png";
import imgKarma from "../../assets/imagens/karma.png";
import imgGnos from "../../assets/imagens/gnos.png";
import imgOmna from "../../assets/imagens/omna.png";
import imgDnama from "../../assets/imagens/dnama.png";
// import imgIgn from "../../assets/imagens/ign.png";
// require('../../assets/imagens/ign.png')
const CardDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [card, setCard] = useState(null)
    const [efeito, setEfeito] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false);
    const [cardsSemelhantes, setCardsSemelhantes] = useState([])
    const [contadorSemelhante, setContadorSemelhante] = useState(8)
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
        HTMLRenderer,
        replaceText
    } = useContext(DefaultContext);

    useEffect(() => {
        // getSubTipos();
        // getTipos();
        // getPalavrasChave();
        // getFortunas();
        // getCausas();
        // getRaridade();
        // getListCards();

        // console.log(id, listCards)
        setCard(listCards.find(e => e.id == id))
    }, [])

    useEffect(() => {
        // console.log(listCards.find(e => e.id == id))
        setCard(listCards.find(e => e.id == id))
    }, [listCards])

    useEffect(() => {
        // console.log("card", card)
        if (card) {
            setEfeito(replaceText(card.efeito))
        }
        setCardsSemelhantes(listCards.sort((a, b) => contarElementosIguais(card, b) - contarElementosIguais(card, a)));
        // const jsonsOrdenados = listCards.sort((a, b) => compararElementos(card, a, b));

        // console.log("Cards parecidos", jsonsOrdenados)
    }, [card])


    const handleImageLoad = () => {
        setImageLoaded(true);
        // setImageLoaded(false);

    };
    const replacesAll = (string, search, replace) => {
        return string.split(search).join(replace);
    }
    // const replaceText = (text) => {
    //     var img_quente = '<img style="width : 20px; height: 20px; display:inline; -webkit-filter: drop-shadow(0px 0px 3px #ff0050); filter: drop-shadow(0px 0px 3px #ff0050);" src='
    //     var img_algida = '<img style="width : 20px; height: 20px; display:inline; -webkit-filter: drop-shadow(0px 0px 3px #00a0ff); filter: drop-shadow(0px 0px 3px #00a0ff);" src='
    //     // console.log('text ====>', text)
    //     text = replacesAll(text, '[ign]', `${img_quente} ${imgIgn} ></img>`)
    //     text = replacesAll(text, '[verbus]', `${img_quente} ${imgVerbus} ></img>`)
    //     text = replacesAll(text, '[karma]', `${img_quente} ${imgKarma} ></img>`)
    //     text = replacesAll(text, '[gnos]', `${img_algida} ${imgGnos} ></img>`)
    //     text = replacesAll(text, '[dnama]', `${img_algida} ${imgDnama} ></img>`)
    //     text = replacesAll(text, '[omna]', `${img_algida} ${imgOmna} ></img>`)

    //     text = replacesAll(text, '[h-destruicao]', `[▲]`)
    //     text = replacesAll(text, '[destruicao]', `▲`)
    //     text = replacesAll(text, '[h-controle]', `[▶]`)
    //     text = replacesAll(text, '[controle]', `▶`)
    //     text = replacesAll(text, '[h-criacao]', `[▼]`)
    //     text = replacesAll(text, '[criacao]', `▼`)
    //     text = replacesAll(text, '[h-alteracao]', `[◀]`)
    //     text = replacesAll(text, '[alteracao]', `◀`)


    //     return text
    // }

    function contarElementosIguais(jsonReferencia, jsonComparacao) {
        let contador = 0;

        for (const chave in jsonReferencia) {

            if (chave === "efeito" && jsonReferencia["efeito"] && jsonReferencia["efeito"].toLowerCase().includes(jsonComparacao["nome"].toLowerCase())) {
                // console.log(jsonComparacao["nome"], jsonReferencia["efeito"])
                // console.log("sss", jsonReferencia[chave])
                // console.log(jsonComparacao["efeito"])
                contador += 5;
            }
            else if (chave === "vida" || chave === "p_a" || chave === "custo") {
                contador += compararValorNumerico(jsonReferencia[chave], jsonComparacao[chave]);
            }
            else if (Array.isArray(jsonReferencia[chave])) {
                const arrayReferencia = jsonReferencia[chave];
                const arrayComparacao = jsonComparacao[chave];

                if (arrayReferencia.length === arrayComparacao.length &&
                    arrayReferencia.every((valor, index) => valor === arrayComparacao[index])) {
                    contador++;
                }
            } else if (jsonComparacao[chave] === jsonReferencia[chave]) {
                contador++;
            }
        }

        return contador;
    }
    function compararValorNumerico(valorReferencia, valorComparacao) {
        // Ajuste conforme necessário para a relevância desejada
        const diferenca = Math.abs(Number(valorReferencia) - Number(valorComparacao));
        return (1 / (1 + diferenca)) * 2;  // Quanto menor a diferença, maior a relevância
    }


    const estiloDoComponente = {
        WebkitFilter: 'drop-shadow(0px 0px 1px #ffffff52)',
        filter: 'drop-shadow(0px 0px 1px #ffffff52)',

    };
    const estiloDoComponenteCard = {
        WebkitFilter: 'drop-shadow(0px 0px 4px #0f0f0f)',
        filter: 'drop-shadow(0px 0px 4px #0f0f0f)',
    };
    return (
        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-full w-full bg-cover bg-center flex justify-center md:justify-end items-cente overflow-hidden'>
            <div className={` mr-0 duration-200 bg-slate-700 bg-opacity-[94%] w-full h-full pt-20 transition-all p-2  overflow-y-auto`}>
                <div className='flex flex-col w-full  '>
                    {/* <div>Titulo aqui</div> */}
                    <div className='flex lg:flex-row lg:items-start flex-col  items-center w-full justify-center'>
                        <div className=' max-w-[400px] '><img className=' w-full h-full object-contain' style={estiloDoComponenteCard} src={card && imageLoaded && card?.url_img != '' ? card.url_img : require('../../assets/imagens/back_card.png')} loading="lazy" onLoad={handleImageLoad}></img></div>
                        {/* <img style={{ width: 20, height: 20 }} src={imgIgn}  ></img> */}
                        <div className='max-w-[400px]  flex flex-col px-3 mt-3' >
                            <div className='flex space-x-3'>
                                <div className='flex justify-center items-center h-full'>
                                    {card && causas && card.causa != '' ?
                                        <img style={estiloDoComponente} src={require('../../assets/imagens/' + causas.find(e => e.id == card.causa).causa + '.png')} class="w-8 h-8 object-cover mr-2" />
                                        // null
                                        : null}
                                    {card && causas && card.causa != '' ? causas.find(e => e.id == card.causa).causa : null}
                                </div>
                                <div className='flex justify-center items-center h-full'>
                                    {card && raridades && card.raridade != '' ?
                                        <img style={estiloDoComponente} src={require('../../assets/imagens/' + raridades.find(e => e.id == card.raridade)?.raridade + '.png')} class="w-8 h-8 object-cover mr-2" />
                                        // null
                                        : null}
                                    {card && raridades && card.raridade != '' ? raridades.find(e => e.id == card.raridade)?.raridade : null}
                                </div>
                            </div>

                            <div className='w-full border-b border-slate-400 my-6' ></div>
                            {card ?
                                <div className='flex flex-col'>
                                    <div className='font-bold'>{card.nome}</div>
                                    <div className='flex text-sm'>{card.tipo.map(e => tipos.find(t => t.id == e).tipo + ' ')} / {card.sub_tipo.map(e => subTipos.find(t => t.id == e).tipo + ' ')}</div>
                                </div> : null
                            }

                            <div className='w-full border-b border-slate-400 my-6' ></div>
                            {palavraChave && card ? card.p_c.map(id => {
                                return <div className='  text-white  border-l-2 my-2 '>
                                    {/* <div className='p-2'>{palavraChave.find(item => item.id == id).nome}</div> */}
                                    {/* <div className='border-b border-slate-400 '></div> */}
                                    <div className='ml-2  flex'>{<HTMLRenderer html={replaceText('<strong>' + palavraChave.find(item => item.id == id).nome + '</strong> - ' + palavraChave.find(item => item.id == id).descricao)} />}</div>
                                </div>
                            }) : null}
                            {efeito ? <HTMLRenderer html={efeito} /> : null}

                        </div>
                    </div>
                    <div className='flex items-center px-10 mt-10'>
                        <div className='w-full border-b border-slate-400 my-6' ></div>
                        <div className='min-w-fit px-6'>Cards Semelhantes</div>
                        <div className='w-full border-b border-slate-400 my-6' ></div>
                    </div>

                    <div className='flex justify-center mt-10'>
                        {cardsSemelhantes ?
                            <div className='grid md:grid-cols-4 grid-cols-2 w-fit gap-x-0 gap-y-0'>
                                {cardsSemelhantes.slice(1, contadorSemelhante + 1).map(item => <Link to={`/detail/${item?.id}`} onClick={(event) => { if (!event.ctrlKey) { window.location.href = `/detail/${item?.id}`; } }} className='mt-[-45px]'><Card card={item} zoom={false} index={1} columMax={contadorSemelhante} /> </Link>)}

                            </div> : null
                        }


                        {/* <div className='flex'><Card card={card} zoom={false} index={1} columMax={3} /></div> */}

                    </div>
                </div>
            </div>

        </div>

    )
}

export default CardDetail