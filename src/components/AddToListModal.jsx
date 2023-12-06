import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToListModal = ({ onClose, onListSelect, onConfirm }) => {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);

  useEffect(() => {
    // Fetch user's lists from the backend when the modal is opened
    const fetchLists = async () => {
      try {
        const response = await axios.get('your_backend_endpoint/lists');
        setLists(response.data.lists); // Assuming the response contains an array of lists
      } catch (error) {
        console.error('Error fetching lists:', error);
        // Handle error or display a message to the user
      }
    };

    fetchLists();
  }, []);

  const handleListSelect = (listId) => {
    setSelectedListId(listId);
    onListSelect(listId); // Pass the selected list ID to the parent component
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Select a List</h2>
        <ul>
          {lists.map((list) => (
            <li key={list.id} onClick={() => handleListSelect(list.id)}>
              {list.name}
            </li>
          ))}
        </ul>
        <button onClick={handleConfirm}>Add to Selected List</button>
      </div>
    </div>
  );
};

export default AddToListModal;
