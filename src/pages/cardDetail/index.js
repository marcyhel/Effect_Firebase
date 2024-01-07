import React, { useEffect, useContext, useState } from 'react'
import { useParams } from "react-router-dom";
import { DefaultContext } from '../../context/context_default';

import imgBG from "../../assets/imagens/bg_card.jpg";
import imgIgn from "../../assets/imagens/ign.png";
import imgVerbus from "../../assets/imagens/verbus.png";
import imgKarma from "../../assets/imagens/karma.png";
import imgGnos from "../../assets/imagens/gnus.png";
import imgOmna from "../../assets/imagens/omna.png";
import imgDnama from "../../assets/imagens/dnama.png";
// import imgIgn from "../../assets/imagens/ign.png";
// require('../../assets/imagens/ign.png')
const CardDetail = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null)
    const [efeito, setEfeito] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false);

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

        console.log(id, listCards)
        setCard(listCards.find(e => e.id == id))
    }, [])

    useEffect(() => {
        setCard(listCards.find(e => e.id == id))
    }, [listCards])

    useEffect(() => {
        console.log("card", card)
        if (card) {
            setEfeito(replaceText(card.efeito))
        }

    }, [card])

    function HTMLRenderer({ html }) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    const handleImageLoad = () => {
        // setImageLoaded(true);
        setImageLoaded(false);

    };
    const replacesAll = (string, search, replace) => {
        return string.split(search).join(replace);
    }
    const replaceText = (text) => {
        var img_quente = '<img style="width : 20px; height: 20px; display:inline; -webkit-filter: drop-shadow(0px 0px 3px #ff0050); filter: drop-shadow(0px 0px 3px #ff0050);" src='
        var img_algida = '<img style="width : 20px; height: 20px; display:inline; -webkit-filter: drop-shadow(0px 0px 3px #00a0ff); filter: drop-shadow(0px 0px 3px #00a0ff);" src='
        console.log('text ====>', text)
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


        return text
    }

    return (
        <div style={{ backgroundImage: `url(${imgBG})`, }} className='h-full w-full bg-cover bg-center flex justify-center md:justify-end items-cente overflow-hidden'>
            <div className={` mr-0 duration-200 bg-slate-700 bg-opacity-[94%] w-full h-full pt-20 transition-all p-2  overflow-y-auto`}>
                <div className='flex flex-col w-full  '>
                    <div>Titulo aqui</div>
                    <div className='flex w-full justify-center'>
                        <div className=' max-w-[400px] '><img className=' w-full h-full object-contain' src={imageLoaded ? card.url_img : require('../../assets/imagens/back_card.png')} loading="lazy" onLoad={handleImageLoad}></img></div>
                        {/* <img style={{ width: 20, height: 20 }} src={imgIgn}  ></img> */}
                        <div className='max-w-[400px]  flex flex-col px-2 mt-3' >
                            <div className='flex space-x-3'>
                                <div>{card && causas ? causas.find(e => e.id == card.causa).causa : null}</div>
                                <div>{card && raridades ? raridades.find(e => e.id == card.raridade).raridade : null}</div>
                            </div>

                            <div className='w-full border-b border-slate-400 my-2' ></div>

                            {efeito ? <HTMLRenderer html={efeito} /> : null}

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default CardDetail