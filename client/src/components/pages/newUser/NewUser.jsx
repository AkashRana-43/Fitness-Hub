import "./newUser.css";
import { useState, useEffect } from 'react';


export default function NewUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [message, setMessage] = useState('');
    

    useEffect(() => {
        if (message) {
            // Display the message as a popup
            alert(message);

            // Clear the message after displaying it
            setMessage('');
        }
    }, [message]);

    const handleRegister = (e) => {
        e.preventDefault();
    
        // Construct the register user data object
        const registerUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            
        };

        
    
        // Send a POST request to register the user data
        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...registerUser, user_type: selectedRole })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); // Log the response data
            setMessage('User created successfully!'); // Set the success message
            
        })
        .catch(err => console.log(err));
    };
  return (
    <div className = "newUser">
        <h1 className="newUserTitle">New User</h1>
        <form action="newUserForm" onSubmit={handleRegister}>
            <div className="newUserItem">
                <label>FirstName</label>
                <input type="text" placeholder = "firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="newUserItem">
                <label>LastName</label>
                <input type="text" placeholder = "lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type="email" placeholder = "email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder = "password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className="newUserItem">
                <label>User Type</label>

                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="trainer">Trainer</option>
                    <option value="normal">Customer</option>
                </select>
            </div>

            
            <button className="newUserButton">Create</button>
            
        </form>
    </div>
  )
}
