import React, { useEffect, useState } from "react";
import axios from "axios";

function ApiPractices(props) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [showData, setShowData] = useState(5);
  const [message, setMessage] = useState(false);
  const [maxValue, setMaxValue] = useState(1);
  const [error, setError] = useState(false);
  const [max, setMax] = useState(false);
  const [timer, setTimer] = useState(null)
  const fetchData = () => {
    if (showData > 0 && showData <= 80) {
      axios
        .get(
          `https://api.punkapi.com/v2/beers?page=${pageNo}&per_page=${showData}`
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
  };



  useEffect(() => {
    const maxValueLimit = 325 / showData;
    setMaxValue(Math.ceil(maxValueLimit));

  }, [showData]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const inputChange = (e) => {
    setPageNo(e.target.value)

    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      fetchData();
    }, 1000)

    setTimer(newTimer)

  }
  console.log(pageNo)

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
            onChange={(e) => {
              setShowData(e.target.value);
              if (Math.sign(e.target.value) === 1) {
                if (!message && !error && pageNo && pageNo <= maxValue && showData && showData <= 80 && !max) {
                  console.log("if satemene");
                  setTimeout(() => {
                    setFilter(showData);
                  }, 2000);
                }

              } else {
                // setMessage(true);
              }


              // if (Math.sign(e.target.value) === 1) {
              //     setMessage(false);
              //     if (e.target.value > 80) {
              //         setError(true);
              //     } else {
              //         setError(false);
              //         setTimeout(() => {
              //             setFilter(showData);
              //         }, 2000);
              //     }
              // } else {
              //     setMessage(true);
              // }
            }}
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
            onChange={inputChange}
          // onChange={(e) => {
          //   setPageNo(e.target.value);
          //   if (Math.sign(e.target.value) === 1) {
          //     if (!message && !error && pageNo && pageNo <= maxValue && showData && showData <= 80 && !max) {
          //       console.log("if satemene");
          //       setTimeout(() => {
          //         // setMax(false)
          //         setFilter(pageNo);
          //       }, 2000);
          //     }

          //   } else {
          //     // setMessage(true);
          //   }
          // }}
          />
          <br />
          {max && <span>{`PLZ ENTER 1 TO ${maxValue} number`}</span>}
          {error && <span>PLZ ENTER 1 TO 80 NUMBER ONLY</span>}
          {message && <span>Plz enter greater than 0 value</span>}
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