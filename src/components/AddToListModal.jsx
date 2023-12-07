import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const AddToListModal = ({ onClose, onListSelect, onConfirm }) => {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);

  const { userID } = useContext(AuthContext);

  useEffect(() => {
    try {
      // Replace 'userId' with the actual ID of the logged-in user
      const userId = userID; 
      axios.get(`http://localhost:5000/show_user_lists/${userId}`)
        .then(response => {
          setLists(response.data);
        })
        .catch(error => {
          console.error('Error getting lists from Lists:', error);
          // Handle error or display a message to the user
        });
    } catch (error) {
      console.error('Error getting lists from Lists:', error);
      // Handle error or display a message to the user
    }
    console.log(lists)
  }, [userID]);

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
            <li key={list[0]} onClick={() => handleListSelect(list[0])} styles="hover:cursor">
              {list[2]}
            </li>
          ))}
        </ul>
        <button onClick={handleConfirm}>Add to Selected List</button>
      </div>
    </div>
  );
};

export default AddToListModal;
