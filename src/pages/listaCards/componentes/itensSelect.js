import React from 'react'
import Select from 'react-select'
const ItensSelect = ({ value, setValue, filter, text }) => {
    // console.log(value)
    return (
        <Select
            closeMenuOnSelect={false}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    // borderColor: state.isFocused ? 'grey' : 'red',
                    backgroundColor: 'rgb(71 85 105)'
                }),
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                    ...theme.colors,
                    primary25: 'rgb(91 105 125)', //hover list
                    primary: 'rgb(101 125 135)', //border select
                    neutral0: 'rgb(71 85 105)', //banner com as opções
                    neutral10: 'rgb(151 165 185)',//item select
                    neutral40: 'rgb(200 230 250)',//text banner
                    neutral60: 'rgb(151 165 185)', //clean campo
                    neutral90: 'green',
                    neutral80: 'rgb(230 230 230)',//text
                    neutral50: 'rgb(200 200 200)'//placeholder
                },
            })}
            onChange={(e) => { setValue(e.map(item => { return { 'id': item.value, 'tipo': item.label } })) }}

            isMulti
            options={value.map(item => { return { 'value': item.id, 'label': item.tipo ? item.tipo : item.raridade } })}
        />
    )
}

export default ItensSelect