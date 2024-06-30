import { useEffect, useState } from 'react';

import "./style.css"
import { useNavigate,Link } from 'react-router-dom'

import robo1 from'../../assets/robo_1.jpg'
import robo2 from '../../assets/robo_2.jpg'
import robo3 from '../../assets/robo_3.webp'
import robo4 from'../../assets/robo_4.jpg'
import robo5 from'../../assets/robo_5.webp'
import robo6 from '../../assets/robo_6.jpg'
import robo7 from '../../assets/robo_7.jpg'

export default function FormContato() {
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('')
    const [language, setLanguage] = useState('')
    const [isSubmitted,setIsSubmitted] = useState(false)

    const navigate = useNavigate();
    const linksAvatarPhoto=[
        robo1,
        robo2,
        robo3,
        robo4,
        robo5,
        robo6,
        robo7,
    ]
    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
      }
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
            let urlPhotoAvatar=linksAvatarPhoto[getRandomInt(0,6)]
            setIsSubmitted(true);
            maxId+=1;
            contatoStorage.push({'id':maxId,'email':email,'first_name':first_name,'last_name':last_name,gender:gender,birthday:birthday,language:language,avatar:urlPhotoAvatar,'localStorage':true})
            console.log(contatoStorage)
            localStorage.setItem('contatos', JSON.stringify(contatoStorage));
           
            navigate('/', { replace: true })
            alert('Contato salvo!!')
        }
        
    }


    return( 
    <div style={{backgroundColor:'#f5e8a9'}}>
        <div className='p-5 m-3'>
            <h1>Adicionar contato</h1>
            {/* <div className='col-12 mb-3' >
                        <Link to="/"><button style={{ float: 'right' }} className='btn btn-dark '>Lista de Contatos</button></Link>
                    </div> */}
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
                    <select onChange={(e) => {setGender(e.target.value)}} className='form-control' value={gender}>
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
                <div className='col-12 mt-3 text-center' >
                        <Link to="/"><button className='btn btn-default'>Voltar para a Lista de Contatos</button></Link>
                    </div>
            </form>
            </div>

        </div>
    </div>);
}
