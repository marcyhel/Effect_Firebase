import React, { useEffect, useRef, useContext, useState } from 'react'
import { DefaultContext } from '../../../context/context_default';
import { Card } from '../../listaCards/componentes/card'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const CardsCuston = ({ card, zoom, columnIndex, column_count }) => {
    const {
        listCards,
        listCardDeck,
        setListCardDeck,
        raridades

    } = useContext(DefaultContext);
    const [raridadeName, setRaridadeName] = useState('');
    const [contMax, setCountmax] = useState(0);
    const [contAtual, setContAtual] = useState(0);

    useEffect(() => {
        var raridade = raridades?.find(r => r?.id == card?.raridade)
        console.log(raridade?.raridade)
        setRaridadeName(raridade?.raridade)

    }, [])

    useEffect(() => {
        var raridade = raridades?.find(r => r?.id == card?.raridade)
        console.log(raridade?.raridade)
        setRaridadeName(raridade?.raridade)

    }, [listCardDeck])
    return (
        <div className='relative group'>


        </div>
    )
}

export default CardsCuston