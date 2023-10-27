import React, { useEffect, useState } from "react";
import axios from "axios";

function ApiPractices(props) {
    const [data, setData] = useState([]);
    // const [filter, setFilter] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [showData, setShowData] = useState(5);
    const [maxValue, setMaxValue] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [errorMessage, setErrorMessage] = useState({
        maxValue: false,
        greaterThanZero: false,
        LessThanEighty: false,
    });

    const fetchData = () => {
        if ((showData > 0 && showData <= 80) && (pageNo > 0 && pageNo <= maxValue)) {
            axios
                .get(
                    `https://api.punkapi.com/v2/beers?page=${pageNo}&per_page=${showData}`
                )
                .then((res) => {
                    setData(res.data)
                    setTotalPage(Math.ceil(res.data.length / 10))
                })

                .catch((err) => console.log(err));
        }
    };



    useEffect(() => {
        const maxValueLimit = 325 / showData;
        setMaxValue(Math.ceil(maxValueLimit));

    }, [showData]);


    useEffect(() => {
        if ((showData > 0 && showData <= 80) && (pageNo > 0 && pageNo <= maxValue)) {
            const getData = setTimeout(() =>
                fetchData(), 2000)
            return () => clearTimeout(getData)

        }

    }, [pageNo, showData])

    const handleChange = (e) => {
        const newValue = e.target.value;
        setShowData(newValue);
        setPageNo(1);
    }

    const handlePageChnage = (newPage) => {
        setPageNo(newPage)

    }

    const handleNextClick = () => {
        if (pageNo < totalPage) {
            setPageNo(pageNo + 1)
        }

    }
    const handlePrevClick = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1)
        }

    }

    const prevDisable = pageNo === 1;
    const nextDisable = pageNo === totalPage;

    const itemsPerPage = 10;
    const startIndex = (pageNo-1) * itemsPerPage;
    const lastIndex = startIndex + itemsPerPage;
    const itemToDisplay = data.slice(startIndex, lastIndex);






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
                            handleChange(e)
                            if (Number(e.target.value) <= 0 || Number(e.target.value) > 80) {
                                setErrorMessage({ ...errorMessage, LessThanEighty: true })
                            } else {
                                setErrorMessage({ ...errorMessage, LessThanEighty: false })
                            }
                        }}
                    />
                    <br />


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
                        onChange={(e) => {
                            setPageNo(e.target.value);
                            if (Number(e.target.value) <= 0 || Number(e.target.value) > maxValue) {
                                setErrorMessage({ ...errorMessage, maxValue: true })
                            } else {
                                setErrorMessage({ ...errorMessage, maxValue: false })
                            }

                        }}
                    />

                </div>
            </form>

            {errorMessage.maxValue && <p>{`Max Value ${maxValue}`}</p>}
            {errorMessage.greaterThanZero && <p>Must be greater than zero</p>}
            {errorMessage.LessThanEighty && <p>Show data range is 1-80</p>}

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
                    {itemToDisplay?.map((items) => (
                        <tr key={items.id}>
                            <th scope="row">{items.id}</th>
                            <td>{items.name}</td>
                            <td>{items.tagline}</td>
                            <td>{items.first_brewed}</td>
                            <td>{items.description}</td>
                        </tr>
                    ))}
                </tbody>
                {
                        Array.from({length: totalPage}, (_,i) => {
                            return (
                                <div className="d-flex">
                                     <button onClick={() => handlePageChnage(i+1)} key={i}>{i+1}</button>

                                </div>
                               
                            )
                        })
                    }
            </table>


        </>
    );
}

export default ApiPractices;