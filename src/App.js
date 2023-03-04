import './App.css';
import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  
  useEffect(() => {
    fetch("https://api.census.gov/data/2021/pep/population?get=DENSITY_2021,POP_2021,NAME,STATE&for=state:*")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelectedId(e.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return(
      <>
      <select onChange={handleSelectChange} name="ids" id="ids">
        <option>{items.NAME}</option>
      </select>  
      <Table>
        <thead>
          <tr>
              {items[0].map((item, index) => {
                return (
                  <th className="tableHead" key={"head" + index}>
                    {item}
                  </th>
                );
              })}
            </tr>
        </thead>
  
        <tbody>
        {items.slice(1, items.length).map((item, index) => {
            return (
              <tr key={"row-" + index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
              </tr>
            );
          })}
        
        </tbody>
      </Table>
      </>
    )
  }
}

export default App;
