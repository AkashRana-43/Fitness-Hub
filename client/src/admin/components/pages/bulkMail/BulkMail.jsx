import "./bulkMail.css";
import { useState, useEffect } from 'react';

export default function BulkMail() {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [popup, setPopup] = useState('');

    useEffect(() => {
        if (popup) {
            // Display the message as a popup
            alert(popup);

            // Clear the message after displaying it
            setPopup('');
        }
    }, [popup]);

    const handleBulkMessage = (e) => {
        e.preventDefault();
    
        // Construct the bulk Email data object
        const bulkMessage = {
            subject: subject,
            message: message
        };

        const sessionId = sessionStorage.getItem('session');
        // Determine the category based on the selection
        const category = e.target.elements.category.value;
        
    
        // Send a POST request to register the user data
        fetch('http://localhost:3001/bulk_email/send-bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'session': `${sessionId}`,
            },
            body: JSON.stringify({ ...bulkMessage, category: category })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); // Log the response data
            setPopup('Bulk  Message Sent'); // Set the success message
            
        })
        .catch(err => console.log(err));
    };
  return (
    <div className = "newUser">
        <h1 className="newUserTitle">Contact</h1>
        <form action="bulkMail" onSubmit={handleBulkMessage}>
            <div className="newUserItem">
                <label>Category</label>
                <select name="category" id="category">
                    <option value="trainer">Trainer</option>
                    <option value="normal">Customer</option>
                </select>
            </div>
            <div className="newUserItem">
                <label>Subject</label>
                <input type="text" placeholder = "subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="newUserItem">
                <label>Message</label>
                <textarea name="message" id="message" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <button className="newUserButton">Send</button>
        
        </form>
    </div>
  )
}
