import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Table.css"

function TableData() {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);


    useEffect(() => {

        setLoader(true)
        const getData = () => {
            axios.get("https://dummyjson.com/products").then((res) => setData(res.data.products)).catch((err) => console.log(err))
        }
        getData();

        setTimeout(() => {
            setLoader(false)
        }, 2000);

    }, [])

    return (
        <>
            <h2 className='text-center mt-5 mb-5'>ALL DATA</h2>

            {loader ? (<div className="spinner-border text-secondary" role="status">
                <span>Wait..</span>
            </div>) : <table class="table table-striped table-dark table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">DiscountPercentage</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Category</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((items) => (
                        <tr>
                            <th scope="row">{items.id}</th>
                            <td>{items.title}</td>
                            <td>{items.description}</td>
                            <td>{items.price}</td>
                            <td>{items.discountPercentage}</td>
                            <td>{items.rating}</td>
                            <td>{items.brand}</td>
                            <td>{items.category}</td>
                            <td><img className='w-25' src={items.images[0]} alt='product-img' /></td>

                        </tr>

                    ))}


                </tbody>
            </table>}



        </>
    )
}

export default TableData