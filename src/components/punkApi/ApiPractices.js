import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"

function ApiPractices(props) {
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [showData, setShowData] = useState(5);
    const [maxValue, setMaxValue] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [errorMessage, setErrorMessage] = useState({
        maxValue: false,
        greaterThanZero: false,
        LessThanEighty: false,
    });

    const fetchData = (pageNo) => {
        if ((showData > 0 && showData <= 80) && (pageNo > 0 && pageNo <= maxValue)) {
            axios
                .get(
                    `https://api.punkapi.com/v2/beers?page=${pageNo}&per_page=${showData}`
                )
                .then((res) => {
                    setData(res.data)
                })

                .catch((err) => console.log(err));
        }
    };



    useEffect(() => {
        const maxValueLimit = 325 / showData;
        setMaxValue(Math.ceil(maxValueLimit));

    }, [showData]);

    useEffect(() => {
        const array = [];
        if (maxValue > 0 && maxValue !== Infinity) {
            for (let i = 1; i <= maxValue; i++) {
                array.push(i)
            }
            setPagination(array)
        } else {
            setPagination(array)
        }

    }, [maxValue])




    useEffect(() => {
        if ((showData > 0 && showData <= 80) && (pageNo > 0 && pageNo <= maxValue)) {
            const getData = setTimeout(() =>
                fetchData(pageNo), 2000)
            return () => clearTimeout(getData)
        }
    }, [showData])

    const handleChange = (e) => {
        const newValue = e.target.value;
        setShowData(newValue);
        setPageNo(1);
    }

    const handlePageChnage = (newPage) => {
        setPageNo(newPage);
        fetchData(newPage);

    }

    // const handleNextClick = () => {
    //     if (pageNo < maxValue) {
    //         setPageNo(pageNo + 1)
    //     }

    // }
    // const handlePrevClick = () => {
    //     if (pageNo > 1) {
    //         setPageNo(pageNo - 1)
    //     }

    // }

    // const prevDisable = pageNo === 1;
    // const nextDisable = pageNo === totalPage;








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
                            if ((showData > 0 && showData <= 80) && (e.target.value > 0 && e.target.value <= maxValue)) {
                                const getData = setTimeout(() =>
                                    fetchData(e.target.value), 2000)
                                return () => clearTimeout(getData)
                            }

                        }}
                    />
                </div>
            </form>

            {errorMessage.maxValue && <p>{`Max Value ${maxValue}`}</p>}
            {errorMessage.greaterThanZero && <p>Must be greater than zero</p>}
            {errorMessage.LessThanEighty && <p>Show data range is 1-80</p>}

            <div className="pagination mb-3">
                {
                    maxValue && pagination.length > 0 && pagination.map((item, i) => {

                        return (

                            <div key={`shoaib${i}`}>
                                <button onClick={() => handlePageChnage(item)} key={item} disabled={item === pageNo}>{item}</button>

                            </div>
                        )
                    })
                }
            </div>



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