import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/CreateListButton.css'

function CreateListButton({ userID }) {
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/create_list', { userID, listName })
      .then(response => {
        console.log(response.data);
        handleClose(); // Close the modal after successful submission
      })
      .catch(error => {
        console.error('Error creating list:', error);
        // Handle error scenario
      });
  };

  return (
    <>
      <button 
      className='create-list-button'
      onClick={handleShow}>Create List</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>Create a New List</h2>
            <form>
              <label>
                List Name:
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </label>
              <button type="button" onClick={handleSubmit}>Create</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateListButton;
