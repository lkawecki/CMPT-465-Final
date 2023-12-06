import React, {useState} from 'react';
import {FaSearch} from "react-icons/fa";
import axios from 'axios';
import '../assets/styles/SearchBar.css';

export const SearchBar = ({ updateBookData }) => {
  const [input, setInput]=useState('');
  const [bookData,setData]=useState([]);

  const maxResults = '40';
  const privKey ='AIzaSyDHJnNFQKfEVqZ_SjouQea8EoN_OPeZfZE';
  const printType = 'books';

  const searchBook = (value) => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+value+
    "&maxResults="+maxResults+
    "&printType="+printType+
    "&key="+privKey)
    .then(res=> {
      updateBookData(res.data.items || []);
      console.log(res.data.items);
    })
    .catch(err=>console.log(err))
    
  };
  

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === '') {
      updateBookData([]);
    } else { 
      searchBook(value);
    }
  }


  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input 
          placeholder="Type to search..." 
          value={input} 
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  )
}
