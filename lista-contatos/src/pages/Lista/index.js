import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import "./style.css"




function Lista() {
    const [contatos, setContatos] = useState([]);

    async function deletarContato(id) {
        if (window.confirm("Deseja deletar o contato de id: " + id + '?')) {
            
            let contatoStorage = localStorage.getItem('contatos');
            if (contatoStorage != null) {
                contatoStorage = JSON.parse(contatoStorage)
                contatoStorage=contatoStorage.filter(r=>r.id!==id)
                localStorage.setItem('contatos', JSON.stringify(contatoStorage));
                loadContatos()
                alert('Contato apagado!!')
            }
        }
    }
 async function loadContatos() {
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
            setContatos(tempContatos.sort((a,b)=>a.id-b.id));

        }
    useEffect(() => {
        loadContatos();
    }, [])
    return (
        <div className='p-5' >
            <h1 >Lista de Contatos</h1>
            <div className='mt-3'>
                <div className='row mb-3'>
                    <div className='col-8'></div>
                    <div className='col-4' >
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
                            <th className='col-1 text-center'>Linguagem</th>
                            <th className='col-2 text-center'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contatos.map(
                                contato => {
                                    let dataArray=contato.birthday.split('-');
                                    let dataFormatada=dataArray[2]+'/'+dataArray[1]+'/'+dataArray[0]
                                    return (
                                        <tr className='row' key={contato.id}>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center'>{contato.id}</td>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center' ><img className='img-perfil' src={contato.avatar} alt={'Foto de Perfil ' + contato.id} /></td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center' >{contato.first_name + " " + contato.last_name}</td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center'>{contato.email}</td>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center'>{contato.gender === 'M' ? 'Masculino' : (contato.gender==='F'?'Feminino':'Outros')}</td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center'>{dataFormatada}</td>
                                            <td className='col-1 d-flex flex-column justify-content-center align-items-center'>{contato.language}</td>
                                            <td className='col-2 d-flex flex-column justify-content-center align-items-center'>
                                                {contato.localStorage!=null? <div>
                                                <Link to={"/add/"+contato.id}><button className='btn btn-dark'>Editar</button></Link>
                                                <button className='btn btn-danger m-2' onClick={(e)=>{deletarContato(contato.id)}}>Deletar</button>
                                                </div>:<div></div>
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