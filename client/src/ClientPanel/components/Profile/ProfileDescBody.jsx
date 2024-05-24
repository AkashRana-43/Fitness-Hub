import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AssignModal from './AssignModal';

const ProfileDescBody = () => {

    const [showAssignModal, setShowAssignModal] = useState(false); // State for modal visibility
    const [selectedUserId, setSelectedUserId] = useState(null); // State to store selected user ID

    
    const usersData = [
        { id: 1, requested_by: 'John', requested_to: '+1234567890', message: '123 Main St', status: 'Decrease Fat' },
        { id: 2, requested_by: 'Jane', requested_to: '+9876543210', message: '456 Elm St', status: 'Gain weight' },
        { id: 3, requested_by: 'Mike', requested_to: '+0123456789', message: '789 Oak Ave', status: 'Keto diet' },
      ];
    
      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'requested_by', headerName: 'Requested By', width: 150 },
        { field: 'requested_to', headerName: 'Requested To', width: 150 },
        { field: 'message', headerName: 'Message', width: 250 },
        { field: 'status', headerName: 'Status', width: 200 },
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
     

      

  
    return (
    <section className='container'>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                    <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                      
                        <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Diet Request</h3>                  
                    </div>
                    <div className="requestDietTable">
                            <DataGrid
                                rows={usersData}
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
                                userID = {selectedUserId} /> )}
                            
                        </div>
                       
                </div>
            </div>
            
    </section>
  )
}

export default ProfileDescBody