import {Button, TextInput} from "flowbite-react";
import {useState} from "react";
import { axiosInstance } from "@/shared/axios";

export const RegisterPage = () =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div>
            <TextInput onChange={(e) => setEmail(e.target.value)} value={email} />
            <TextInput onChange={(e) => setPassword(e.target.value)} value={password} />
            <Button onClick={() => {
                axiosInstance.post("/auth/login", {
                    "firstName": "daa",
                    "lastName": "hehe",
                    "email": email,
                    "password": password,
                })
            }}>Go</Button>
            <Button onClick={() => axiosInstance.get('/profile/me').then(l => {
                console.log({l})
            })}>ne</Button>
        </div>
    )
}
