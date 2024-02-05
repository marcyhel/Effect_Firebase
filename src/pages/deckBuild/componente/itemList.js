import React, { useEffect, useRef, useContext, useState } from 'react'
import { DefaultContext } from '../../../context/context_default';
import imgBG from "../../../assets/imagens/2.png";

const ItemListDeckBuild = ({ item, qtd, }) => {
    const [card, setCard] = useState(null);
    const [showOverlay, setshowOverlay] = useState(false);
    const meuElementoRef = useRef(null);
    const {
        listCards,
        showCardFlutuante,
        setShowCardFlutuante
    } = useContext(DefaultContext);
    function getPosition() {
        const elemento = meuElementoRef.current;
        console.log("aaa6")
        if (elemento) {
            const { x, y } = elemento.getBoundingClientRect();
            console.log('Posição X:', x);
            console.log('Posição Y:', y);
            return y
        }
        return 600;
    }; // Executado apenas uma vez após a montagem do componente
    useEffect(() => {
        setCard(listCards.find(e => e.id == item))
    }, [])
    const hovering = () => { setShowCardFlutuante({ y: getPosition(), url_img: card.url_img }) };
    const notHovering = () => setShowCardFlutuante(false);

    return (
        card ?
            <div ref={meuElementoRef} className='w-full relative'>
                <div className={`absolute w-[250px] h-9 top-0 mt-4  right-[100px] z-30 opacity-0 ${showOverlay ? "opacity-100 visible" : "invisible"} transition duration-300 flex flex-col space-y-2`}>
                    <div className=' bg-slate-800 text-white  border-l-4 border-blue-500'>
                        sdsd
                    </div>


                </div>
                <div className='rounded bg-auto bg-center w-full h-9 border border-slate-400 mb-1 cursor-pointer' onMouseEnter={hovering} onMouseLeave={notHovering} >
                    <div className='bg-gradient-to-r from-blue-900 rounded w-full h-9 flex items-center p-1'>
                        <div className='flex justify-center items-center p-1 rounded-full border border-slate-800 bg-slate-600 w-6 h-6 mr-2'>{card.custo ? card.custo : 0}</div>
                        {card.nome}
                        <div className='flex-1'></div>
                        <div className='flex justify-center items-center p-1 rounded border border-slate-800 bg-slate-600 w-7 h-7'>x{qtd}</div>
                    </div>
                </div>

            </div>
            : null

    )
}

export default ItemListDeckBuild