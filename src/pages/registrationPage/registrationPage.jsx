import "./registrationPage.css";
import * as React from 'react';
import Button from '@mui/material/Button';
import * as EmailValidator from "email-validator";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import WarningModal from "../../Components/warningModel/warningModal";
import statesAndDistricts from '../../districtsAndStatesData.json';

function Register() {
    const [show, setShow] = useState(false);
    const [warn, setWarn] = useState("No error");
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [aadhar, setAadhar] = useState();
    const [village, setVillage] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [stateName, setStateName] = useState();
    const [districtName, setDistrictName] = useState();
    const [type, setType] = useState("text");
    const [dob, setDob] = useState();
    const [districts, setDistricts] = useState([{ "value": "no state selected", "label": "no state selected" }]);
    
    const navigate = useNavigate();
    const states = statesAndDistricts.map(r => r.state);

    const handleChange = (event) => {
        setStateName(event.value);
        const findStateIndex = statesAndDistricts.findIndex(r => r.state === event.value);
        const districtOptions = statesAndDistricts[findStateIndex].districts.map(r => ({ "value": r, "label": r }));
        setDistricts(districtOptions);
    };

    const stateOptions = states.map(r => ({ "value": r, "label": r }));

    const checkAndSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validation logic here...
        if (name && email && number && aadhar && password && confirm && village && stateName && dob) {
            if (password !== confirm) {
                setShow(true);
                setWarn("Both passwords should match");
                return;
            }

            axios.post("http://localhost:8081/register", {
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(-1).join(' '),
                email,
                phoneNo: number.toString(),
                dob,
                state: stateName,
                village,
                aadharNo: aadhar,
                password,
            })
            .then((res) => {
                if (res.data === 'Success') {
                    alert("Registered successfully");
                    navigate("/login");
                }
            })
            .catch((err) => {
                setShow(true);
                setWarn("Some error occurred. Please try again after some time");
            });
        } else {
            setShow(true);
            setWarn("Please fill in all fields");
        }
    };

    return (
        <>
            <div className="registerPage">
                <div id="register">
                    <h1>Registration Form</h1>
                    <form>
                        <input type="text" placeholder="Your name.." required onChange={(event) => setName(event.target.value)} />
                        <input type="email" placeholder="Your email.." required onChange={(event) => setEmail(event.target.value)} />
                        <input type="number" placeholder="Your Mobile number.." required onChange={(event) => setNumber(event.target.value)} />
                        <input type="text" placeholder="Your Aadhar number (xxx xxxx xxxx)" required onChange={(event) => setAadhar(event.target.value)} />
                        <input onChange={(event) => setDob(event.target.value)} type={type} placeholder="select dob" onFocus={() => setType("date")} required />
                        <Select className="select" options={stateOptions} placeholder="select state..." onChange={handleChange} />
                        <Select onChange={(event) => setDistrictName(event.value)} className="select" placeholder="select district..." options={districts} />
                        <input type="text" placeholder="Your Village.." required onChange={(event) => setVillage(event.target.value)} />
                        <input type="password" placeholder="Your password.." required maxLength={6} onChange={(event) => setPassword(event.target.value)} />
                        <input type="password" placeholder="Confirm password.." required maxLength={6} onChange={(event) => setConfirm(event.target.value)} />
                        <Button onClick={checkAndSubmit} type="button" id="button" variant="contained">Register</Button>
                        <p>Already have an account? <a href="/login">login</a></p>
                    </form>
                </div>
            </div>
            <WarningModal show={show} content={warn} close={() => setShow(false)} />
        </>
    );
}

export default Register;
