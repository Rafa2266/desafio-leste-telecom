import { useEffect, useState } from 'react';
import api from '../../services/api';
import "./style.css"

export default function Analise() {
    const [analiseContatosGender, setAnaliseContatosGender] = useState([]);
    const [analiseContatosLanguage, setAnaliseContatosLanguage] = useState([]);

    useEffect(() => {
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
            let tempGenders = {};
            let tempLanguages = {};
            tempContatos.forEach(c => {
                if (tempGenders[c.gender] !== undefined) {
                    tempGenders[c.gender] += 1
                } else {
                    tempGenders[c.gender] = 1
                }

                if (tempLanguages[c.language] !== undefined) {
                    tempLanguages[c.language] += 1
                } else {
                    tempLanguages[c.language] = 1
                }
            });
            let tempGendersArray=[];
            let tempLanguagesArray=[];
            Object.keys(tempGenders).forEach(
                g=>{
                    tempGendersArray.push({key:g,value:tempGenders[g]})
                }
            )
            Object.keys(tempLanguages).forEach(
                l=>{
                    tempLanguagesArray.push({key:l,value:tempLanguages[l]})
                }
            )
            tempGendersArray.sort((a,b)=>b.value-a.value)
            tempLanguagesArray.sort((a,b)=>b.value-a.value)
            setAnaliseContatosGender(tempGendersArray)
            setAnaliseContatosLanguage(tempLanguagesArray)

        }

        loadContatos()

    }, [])

    return (
        <div className='p-5'>
            <h1 >Análise dos Contatos</h1>
            <div className='mt-5 row'>
                <div className='col-5 mr-3'>
                <h2 className='text-center mb-3'>Análise do número de contatos por Gênero</h2>
                    <table className='table'>
                        <thead className='thead-dark table-dark'>
                            <tr className='row'>
                                <th className='col-6 text-center'>Gênero</th>
                                <th className='col-6 text-center'>Número de contatos</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                analiseContatosGender.map(
                                    gender=>{
                                        return(
                                            <tr className='row' key={gender.key}>
                                                 <td className='col-6 d-flex flex-column justify-content-center align-items-center'>{gender.key === 'M' ? 'Masculino' : (gender.key === 'F' ? 'Feminino' : 'Outros')}</td>
                                                 <td className='col-6 d-flex flex-column justify-content-center align-items-center'>{gender.value}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='col-2'></div>
                <div className='col-5'>
                    <h2 className='text-center mb-3'>Análise do número de contatos por Idioma</h2>
                    <table className='table'>
                        <thead className='thead-dark table-dark'>
                            <tr className='row'>
                                <th className='col-6 text-center'>Idioma</th>
                                <th className='col-6 text-center'>Número de contatos</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                analiseContatosLanguage.map(
                                    language=>{
                                        return(
                                            <tr className='row' key={language.key}>
                                                 <td className='col-6 d-flex flex-column justify-content-center align-items-center'>{language.key}</td>
                                                 <td className='col-6 d-flex flex-column justify-content-center align-items-center'>{language.value}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );

}