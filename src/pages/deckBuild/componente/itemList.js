import React, { useEffect, useRef, useContext, useState } from 'react'
import { DefaultContext } from '../../../context/context_default';
// import imgBG from "../../../assets/imagens/2.png";

const ItemListDeckBuild = ({ item, lessItem, addItem }) => {
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
        if (elemento) {
            const { x, y } = elemento.getBoundingClientRect();

            return y
        }
        return 600;
    };

    useEffect(() => {
        // console.log("--i", item)
        // console.log("-", listCards.find(e => e.id == item.id))
        setCard(listCards.find(e => e.id == item.id))
    }, [item])

    const hovering = () => { setShowCardFlutuante({ y: getPosition(), url_img: card.url_img }) };
    const notHovering = () => setShowCardFlutuante(false);
    let hoverTimer;
    const handleMouseEnter = () => {
        hoverTimer = setTimeout(() => {
            setShowCardFlutuante({ y: getPosition(), url_img: card.url_img })
        }, 500);
    };
    useEffect(() => {
        // console.log("--", card)
    }, [card])

    const handleMouseLeave = () => {
        setShowCardFlutuante(false);
        clearTimeout(hoverTimer);

    };

    return (
        card ?
            <div ref={meuElementoRef} className='w-full relative'>
                <div className={`absolute w-[250px] h-9 top-0 mt-4  right-[100px] z-30 opacity-0 ${showOverlay ? "opacity-100 visible" : "invisible"} transition duration-300 flex flex-col space-y-2`}>
                    <div className=' bg-slate-800 text-white  border-l-4 border-blue-500'>
                        sdsd
                    </div>


                </div>
                <div className='rounded bg-auto bg-center w-full h-9 border border-slate-400 mb-1 cursor-pointer select-none' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <div className='bg-gradient-to-r from-slate-800 rounded w-full h-9 flex items-center '>
                        <div className='w-full flex hover:bg-slate-800 hover:bg-opacity-30 pl-1 pt-1 pb-1 ' onClick={() => { lessItem(item.id) }}>
                            <div className='flex justify-center items-center p-1 rounded-full border border-slate-800 bg-slate-600 w-6 h-6 mr-2 '>{card.custo ? card.custo : 0}</div>
                            <div className='w-44'>
                                <div className='  truncate text-ellipsis'>
                                    {card.nome}
                                </div>
                            </div>


                            <div className='flex-1'></div>
                        </div>
                        <div className='mr-1 mt-1 mb-1' onClick={() => { addItem(item.id) }}>
                            <div className=' hover:bg-slate-500  flex justify-center items-center p-1 rounded border border-slate-800 bg-slate-600 w-7 h-7 select-none'>x{item.qtd}</div>

                        </div>

                    </div>
                </div>

            </div>
            : null

    )
}

export default ItemListDeckBuild