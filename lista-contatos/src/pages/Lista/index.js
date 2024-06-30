import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link} from 'react-router-dom';
import "./style.css"




function Lista() {
    const [contatos, setContatos] = useState([]);
    const [filterGender, setFilterGender] = useState('');
    const [filterAgeMax, setFilterAgeMax] = useState(undefined);
    const [filterAgeMin, setFilterAgeMin] = useState(undefined);
    const [filterMonthBirth, setFilterMonthBirth] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('');
    
    async function deletarContato(id) {
        if (window.confirm("Deseja deletar o contato de id: " + id + '?')) {

            let contatoStorage = localStorage.getItem('contatos');
            if (contatoStorage != null) {
                contatoStorage = JSON.parse(contatoStorage)
                contatoStorage = contatoStorage.filter(r => r.id !== id)
                localStorage.setItem('contatos', JSON.stringify(contatoStorage));
                
                alert('Contato apagado!!')
                window.location.reload();
            }
        }
    }
    function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
        let d = new Date();
        let ano_atual = d.getFullYear()
        let mes_atual = d.getMonth() + 1
        let dia_atual = d.getDate()
    
        ano_aniversario = +ano_aniversario
        mes_aniversario = +mes_aniversario
        dia_aniversario = +dia_aniversario

        let quantos_anos = ano_atual - ano_aniversario;
    
        if (mes_atual < mes_aniversario || (mes_atual === mes_aniversario && dia_atual < dia_aniversario)) {
            quantos_anos--;
        }
    
        return quantos_anos < 0 ? 0 : quantos_anos;
    }
    
   
    useEffect(() => {

         async function loadContatos(filterAgeMax,filterAgeMin,filterGender,filterLanguage,filterMonthBirth) {
        let tempContatos = [];
        try {
            const response = await api.get("")
            tempContatos = response.data;
        } catch (e) {
        }

        let contatoStorage = localStorage.getItem('contatos');
        if (contatoStorage != null) {
            contatoStorage = JSON.parse(contatoStorage)
            tempContatos = tempContatos.concat(contatoStorage)
        }

        if(filterAgeMax && filterAgeMin){
            tempContatos=tempContatos.filter(c=> {
                let data = new Date(c.birthday)
                let age= idade(data.getFullYear(),data.getMonth(),data.getDate())
                return filterAgeMax >= age && filterAgeMin <= age
            })
        }

        if(filterMonthBirth!==''){
            tempContatos=tempContatos.filter(c=>{
                let data = new Date(c.birthday)
                return parseInt(filterMonthBirth)===data.getMonth()+1
            })
        }

        if(filterGender!==''){
            tempContatos=tempContatos.filter(c=>{
                return filterGender===c.gender
            })
        }

        if(filterLanguage!==''){
            tempContatos=tempContatos.filter(c=>{
                return filterLanguage===c.language
            })
        }

        setContatos(tempContatos.sort((a, b) => a.id - b.id));

    }

        loadContatos(filterAgeMax,filterAgeMin,filterGender,filterLanguage,filterMonthBirth);
    }, [filterAgeMax,filterAgeMin,filterGender,filterLanguage,filterMonthBirth])
    return (
        <div className='p-5' >
            <h1 >Lista de Contatos</h1>
            <div className='mt-3'>
                <div className='row mb-3'>
                    <div style={{backgroundColor:'#b6d6bc'}} className='col-12 form p-4 row'>
                        <h3 className='mb-2'>Filtro</h3>
                        <div className='form-group col-2'>
                            <label>Gênero</label>
                            <select onChange={(e) => { setFilterGender(e.target.value) }} className='form-control' value={filterGender}>
                                <option value="">Selecione uma opção</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <div className='form-group col-3'>
                            <label>Idioma</label>
                            <select onChange={(e) => { setFilterLanguage(e.target.value) }} className='form-control' value={filterLanguage}>
                                <option value="">Selecione uma opção</option>
                                <option value="Alemão">Alemão</option>
                                <option value="Inglês">Inglês</option>
                                <option value="Poruguês (Portugal)">Poruguês (Portugal)</option>
                                <option value="Poruguês (Brasil)">Poruguês (Brasil)</option>
                                <option value="Espanhol">Espanhol</option>
                                <option value="Francês">Francês</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <div className='form-group col-3'>
                            <label>Mês do Aniversário</label>
                            <select onChange={(e) => { setFilterMonthBirth(e.target.value) }} className='form-control' value={filterMonthBirth}>
                                <option value="">Selecione uma opção</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>
                        </div>
                        <div className='form-group col-2'>
                            <label>Idade (Mínima)</label>
                            <input onChange={(e) => setFilterAgeMin(e.target.value)} type='number' className='form-control' value={filterAgeMin}></input>
                        </div>
                        <div className='form-group col-2'>
                            <label>Idade (Máxima)</label>
                            <input onChange={(e) => setFilterAgeMax(e.target.value)} type='number' className='form-control' value={filterAgeMax}></input>
                        </div>
                    </div>
                    <div className='mt-3 col-12' >
                        <Link to="/add"><button style={{ float: 'right' }} className='btn btn-dark '>Adicionar Contato +</button></Link>
                    </div>
                </div>
                <table className='table'>
                    <thead className='thead-dark table-dark'>
                        <tr className='row table-dark'>
                            <th className='col-1 text-center'>ID</th>
                            <th className='col-1 text-center'>Avatar</th>
                            <th className='col-2 text-center'>Nome</th>
                            <th className='col-2 text-center'>E-mail</th>
                            <th className='col-1 text-center'>Gênero</th>
                            <th className='col-2 text-center'>Data de nascimento</th>
                            <th className='col-1 text-center'>Idioma</th>
                            <th className='col-2 text-center'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contatos.map(
                                contato => {
                                    let dataArray = contato.birthday.split('-');
                                    let dataFormatada = dataArray[2] + '/' + dataArray[1] + '/' + dataArray[0]
                                    return (
                                        <tr className='row' key={contato.id}>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center'>{contato.id}</td>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center' ><img className='img-perfil' src={contato.avatar} alt={'Foto de Perfil ' + contato.id} /></td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center' >{contato.first_name + " " + contato.last_name}</td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center'>{contato.email}</td>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center'>{contato.gender === 'M' ? 'Masculino' : (contato.gender === 'F' ? 'Feminino' : 'Outros')}</td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center'>{dataFormatada}</td>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center'>{contato.language}</td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center'>
                                                {contato.localStorage != null ? <div>
                                                    <Link to={"/add/" + contato.id}><button className='btn btn-dark'>Editar</button></Link>
                                                    <button className='btn btn-danger m-2' onClick={(e) => { deletarContato(contato.id) }}>Deletar</button>
                                                </div> : <div></div>
                                                }

                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                    </tbody>
                </table>
            </div>
        </div>);
}
export default Lista;