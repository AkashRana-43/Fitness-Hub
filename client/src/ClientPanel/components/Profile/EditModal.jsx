import React, { useState, useEffect } from 'react';

const EditModal = ({ showEdit, onHideEdit, editData }) => {
    const [formData, setFormData] = useState({
        title: '',
        meal_name: '',
        meal_type: '',
        description: '',
        calories: '',
        protein: '',
        carbohydrates: '',
        fat: '',
        fiber: ''
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title,
                meal_name: editData.meal_name,
                meal_type: editData.meal_type,
                description: editData.description,
                calories: editData.calories,
                protein: editData.protein,
                carbohydrates: editData.carbohydrates,
                fat:editData.fat,
                fiber: editData.fiber
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send a PUT request to update the data
        fetch(`http://localhost:3001/request/diets/${editData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'session': sessionStorage.getItem('session'),
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle successful update
                console.log('Update successful:', data);
                onHideEdit(); // Close the modal after successful update
            })
            .catch((error) => console.error('Error updating data:', error));
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Diet</h5>

                        <button type="button" className="btn-close" aria-label="Close" onClick={onHideEdit}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Meal Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.meal_name}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Meal Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.meal_type}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Calories</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.calories}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Protein</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.protein}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Carbs</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.carbohydrates}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Fat</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.fat}
                                    onChange={handleChange}
                                />
                                <label className="form-label">Fiber</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    value={formData.fiber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onHideEdit}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
