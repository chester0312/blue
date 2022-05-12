import React, { useState,  useEffect} from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import axios from "axios";
import './AddEdit.css';
import { toast } from "react-toastify";

const initialstata = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialstata);

    const { name, email, contact } = initialstata;

    const history = useNavigate();

    const {id} = useParams();

    useEffect(() => {
            if (id) {
                getSignleUser(id);
            }
        }, [id])

    const getSignleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
            setState({ ...response.data[0] });
        }
    };
    
    const addUser = async (data) => {
        const response = await axios.post("http://localhost:5000/user", data); 
        if(response.status === 200) {
            toast.success(response.data);
        }
    };

    const updataUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/user/${id}`, data); 
        if(response.status === 200) {
            toast.success(response.data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( !name || !email || !contact) {
            toast.error("Please provid vale into each input field");
        } else {
            if (!id) {
                addUser(state);
            } else {
                updataUser(state, id)
            }

            setTimeout(() => history.push("/"),500);
        }
    };

    const handleInputChenge = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <div style={{marginTop: "100px"}}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px", 
                    maxWidth: "400px", 
                    alignContent: "center",
                }}
                onSubmit = {handleSubmit}
            >
            <label htmlFor = "name">Name</label>
            <input 
                type = "text"
                id = "name"
                name = "name"
                placeholder="Enter Name..."
                onChange={handleInputChenge}
                value = {name}
             />
            <label htmlFor = "email">Email</label>
            <input 
                type = "email"
                id = "email"
                name = "email"
                placeholder="Enter Email.."
                onChange={handleInputChenge}
                value = {email}
             />
            <label htmlFor = "comtact">Contact</label>
            <input 
                type = "number"
                id = "contact"
                name = "contact"
                placeholder="Enter Contact..."
                onChange={handleInputChenge}
                value = {contact}
             />
             <input type = "submit" value = {id ? "Update" : "Add"} />
            </form>
        </div>
    )
}

export default AddEdit