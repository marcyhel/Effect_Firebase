import React, { useState, useContext, useEffect } from 'react'


import { DefaultContext } from '../../context/context_default';
import CardDB from '../../database/wrappers/cards';
import { TailSpin } from 'react-loader-spinner'
const UparCardfa = () => {

    const {
        globalFirestoreData,
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
        listCards

    } = useContext(DefaultContext);

    const [nome, setNome] = useState('')
    const [causa, setCausa] = useState('')
    const [custo, setCusto] = useState('')
    const [pa, setPa] = useState('')
    const [vida, setVida] = useState('')
    const [raridade, setRaridade] = useState('')
    const [efeito, setEfeito] = useState('')
    const [img, setImg] = useState('')

    const [load, setLoad] = useState(false)
    const [idEdit, setIdEdit] = useState(false)
    // const [nome, setNome] = useState('')
    // const [nome, setNome] = useState('')
    // const [nome, setNome] = useState('')

    const [valueTipo, setValueTipo] = useState('')
    const [valueSubTipo, setValueSubTipo] = useState('')
    const [valuePalavrasChave, setValuePalavrasChave] = useState('')
    const [valueFortunas, setValueFortunas] = useState('')
    const [valueFortunasCusto, setValueFortunasCusto] = useState('')

    const [filtersubTipos, setFilterSubTipos] = useState([])
    const [filterTipos, setFilterTipos] = useState([])
    const [filterPalavrasChave, setFilterPalavrasChave] = useState([])
    const [filterFortunas, setFilterFortunas] = useState([])
    const [filterFortunasCusto, setFilterFortunasCusto] = useState([])

    const [selectTipos, setSelectTipos] = useState([])
    const [selectSubTipos, setSelectSubTipos] = useState([])
    const [selectPalavrasChave, setSelectPalavrasChave] = useState([])
    const [selectFortunas, setSelectFortunas] = useState([])
    const [selectFortunasCusto, setSelectFortunasCusto] = useState([])

    const [deckTipe, setDeckTipe] = useState('')


    const [isEdit, setIsEdit] = useState(false)
    const [oldImageUrl, setOldImageUrl] = useState('')


    const limparForm = () => {
        setNome('')
        setCausa('')
        setCusto('')
        setPa('')
        setVida('')
        setRaridade('')
        setDeckTipe('')
        setEfeito('')
        setImg('')
        setSelectTipos([])
        setSelectSubTipos([])
        setSelectPalavrasChave([])
        setSelectFortunas([])
        setSelectFortunasCusto([])
    }

    useEffect(() => {

        // getSubTipos();
        // getTipos();
        // getPalavrasChave();
        // getFortunas();
        // getCausas();
        // getRaridade();

    }, [])

    const init_edit = (card) => {
        console.log('1', tipos)
        console.log('2', card.tipo)
        console.log('3', card.tipo.map(e => { return { id: e, tipo: tipos.find(t => t.id == e).tipo } }))

        setIdEdit(card.id)
        setIsEdit(true);
        setNome(card.nome)
        setVida(card.vida)
        setRaridade(card.raridade)
        setCausa(card.causa)
        setCusto(card.custo)
        setPa(card.p_a)
        setVida(card.vida)
        setRaridade(card.raridade)
        setDeckTipe(card.deckTipo)
        setEfeito(card.efeito)
        setImg(card.url_img)
        setOldImageUrl(card.url_img)

        setSelectTipos(card.tipo.map(e => { return { id: e, tipo: tipos.find(t => t.id == e).tipo } }))
        setSelectSubTipos(card.sub_tipo.map(e => { return { id: e, tipo: subTipos.find(t => t.id == e).tipo } }))
        setSelectPalavrasChave(card.p_c.map(e => { return { id: e, nome: palavraChave.find(t => t.id == e).nome } }))
        setSelectFortunas(card.fortuna.map(e => { return { id: e, tipo: fortunas.find(t => t.id == e).tipo } }))
        setSelectFortunasCusto(card.fortunaCusto.map(e => { return { id: e, tipo: fortunas.find(t => t.id == e).tipo } }))
    }

    const subTipoChange = (event) => {
        setValueSubTipo(event.target.value)
        if (event.target.value != "" && event.target.value != null) {
            setFilterSubTipos(subTipos.filter(e => e.tipo.toLowerCase().includes(event.target.value.toLowerCase())));
        } else {
            setFilterSubTipos([])
        }
    };
    const tipoChange = (event) => {
        setValueTipo(event.target.value)
        if (event.target.value != "" && event.target.value != null) {
            setFilterTipos(tipos.filter(e => e.tipo.toLowerCase().includes(event.target.value.toLowerCase())));
        } else {
            setFilterTipos([])
        }
    };
    const palavrasChaveChange = (event) => {
        setValuePalavrasChave(event.target.value)
        if (event.target.value != "" && event.target.value != null) {
            setFilterPalavrasChave(palavraChave.filter(e => e.nome.toLowerCase().includes(event.target.value.toLowerCase())));
        } else {
            setFilterPalavrasChave([])
        }
    };
    const fortunasChange = (event) => {
        setValueFortunas(event.target.value)
        if (event.target.value != "" && event.target.value != null) {
            setFilterFortunas(fortunas.filter(e => e.tipo.toLowerCase().includes(event.target.value.toLowerCase())));
        } else {
            setFilterFortunas([])
        }
    };
    const fortunasChangeCusto = (event) => {
        setValueFortunasCusto(event.target.value)
        if (event.target.value != "" && event.target.value != null) {
            setFilterFortunasCusto(fortunas.filter(e => e.tipo.toLowerCase().includes(event.target.value.toLowerCase())));
        } else {
            setFilterFortunasCusto([])
        }
    };
    const addTipo = (item) => {
        setSelectTipos([...selectTipos, item])
        setFilterTipos([])
        setValueTipo('')
    }
    const removeTipo = (item) => {
        var index = selectTipos.indexOf(item);
        if (index !== -1) {
            selectTipos.splice(index, 1);
        }
        setSelectTipos(selectTipos)
        setFilterTipos([])
        setValueTipo('')
    }
    const addSubTipo = (item) => {
        setSelectSubTipos([...selectSubTipos, item])
        setFilterSubTipos([])
        setValueSubTipo('')
    }
    const removeSubTipo = (item) => {
        var index = selectSubTipos.indexOf(item);
        if (index !== -1) {
            selectSubTipos.splice(index, 1);
        }
        setSelectSubTipos(selectSubTipos)
        setFilterSubTipos([])
        setValueSubTipo('')
    }
    const addPalavrasChave = (item) => {
        setSelectPalavrasChave([...selectPalavrasChave, item])
        setFilterPalavrasChave([])
        setValuePalavrasChave('')
    }
    const removePalavrasChave = (item) => {
        var index = selectPalavrasChave.indexOf(item);
        if (index !== -1) {
            selectPalavrasChave.splice(index, 1);
        }
        setSelectPalavrasChave(selectPalavrasChave)
        setFilterPalavrasChave([])
        setValuePalavrasChave('')
    }
    const addFortunas = (item) => {
        setSelectFortunas([...selectFortunas, item])
        setFilterFortunas([])
        setValueFortunas('')
    }
    const removeFortunas = (item) => {
        var index = selectFortunas.indexOf(item);
        if (index !== -1) {
            selectFortunas.splice(index, 1);
        }
        setSelectFortunas(selectFortunas)
        setFilterFortunas([])
        setValueFortunas('')
    }
    const addFortunasCusto = (item) => {
        setSelectFortunasCusto([...selectFortunasCusto, item])
        setFilterFortunasCusto([])
        setValueFortunasCusto('')
    }
    const removeFortunasCusto = (item) => {
        var index = selectFortunasCusto.indexOf(item);
        if (index !== -1) {
            selectFortunasCusto.splice(index, 1);
        }
        setSelectFortunasCusto(selectFortunasCusto)
        setFilterFortunasCusto([])
        setValueFortunasCusto('')
    }

    const enviar = () => {
        setLoad(true)
        const form = {
            nome: nome,
            causa: causa,
            custo: custo,
            p_a: pa,
            vida: vida,
            raridade: raridade,
            efeito: efeito,
            tipo: selectTipos.map(e => e.id) || [],
            sub_tipo: selectSubTipos.map(e => e.id) || [],
            p_c: selectPalavrasChave.map(e => e.id) || [],
            fortuna: selectFortunas.map(e => e.id) || [],
            deckTipo: deckTipe,
            fortunaCusto: selectFortunasCusto.map(e => e.id) || [],
        }
        console.log(form)
        const cardDb = new CardDB()
        cardDb.uploadFile(img).then(result => {
            console.log('resultado', result)
            form['url_img'] = result
            cardDb.create(form).then(resultadoFinal => {
                console.log(resultadoFinal)
                limparForm()
            })
        })
        setLoad(false)

    }

    const enviarEdit = () => {
        setLoad(true)
        const form = {
            nome: nome,
            causa: causa,
            custo: custo,
            p_a: pa,
            vida: vida,
            raridade: raridade,
            efeito: efeito,
            tipo: selectTipos.map(e => e.id) || [],
            sub_tipo: selectSubTipos.map(e => e.id) || [],
            p_c: selectPalavrasChave.map(e => e.id) || [],
            fortuna: selectFortunas.map(e => e.id) || [],
            deckTipo: deckTipe,
            fortunaCusto: selectFortunasCusto.map(e => e.id) || [],
        }
        console.log(form)
        if (img instanceof File) {
            const cardDb = new CardDB();
            cardDb.deleteFile(oldImageUrl) // Excluir imagem antiga
                .then(() => {
                    cardDb.uploadFile(img).then(result => {
                        form['url_img'] = result;
                        // Realizar a edição com a nova imagem
                        cardDb.update(idEdit, form).then(resultadoFinal => {
                            console.log(resultadoFinal);
                            limparForm();
                        });
                    });
                })
                .catch(error => {
                    console.error('Erro ao excluir imagem antiga:', error);
                });
        } else {
            // Se nenhuma nova imagem for carregada, apenas realizar a edição
            const cardDb = new CardDB();
            cardDb.update(idEdit, form).then(resultadoFinal => {
                console.log(resultadoFinal);
                limparForm();
            });
        }


        setLoad(false)

    }
    return (

        <div className='flex flex-col w-full mt-16 space-y-4 p-4'>
            {globalFirestoreData.role == "admin" ?
                <div className='flex'>
                    <div className='h-full w-[200px] mr-2'>
                        {listCards.map(item => {
                            return (
                                <div className='w-full h-[250px] flex flex-col items-start mb-8' onClick={() => { init_edit(item) }}>
                                    <img className=' w-full h-full object-contain' src={item && item?.url_img != '' ? item.url_img : require('../../assets/imagens/back_card.png')} loading="lazy"></img>
                                    <label className='ml-4'>{item.nome}</label>
                                    <div className='border-b border-gray-400 w-full'></div>
                                </div>
                            )
                        }
                        )}
                    </div>
                    <div className='flex-1' >

                        <div className='flex flex-wrap md:space-x-4'>
                            <div className="flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                    <input type="text" onChange={(event) => { setNome(event.target.value) }} value={nome} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>

                            </div>
                            <div className=" flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Causa</label>

                                    <select id="countries" onChange={event => setCausa(event.target.value)} value={causa} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value='' selected>Sem Causa</option>
                                        {causas.map(item => {
                                            return <option value={item.id}>{item.causa}</option>
                                        })}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-wrap  md:space-x-4'>
                            <div className=" min-h-min flex-1  relative md:min-w-min min-w-[300px]">

                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                                <div className='bg-slate-500 w-full h-11 rounded-md p-1 mb-1 flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm border border-gray-800 border-1'>
                                    {selectTipos.map(item => {
                                        return <div className='bg-slate-600 pl-3 pr-1 py-1 rounded-lg flex justify-center items-center'>{item.tipo} <button onClick={() => { removeTipo(item) }} className='flex justify-center items-center ml-2 h-6 w-6 rounded-full hover:bg-slate-700'>x</button> </div>
                                    })}
                                </div>
                                <input onChange={tipoChange} value={valueTipo} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                {filterTipos.length ? <div className='w-full max-h-[150px] z-50 bg-white absolute rounded-md mt-1 overflow-y-scroll p-4'>
                                    {filterTipos.map(item => {
                                        return (<div key={item.id} onClick={() => { addTipo(item) }} className='text-black hover:bg-slate-200 py-2 px-4 rounded cursor-pointer'>{item.tipo}</div>)
                                    })}
                                </div> : null}

                            </div>
                            <div className="min-h-min flex-1 relative md:min-w-min min-w-[300px] ">

                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subtipo</label>
                                <div className='bg-slate-500 w-full h-11 rounded-md p-1 mb-1 flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm border border-gray-800 border-1'>
                                    {selectSubTipos.map(item => {
                                        return <div className='bg-slate-600 pl-3 min-w-fit pr-1 py-1 rounded-lg flex justify-center items-center'>{item.tipo} <button onClick={() => { removeSubTipo(item) }} className='flex justify-center items-center ml-2 h-6 w-6 rounded-full hover:bg-slate-700'>x</button> </div>
                                    })}
                                </div>
                                <input onChange={subTipoChange} value={valueSubTipo} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                {filtersubTipos.length ? <div className='w-full max-h-[150px]   z-50 bg-white absolute rounded-md mt-1 overflow-y-scroll p-4'>
                                    {filtersubTipos.map(item => {
                                        return (<div key={item.id} onClick={() => { addSubTipo(item) }} className='text-black hover:bg-slate-200 py-2 px-4 rounded cursor-pointer'>{item.tipo}</div>)
                                    })}
                                </div> : null}

                            </div>
                        </div>

                        <div className='flex flex-wrap  md:space-x-4'>
                            <div className="min-h-min flex-1 md:min-w-min min-w-[300px]">
                                <div className='relative'>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Palavras Chaves</label>
                                    <div className='bg-slate-500 w-full h-11 rounded-md p-1 mb-1 flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm border border-gray-800 border-1'>
                                        {selectPalavrasChave.map(item => {
                                            return <div className='bg-slate-600 pl-3 pr-1 py-1 rounded-lg flex justify-center items-center'>{item.nome} <button onClick={() => { removePalavrasChave(item) }} className='flex justify-center items-center ml-2 h-6 w-6 rounded-full hover:bg-slate-700'>x</button> </div>
                                        })}
                                    </div>
                                    <input onChange={palavrasChaveChange} value={valuePalavrasChave} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                    {filterPalavrasChave.length ? <div className='w-full max-h-[150px]   z-50 bg-white absolute rounded-md mt-1 overflow-y-scroll p-4'>
                                        {filterPalavrasChave.map(item => {
                                            return (<div key={item.id} onClick={() => { addPalavrasChave(item) }} className='text-black hover:bg-slate-200 py-2 px-4 rounded cursor-pointer'>{item.nome}</div>)
                                        })}
                                    </div> : null}

                                </div>
                            </div>
                            <div className="min-h-min flex-1 md:min-w-min min-w-[300px]">
                                <div className='relative'>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fortunas</label>
                                    <div className='bg-slate-500 w-full h-11 rounded-md p-1 mb-1 flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm border border-gray-800 border-1'>
                                        {selectFortunas.map(item => {
                                            return <div className='bg-slate-600 pl-3 pr-1 py-1 rounded-lg flex justify-center items-center'>{item.tipo} <button onClick={() => { removeFortunas(item) }} className='flex justify-center items-center ml-2 h-6 w-6 rounded-full hover:bg-slate-700'>x</button> </div>
                                        })}
                                    </div>
                                    <input onChange={fortunasChange} value={valueFortunas} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                    {filterFortunas.length ? <div className='w-full max-h-[150px]   z-50 bg-white absolute rounded-md mt-1 overflow-y-scroll p-4'>
                                        {filterFortunas.map(item => {
                                            return (<div key={item.id} onClick={() => { addFortunas(item) }} className='text-black hover:bg-slate-200 py-2 px-4 rounded cursor-pointer'>{item.tipo}</div>)
                                        })}
                                    </div> : null}

                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap md:space-x-4'>
                            <div className="flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custo</label>
                                    <input type="text" id="first_name" onChange={(event) => { setCusto(event.target.value) }} value={custo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                            </div>
                            <div className=" flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poder de ataque</label>
                                    <input type="text" id="first_name" onChange={(event) => { setPa(event.target.value) }} value={pa} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                            </div>
                            <div className=" flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vida</label>
                                    <input type="text" id="first_name" onChange={(event) => { setVida(event.target.value) }} value={vida} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap md:space-x-4'>
                            <div className=" flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raridade</label>
                                    <select id="countries" onChange={event => setRaridade(event.target.value)} value={raridade} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value='' selected>Sem Raridade</option>
                                        {raridades.map(item => {
                                            return <option value={item.id}>{item.raridade}</option>
                                        })}
                                    </select>

                                </div>
                            </div>
                            <div className=" flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Efeito</label>
                                    <textarea type="text" rows="2" id="first_name" onChange={(event) => { setEfeito(event.target.value) }} value={efeito} className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                </div>
                            </div>
                        </div>
                        <div className='flex'>

                            <div className=" flex-1 min-h-min md:min-w-min min-w-[300px]">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deck</label>
                                    <select id="countries" onChange={event => setDeckTipe(event.target.value)} value={deckTipe} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value='' selected>Sem Deck</option>
                                        <option value='0' >Arvore</option>
                                        <option value='1' >Matriz</option>

                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className="min-h-min flex-1 md:min-w-min min-w-[300px]">
                            <div className='relative'>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fortunas Custo </label>
                                <div className='bg-slate-500 w-full h-11 rounded-md p-1 mb-1 flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-rounded-sm border border-gray-800 border-1'>
                                    {selectFortunasCusto.map(item => {
                                        return <div className='bg-slate-600 pl-3 pr-1 py-1 rounded-lg flex justify-center items-center'>{item.tipo} <button onClick={() => { removeFortunasCusto(item) }} className='flex justify-center items-center ml-2 h-6 w-6 rounded-full hover:bg-slate-700'>x</button> </div>
                                    })}
                                </div>
                                <input onChange={fortunasChangeCusto} value={valueFortunasCusto} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                {filterFortunasCusto.length ? <div className='w-full max-h-[150px]   z-50 bg-white absolute rounded-md mt-1 overflow-y-scroll p-4'>
                                    {filterFortunasCusto.map(item => {
                                        return (<div key={item.id} onClick={() => { addFortunasCusto(item) }} className='text-black hover:bg-slate-200 py-2 px-4 rounded cursor-pointer'>{item.tipo}</div>)
                                    })}
                                </div> : null}

                            </div>
                        </div>
                        <div className='flex'>

                            <div className=" flex-1 ">
                                <div className=" flex-1 min-h-min ">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Imagem</label>
                                    <input onChange={(event) => setImg(event.target.files[0])} className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" />
                                </div>

                            </div>
                        </div>

                        <button onClick={isEdit ? enviarEdit : enviar} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded max-w-min'>{load ? <TailSpin
                            height="24"
                            width="24"
                            color="#ffffff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> : "Enviar"}</button>
                    </div>
                </div>
                : <div>Apenas Admin</div>}

        </div>
    )
}

export default UparCardfa