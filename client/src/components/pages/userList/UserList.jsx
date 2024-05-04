import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline, Block} from '@mui/icons-material';
// import { userRows, trainerRows } from "../../../dummyData";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";


export default function UserList() {
    const [data, setData] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    // const [sessionID, setSessionID] = useState('');

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
          // Filter the data based on user_type
          
          
          // Fetch initial user data
          // const url = selectedRole === 'All_User'
          //     ? 'http://localhost:3001/register_detail/recieve'
          //     : 'http://localhost:3001/register_detail/recieve';
          // Function to get the stored session ID
          const sessionId = localStorage.getItem('sessionID');
          
          console.log(sessionId);
          
          fetch('http://localhost:3001/register_detail/recieve', {
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
  

 

    const handleDelete = (id) => {
        setData(data.filter(item=>item.id!==id))
    }
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
  
    
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        // { field: 'first_name', headerName: 'First Name', width: 150,
        //     // renderCell: (params) => {
        //     //     return (
        //     //         <div className="userListUser">
        //     //             <img className="userListImage" src={params.row.profile_image} alt="Profile" srcset="" />
        //     //             {params.row.username}
        //     //         </div>
        //     //     )
        //     // }
        // },
        // { field: 'last_name', headerName: 'Last Name', width: 150 },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        },
        {
          field: 'user_type',
          headerName: 'User Type',
          width: 150,

        },
        {
            field:'action',
            headerName:'Action',
            width:150,
            renderCell: (params) => {
                return (
                    <div className="userListAction">
                        <Link to = {"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)}/>
                        <Block className="userListBlock"/>
                    </div>
                    
                )
            }
        },
      ];
     
    return (
   
    <div className="userList">
       <div className="userDropdown">
        <select className= "userDropdownicon" value={selectedRole} onChange={handleRoleChange}>
          <option value="All_User">All User</option>
          <option value="Trainer">Trainer</option>
          <option value="Customer">Customer</option>
        </select>
      </div>
        <DataGrid
        rows={filteredData} // Use filteredData instead of data
        columns={columns}
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
