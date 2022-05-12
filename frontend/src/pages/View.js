import React, {useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './View.css'

const View = () => {
    const [user, setUser] = useState(null);

    const {id} = useParams();

    useEffect(() => {
            if (id) {
                getSignleUser(id);
            }
        }, [id])

    const getSignleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
            setUser({ ...response.data[0] });
        }
    };

    return (
        <div>
            
        </div>
    )
}

export default View;