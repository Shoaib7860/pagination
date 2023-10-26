import React, { useEffect, useState } from "react";
import axios from "axios";

function ApiPractices(props) {
  const [data, setData] = useState([]);
  // const [filter, setFilter] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [showData, setShowData] = useState(5);
  const [message, setMessage] = useState(false);
  const [maxValue, setMaxValue] = useState(1);

  const fetchData = () => {
    if ((showData > 0 && showData <= 80) && (pageNo > 0 && pageNo <= maxValue)) {
      axios
        .get(
          `https://api.punkapi.com/v2/beers?page=${pageNo}&per_page=${showData}`
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
  };


  useEffect(() => {
    const maxValueLimit = 325 / showData;
    setMaxValue(Math.ceil(maxValueLimit));

  }, [showData]);


  useEffect(() => {
    if (showData <= 0 && showData > 80) {
      setMessage(true)
      return
    }
    if (!showData) {
    }
    if ((showData > 0 && showData <= 80) && (pageNo > 0 && pageNo <= maxValue)) {
      setMessage(false)
      const getData = setTimeout(() =>
        fetchData(), 2000)
      return () => clearTimeout(getData)

    }

  }, [pageNo, showData])

  const handleChange = (e) => {
    const newValue = e.target.value;
    setShowData(newValue);
    setPageNo('');
  }


  return (
    <>
      <h1 className="mt-5 mb-5 text-center fw-bold">Pagination Practice</h1>
      <form className="mt-5 mb-5 w-25 d-flex gap-5">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="mb-2 fw-bold">
            Show Data
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            type="number"
            min="1"
            max="80"
            placeholder="Show Data"
            value={showData}
            onChange={handleChange}
          // onChange={(e) => {
          //   setShowData(e.target.value)

          // }}

          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="mb-2 fw-bold">
            Page No {maxValue}
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            type="number"
            min="1"
            max={maxValue}
            placeholder="Enter Page number"
            value={pageNo}
            // onChange={inputChange}
            onChange={(e) => {
              setPageNo(e.target.value);

            }}
          />


        </div>
      </form>

      <table className="table table-striped table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Id
            </th>
            <th scope="col" className="text-center">
              Name
            </th>
            <th scope="col" className="text-center">
              Tag Line
            </th>
            <th scope="col" className="text-center">
              First_brewed
            </th>
            <th scope="col" className="text-center">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((items) => (
            <tr key={items.id}>
              <th scope="row">{items.id}</th>
              <td>{items.name}</td>
              <td>{items.tagline}</td>
              <td>{items.first_brewed}</td>
              <td>{items.description}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  );
}

export default ApiPractices;