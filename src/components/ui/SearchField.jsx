import React, { useState } from "react";
import { useSelector } from "react-redux";



function SearchBox(props) {

  console.log("props", props)


  const [allData, setallData] = useState([])



  // getting data from store
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  const gettingData = async () => {
    const { loading, data } = await getAllLogByCodeReducer;
    const { logs } = await data.data;
    const obejectOfData = logs.map((log) => log.logMsg);
    setallData(obejectOfData)
    console.log("now data", obejectOfData);
  };





  // gettting data in every render
  React.useEffect(() => {
    gettingData();
  }, []);





  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };






  React.useEffect(() => {
    const results = allData.filter((person) =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);






  return (
    <div >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBox;
