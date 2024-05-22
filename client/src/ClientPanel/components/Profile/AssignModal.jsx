import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './css/ProfilePage.css';

const AssignModal = ({ show, onHide, userId }) => {
  // You can potentially use userId to filter or customize the data displayed in the modal

  console.log(show);


  const [dietData, setDietData] = useState([]);
  const sessionId = sessionStorage.getItem('session');
  const getRowId = (row) => row.id || row.title;  // Use existing ID if available, otherwise use title as fallback


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



  const columns = [
    { field: 'title', headerName: 'Title', width: 90 },
    { field: 'meal_name', headerName: 'Meal Name', width: 90 },
    { field: 'meal_type', headerName: 'Meal Type', width: 90 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'calories', headerName: 'Calories', width: 50 },
    { field: 'protein', headerName: 'Protein', width: 50 },
    { field: 'fat', headerName: 'Fat', width: 50 },
    { field: 'fiber', headerName: 'Fiber', width: 50 },

  ];

  return (
    <div  className="modal show d-block " tabIndex="-1">
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
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
