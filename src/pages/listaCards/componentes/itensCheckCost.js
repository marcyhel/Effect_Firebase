import React, { useEffect } from 'react'

const ItensCheckCost = ({ value, setValue, filter, text }) => {
    const click = async () => {
        console.log(value, filter)
        if (filter.find(item => item == value)) {

            const index = filter.indexOf(value);
            if (index > -1) {
                filter.splice(index, 1);
                setValue([...filter])
            }
        } else {
            setValue([...filter, value])
        }
    }
    return (
        <div onClick={click} className={`${filter.find(item => item == value) ? 'bg-slate-400' : 'bg-slate-600'} flex-1 h-10 cursor-pointer flex justify-center items-center border-l border-slate-500`}>
            {text}
        </div>
    )
}

export default ItensCheckCost