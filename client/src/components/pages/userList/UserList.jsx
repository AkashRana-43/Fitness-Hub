import "./userList.css";
// import User from '../user/User'; 
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline, Block} from '@mui/icons-material';
// import { userRows, trainerRows } from "../../../dummyData";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";


export default function UserList() {
    const [data, setData] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
      // Login as admin to get session ID
      fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: 'rohit@gmail.com',
              password: 'password123',
          }),
      })
      .then(response => response.json())
      .then(data => {
          // Store the session ID in localStorage
          localStorage.setItem('sessionID', data.session);

          
          
          fetch('http://localhost:3001/profile/allusers', {
              method: 'GET',
              headers: {
                'session': `${sessionId}`,
              },
          })
          .then(response => response.json())
          .then(data => {
            
              // Ensure data is an array of objects
              if (Array.isArray(data)) {
                  setData(data);
                  setFilteredData(data);
              } else {
                  console.error('Received data is not an array:', data);
              }
          })
          .catch(error => console.error('Error fetching users:', error));
            
      })
      .catch(error => console.error('Error logging in:', error));
      
  }, []);

  const sessionId = localStorage.getItem('sessionID');
  console.log(sessionId);  

  const handleRoleChange = (event) => {
    console.log(event.target.value);
    setSelectedRole(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (role) => {
    let filtered = [];
    if (role === 'All_User') {
        filtered = data;
        
    } else {
      // data.filter(item => item.user_type === 'trainer'
        filtered = data.filter(item => item.user_type.toLowerCase() === role.toLowerCase());
        console.log(filtered); //gives data according to filterd event
    }
    setFilteredData(filtered);
};

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/register_detail/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'session': `${sessionId}`,
        },
    })
    .then(response => {
        if (response.ok) {
            alert('User deleted successfully'); // Show an alert indicating that the user has been deleted
            // Remove the deleted user from the filteredData state
            window.location.reload(); // Reload the page
        } else {
            alert('Failed to delete user'); // Show an alert indicating that the deletion failed
            // Optionally, handle the error or show an error message
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        // Optionally, handle the error or show an error message
    });
};

          
  
  const handleBlock = (id) => {
    // Send a GET request to fetch the user details
    fetch(`http://localhost:3001/register_detail/recieve`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session': `${sessionId}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        // Find the user object with the matching id
        const user = data.find(user => user.id === id);
        if (user) {
            // Extract the data from the user object
            const email = user.email;
            const userType = user.user_type;
            const isVerified = user.is_verified;
            

            // Send a PUT request to block the user with the retrieved data
            fetch('http://localhost:3001/register_detail/update', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'session': `${sessionId}`,
              },
              body: JSON.stringify({ email: email,
                user_type:userType,
                is_verified:isVerified,
                is_blocked:true
              }),
          })
            .then(response => response.json())
            .then(data => {
                console.log('User blocked:', data);
                // Optionally, update your UI or show a message indicating that the user has been blocked
                alert('User has been blocked'); // Show an alert indicating that the user has been blocked
            })
            .catch(error => {
                console.error('Error blocking user:', error);
                // Optionally, handle the error (e.g., show an error message to the user)
            });
          } else {
              console.error(`User with id ${id} not found`);
          }
        
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
        // Optionally, handle the error (e.g., show an error message to the user)
    });
};

 

    
   
  
    
    
    const columns = [
      
        { field: 'user_id', headerName: 'User_ID', width: 70 },
        { field: 'first_name', headerName: 'First Name', width: 150,
        },
        { field: 'last_name', headerName: 'Last Name', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'address', headerName: 'Address', width: 150 },
        {
            field:'action',
            headerName:'Action',
            width:150,
            renderCell: (params) => {
                return (
                    <div className="userListAction">
                        <Link to = {"/user/" + params.row.user_id}>
                          
                            <button className="userListEdit">Edit</button>
                        </Link>
                        
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.user_id)}/>
                        <Block className="userListBlock" onClick={() => handleBlock(params.row.user_id)}/>
                    </div>
                    
                )
            }
        },
      ];
     
    return (
   
    <div className="userList">
       
      <div className="userTitleContainer">
            <div className="userDropdown">
                <select className= "userDropdownicon" value={selectedRole} onChange={handleRoleChange}>
                  <option value="All_User">All User</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Normal">Customer</option>
                </select>
            </div>
            <Link to="/newUser">
                <button className="userAddButton">Create</button>
            </Link>
            
      </div>
        <DataGrid
        rows={filteredData} // Use filteredData instead of data
        columns={columns}
        getRowId={(row) => row.user_id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  )
}
