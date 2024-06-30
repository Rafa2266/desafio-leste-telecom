import { useEffect, useState } from 'react';

import "./style.css"
import { useNavigate } from 'react-router-dom'

export default function FormContato() {
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('')
    const [language, setLanguage] = useState('')
    const [isSubmitted,setIsSubmitted] = useState(false)

    const navigate = useNavigate();

    async function onSubmit(e){
        e.preventDefault();
        if(!isSubmitted){
            
            let contatoStorage = localStorage.getItem('contatos');
            
            let maxId=100;
            if(contatoStorage!=null){
                contatoStorage=JSON.parse(contatoStorage)
                contatoStorage.forEach(c=>{
                    if(c.id>maxId){
                        maxId=c.id
                    }
                }) 
            }else{
                contatoStorage=[];
            }

            setIsSubmitted(true);
            maxId+=1;
            contatoStorage.push({'id':maxId,'email':email,'first_name':first_name,'last_name':last_name,gender:gender,birthday:birthday,language:language,avatar:'https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949470.jpg','localStorage':true})
            localStorage.setItem('contatos', JSON.stringify(contatoStorage));
            navigate('/', { replace: true })
        }
        
    }


    return( 
    <div style={{backgroundColor:'#f5e8a9'}}>
        <div className='p-5 m-3'>
            <h1>Adicionar contato</h1>
            <div className='mt-3' >
            <form className="form row" onSubmit={onSubmit}>
                <div className='form-group col-3'>
                    <label>Primeiro Nome</label>
                    <input  onChange={(e) => setFirstName(e.target.value)} type='text' required className='form-control' value={first_name}></input>
                </div>
                <div className='form-group col-3'>
                    <label>Último Sobrenome</label>
                    <input onChange={(e) => setLastName(e.target.value)} type='text' required className='form-control' value={last_name}></input>
                </div>
                <div className='form-group col-3'>
                    <label>E-mail</label>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' required className='form-control' value={email}></input>
                </div>
                <div className='form-group col-3'>
                    <label>Gênero</label>
                    <select onChange={(e) => {console.log(e.target.value);setGender(e.target.value)}} className='form-control' value={gender}>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="">Outros</option>
                    </select>
                </div>
                <div className='form-group col-3'>
                    <label>Linguagem</label>
                    <input onChange={(e) => setLanguage(e.target.value)} type='text' required className='form-control' value={language}></input>
                </div>
                <div className='form-group col-3'>
                    <label>Data de nascimento</label>
                    <input onChange={(e) => setBirthday(e.target.value)} type='date' required className='form-control' value={birthday}></input>
                </div>
                <div className="col-12 mt-5">
                    <div className="submit text-center" ><input disabled={isSubmitted} className="button-atualizar" value="Criar Contato" type="submit"></input></div>
                </div>
            </form>
            </div>

        </div>
    </div>);
}
