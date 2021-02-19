import React,{useState} from 'react';
import "./registration.css"
import Input from "../../utils/input/input";
import {registration} from "../../api/api";
const Registration  = () => {
    const [email, setEmail] = useState('here@gmail.com')
    const [password, setPassword] = useState('here')
    return (
        <div className="registration">
            <div className="registration__header"> регістрація</div>
            <Input value={email} setValue={setEmail} type='text' placeholder = 'login  '/>
            <Input value={password } setValue={setPassword} type='password' placeholder = 'password'/>

            <button className="registration__btn"
            onClick={()=> registration(email, password)}
            >увійти</button>

        </div>
    );
};

export default Registration ;
