import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

export const Card = ({ card, zoom }) => {
    const navigate = useNavigate()

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
        // setImageLoaded(false);

    };


    return (
        <div className={`${zoom ? "w-[245px] h-[345px]" : "w-[145px] h-[245px]"} m-[1px] `}>
            <div onClick={() => { navigate("/detail/" + card.id) }} className={`${zoom ? "hover:w-[251px] hover:h-[355px]" : "hover:w-[151px] hover:h-[255px] "} hover:translate-x-[-3px] hover:translate-y-[-5px] h-full w-full duration-100 cursor-pointer`}>

                <img className=' w-full h-full object-contain' src={imageLoaded ? card.url_img : require('../../../assets/imagens/back_card.png')} loading="lazy" onLoad={handleImageLoad}></img>
            </div>

        </div>
    )
}
