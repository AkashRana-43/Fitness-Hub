import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AssignModal from './AssignModal';
import CheckCircle from '@mui/icons-material/CheckCircle';
const ProfileDescBody = () => {

    const [showAssignModal, setShowAssignModal] = useState(false); // State for modal visibility
    const [selectedUserId, setSelectedUserId] = useState(null); // State to store selected user ID
    const [requestDietData, setrequestDietData] = useState([]);
    const sessionId = sessionStorage.getItem('session');
    
    
      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'requested_by', headerName: 'Requested By', width: 150 },
        { field: 'profile_name', headerName: 'Profile', width: 150 },
        { field: 'message', headerName: 'Message', width: 250 },
        { field: 'status', headerName: 'Status', width: 150, 
        renderCell: (params) => (params.value ? <CheckCircle style={{ color: '#f5593d', fontSize:'25px' }}/> : 'Not assigned') }, //params.value gets the value of current row which is status = true || false
        {
          field: 'actions',
          headerName: 'Action',
          width: 100,
          renderCell: (params) => (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setSelectedUserId(params.row.id); // Set selected user ID on button click
                setShowAssignModal(true); // Show the modal
              }}
            >
              Assign
            </button>
            
          ),
        },
        
      ];

      // const handleAssignClick = () => {
      //   setShowAssignModal(true); // Show the modal
      // };
      console.log(showAssignModal);
      console.log(`userId: ${selectedUserId}`)

      useEffect(() => {
        fetch('http://localhost:3001/request/diets/', {
          method: 'GET',
          headers: {
            'session': `${sessionId}`,
          },
        })
          .then(response => response.json())
          .then(data => {
    
            // Ensure data is an array of objects
            if (Array.isArray(data)) {
              setrequestDietData(data);
            } else {
              console.error('Received data is not an array:', data);
            }
          })
          .catch(error => console.error('Error fetching users:', error));
      }, []);

      const updateStatus = (userId) => {
        setrequestDietData(prevData =>
            prevData.map(item =>
                item.id === userId ? { ...item, status: '✔️' } : item
            )
        );
    };
     

      

  
    return (
    <section className='container'>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                    <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                      
                        <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Diet Request</h3>                  
                    </div>
                    <div className="requestDietTable">
                            <DataGrid
                                rows={requestDietData}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[5, 10, 20]}
                                autoHeight
                                disableRowSelectionOnClick
                            />
                             {showAssignModal && (
                                <AssignModal
                                show={showAssignModal} // Pass modal visibility state
                                onHide={() => setShowAssignModal(false)}
                                userID = {selectedUserId}
                                onStatusUpdate={updateStatus} /> )}
                            
                        </div>
                       
                </div>
            </div>
            
    </section>
  )
}

export default ProfileDescBody