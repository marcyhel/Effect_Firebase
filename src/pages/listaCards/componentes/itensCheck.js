import React, { useEffect } from 'react'

const ItensCheck = ({ value, setValue, filter, img = null, origin, text }) => {
    const click = async () => {
        if (filter.find(item => item.id == value.id)) {
            const index = filter.indexOf(value);
            if (index > -1) {
                filter.splice(index, 1);
                setValue([...filter])
            }
        } else {
            setValue([...filter, value])
        }
    }
    const estiloDoComponente = {
        WebkitFilter: 'drop-shadow(0px 0px 0px #ffffff)',
        filter: 'drop-shadow(0px 0px 0px #ffffff)',
    };

    return (
        <div class="flex items-center cursor-pointer m-1 flex-1" onClick={click}>
            <input type="checkbox" id="custom-checkbox" class="hidden" />
            <label for="custom-checkbox" class="cursor-pointer">
                <div class="w-7 h-7  overflow-hidden flex items-center justify-center">
                    {require('../../../assets/imagens/' + text + '.png') ? <img style={estiloDoComponente} src={require('../../../assets/imagens/' + text + '.png')} class="w-full h-full object-cover" /> : null}
                </div>
            </label>
            <span class={`${filter.find(item => item.id == value.id) ? 'text-white' : 'text-gray-500'} ml-2`}>{text}</span>
        </div>
    )
}

export default ItensCheck