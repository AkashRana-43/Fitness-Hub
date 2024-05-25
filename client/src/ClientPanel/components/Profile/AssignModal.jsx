import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './css/ProfilePage.css';

const AssignModal = ({ show, onHide, userID, onStatusUpdate }) => {
  // You can potentially use userId to filter or customize the data displayed in the modal

  console.log(show);
  


  const [dietData, setDietData] = useState([]);
  const sessionId = sessionStorage.getItem('session');
  const getRowId = (row) => row.id || row.title;  // Use existing ID if available, otherwise use title as fallback
  const [selectedIds, setSelectedIds] = useState([]);
  


  const handleDelete = (id) => {
    fetch(`http://localhost:3001/diet/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'session': `${sessionId}`,
      },
    })
      .then(response => {
        if (response.ok) {
          alert('Diet entry deleted successfully'); // Show an alert indicating that the diet entry has been deleted
          // Remove the deleted row from the state
          setDietData(prevData => prevData.filter(row => row.id !== id));

        } else {
          alert('Failed to delete diet'); // Show an alert indicating that the deletion failed
          // Optionally, handle the error or show an error message
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        // Optionally, handle the error or show an error message
      });
  };
  const columns = [
    { field: 'id', headerName: 'DietId', width: 90 },
    { field: 'title', headerName: 'Title', width: 90 },
    { field: 'meal_name', headerName: 'Meal Name', width: 90 },
    { field: 'meal_type', headerName: 'Meal Type', width: 90 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'calories', headerName: 'Calories', width: 50 },
    { field: 'protein', headerName: 'Protein', width: 50 },
    { field: 'fat', headerName: 'Fat', width: 50 },
    { field: 'fiber', headerName: 'Fiber', width: 50 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListAction">
            <Link to={"/" + params.row.user_id}>

              <button className="btn" style={{ backgroundColor: "#F5593D", color: "white", border: 'none' }}>Edit</button>
            </Link>

            <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)} />

          </div>

        )
      }
    },

  ];


  useEffect(() => {
    fetch('http://localhost:3001/diet/', {
      method: 'GET',
      headers: {
        'session': `${sessionId}`,
      },
    })
      .then(response => response.json())
      .then(data => {

        // Ensure data is an array of objects
        if (Array.isArray(data)) {
          setDietData(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  const handleAssignDiets = (requestID) => {


    // Construct the diet data object
    const assignDiet = {
      dietIds: selectedIds,
      userId: userID

    };

    // Send a POST request to assign the diets data
    fetch('http://localhost:3001/diet/assign_diets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'session': `${sessionId}`
      },
      body: JSON.stringify({ ...assignDiet })
    })
      .then(res => res.json())
      .then(data => {

        alert('Diet assigned. Check email');
        // Call the status update API
        return fetch(`http://localhost:3001/request/status/${requestID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'session': `${sessionId}`
          },
          
        });
      })
      .then(response => response.json())
      .then(statusData => {
        // Update the status in the parent component
        console.log("Status updated");
        console.log(statusData);
        onStatusUpdate(userID);
        
        onHide();
      })
      .catch(err => console.log(err));

  }

  







  return (
    <div className="modal show d-block " tabIndex="-1">
      <div className="modal-dialog " id="custom-modal-width">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Diet Plans</h5>

            <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
          </div>
          <div class="modal-body">
            <DataGrid
              rows={dietData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              autoHeight
              checkboxSelection
              getRowId={getRowId}
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                setSelectedIds(newSelection);
                console.log('Selected IDs:', newSelection);
                
              }}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
            <button type="submit" className="btn btn-primary" onClick={() => {
              console.log('Saved selected IDs:', selectedIds);
              handleAssignDiets(userID)
              console.log(`This is  userId: ${userID}`);
            }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default AssignModal;
