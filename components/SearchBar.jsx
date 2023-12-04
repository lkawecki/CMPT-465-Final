import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"
import axios from 'axios';
import './SearchBar.css';

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [bookData,setData]=useState([]);
  const fetchData = (value => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+input+"&key=AIzaSyDHJnNFQKfEVqZ_SjouQea8EoN_OPeZfZE")
    .then((response)=> {
      const results = response.json();
    })
    console.log(results)
    .catch(err=>console.log(err))
  })

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  }


  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input 
        placeholder="Type to search..." 
        value={input} 
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}
