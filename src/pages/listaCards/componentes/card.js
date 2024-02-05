import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { DefaultContext } from '../../../context/context_default';

export const Card = ({ card, zoom, index, columMax }) => {
    const navigate = useNavigate()
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
        replaceText,
        HTMLRenderer

    } = useContext(DefaultContext);

    // console.log(card)
    useEffect(() => {
        // getSubTipos();
        // getTipos();
        // getPalavrasChave();
        // getFortunas();
        // getCausas();
        // getRaridade();
        // getListCards();



    }, [])

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imagen, setImage] = useState(false);

    const [showOverlay, setshowOverlay] = useState(false);
    const hovering = () => setshowOverlay(true);
    const notHovering = () => setshowOverlay(false);
    // console.log(card)

    const handleImageLoad = () => {
        // setImageLoaded(true);
        setImageLoaded(false);

    };


    return (
        <div className={`${zoom ? "w-[245px] h-[345px]" : "w-[145px] h-[245px]"} m-[1px] relative  `} >

            <div className={`${zoom ? "hover:w-[251px] hover:h-[355px]" : "hover:w-[151px] hover:h-[255px] "} hover:translate-x-[-3px] hover:translate-y-[-5px] h-full w-full duration-100 cursor-pointer `} onMouseEnter={hovering} onMouseLeave={notHovering}>

                <img className=' w-full h-full object-contain' src={imageLoaded ? card.url_img : require('../../../assets/imagens/back_card.png')} loading="lazy" onLoad={handleImageLoad}></img>
            </div>
            <div className={`absolute w-[250px] h-9 top-0 mt-4 ${(!zoom ? (index === columMax || index === columMax - 1) : (index === columMax)) ? "left-[-250px]" : "right-[-250px]"}  z-20 opacity-0 ${showOverlay ? "opacity-100 visible" : "invisible"} transition duration-300 flex flex-col space-y-2`}>
                {palavraChave && card ? card.p_c.map(id => {
                    return <div className=' bg-slate-800 text-white  border-l-4 border-blue-500'>
                        <div className='p-2'>{palavraChave.find(item => item.id == id).nome}</div>
                        <div className='border-b border-slate-700 '></div>
                        <div className='p-2 text-xs'>{<HTMLRenderer html={replaceText(palavraChave.find(item => item.id == id).descricao)} />}</div>
                    </div>
                }) : null}

            </div>

        </div>
    )
}
