import { Button, Form } from "react-bootstrap"
import styles from './Login.module.css'
import { FormEvent, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../hooks/redux";
import { setLogin } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const[showPass, setShowPass] = useState(false);

    const {values, handleChange} = useForm({
        user: "",
        password: "",
    })

    const {user, password} = values;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("/user.json");
        const usersData = await response.json();
        const userFound = usersData.users.find((u: {username: string, password: string}) => 
            u.username === user && u.password === password
        );
        if(userFound) {
            dispatch(setLogin(user));
            navigate("/");
        } else{
            alert("Usuario o contraseña incorrectos");
        };
    };

  return (
    <div className={styles.containerLogin}>
        <div className={styles.containerForm}>
            <span style={{fontSize:"10vh"}} className="material-symbols-outlined">person</span>

            <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control onChange={handleChange} name="user" value={user} type="text" placeholder="Usuario" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control onChange={handleChange} name="password" value={password} type={showPass? "text": "password"} placeholder="Contraseña" />
                </Form.Group>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Mostrar Contraseña"
                    onChange={() => {
                        setShowPass(!showPass);
                    }}
                />
                <div className="d-flex justify-content-center algin-items-center mt-2">
                    <Button type="submit" variant="primary">Ingresar</Button>{' '}
                </div>
            </Form>
        </div>
    </div>
  )
}