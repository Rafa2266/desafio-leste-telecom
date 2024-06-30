import { useEffect, useState } from 'react';
import api from '../../services/api';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import "./style.css"




function Lista() {
    const [contatos, setContatos] = useState([]);

    useEffect(() => {

        async function loadContatos() {
            let tempContatos=[];
            try {
                const response = await api.get("")
                tempContatos=response.data;
            } catch (e) {
            }

            let contatoStorage = localStorage.getItem('contatos');
            if(contatoStorage !=null){
                contatoStorage=JSON.parse(contatoStorage)
                tempContatos= tempContatos.concat(contatoStorage)
            }
            setContatos(tempContatos);

        }

        loadContatos();

    }, [])
    return (
        <div className='p-5 m-3'>
            <h1 >Lista de contatos</h1>
            <div className='mt-3'>
                <div className='row mb-3'>
                    <div className='col-8'></div>
                    <div className='col-4' >
                    <Link to="/add"><button style={{float:'right'}} className='btn btn-dark '>Adicionar Contato +</button></Link>
                    </div>
                </div>
                <table className='table'>
                    <thead className='thead-dark table-dark'>
                        <tr className='row table-dark'>
                            <th className='col-1'>ID</th>
                            <th className='col-1'>Avatar</th>
                            <th className='col-2'>Nome</th>
                            <th className='col-2'>E-mail</th>
                            <th className='col-1'>Gênero</th>
                            <th className='col-1'>Data de nascimento</th>
                            <th className='col-2'>Linguagem</th>
                            <th className='col-2'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contatos.map(
                            contato => {
                                return (
                                    <tr className='row' key={contato.id}>
                                        <td className='col-1'>{contato.id}</td>
                                        <td className='col-1' ><img className='img-perfil' src={contato.avatar} alt={'Foto de Perfil ' + contato.id} /></td>
                                        <td className='col-2' >{contato.first_name + " " + contato.last_name}</td>
                                        <td className='col-2'>{contato.email}</td>
                                        <td className='col-1'>{contato.gender === 'M' ? 'Masculino' : 'Feminino'}</td>
                                        <td className='col-1'>{format(new Date(contato.birthday), 'dd/MM/yyyy')}</td>
                                        <td className='col-2'>{contato.language}</td>
                                        <td className='col-2'><button className='btn btn-dark'>Editar</button><button className='btn btn-danger m-2'>Deletar</button></td>
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