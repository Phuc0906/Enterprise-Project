import React, {useEffect, useState} from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {splittingPriceNumber} from "../utils";
import {Link} from "react-router-dom";

const ShopRecordChart = ({recordData}) => {
    const [data, setData] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [categoryRecord, setCategoryRecord] = useState([]);
    const [billings, setBillings] = useState([]);
    const [totalBillingPage, setTotalBillingPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [minIdx, setMinIdx] = useState(0);
    const [maxIdx, setMaxIdx] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        topProduct.sort((a, b) => {
            return a.sold - b.sold;
        })
    }, [topProduct])


    useEffect(() => {
    }, [currentPage])

    useEffect(() => {
        let settingArr = [];
        for (let i = 0; i < recordData.length; i++) {
            settingArr.push({
                "date": recordData[i].date,
                "bought": recordData[i].billingResponses.length
            })
        }
        setData(settingArr);

        fetch(`https://${process.env.REACT_APP_API_URL}/api/billing/product-record/`+JSON.parse(localStorage.profile).name, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then(res => {
                const serverRes = res.json();
                serverRes.then(data => {
                    setTopProduct(data);
                })
            })

        fetch(`https://${process.env.REACT_APP_API_URL}/api/billing/category-record/`+JSON.parse(localStorage.profile).name, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then(res => {
                const serverRes = res.json();
                serverRes.then(data => {
                    setCategoryRecord(data);
                })
            })

        getBillingData();


    }, [recordData])

    const previousClick = () => {
        setMinIdx((currentPage - 1)*10 - 10)
        setMaxIdx((currentPage - 1)*10)
        setCurrentPage(currentPage - 1);
    }

    const nextClick = () => {
        setMinIdx((currentPage + 1)*10 - 10)
        setMaxIdx((currentPage + 1)*10)
        setCurrentPage(currentPage + 1);
    }


    const RowBuilder = ({billing}) => {
        return <tr className="border-b dark:border-neutral-500">
            <th scope="col" className="px-6 py-4">{billing.id}</th>
            <th scope="col" className="px-6 py-4">{billing.customer.id}</th>
            <th scope="col" className="px-6 py-4">{billing.customer.name}</th>
            <th scope="col" className="px-6 py-4">{splittingPriceNumber(billing.totalPrice.toString())} vnd</th>
            <th scope="col" className="px-6 py-4">{billing.date}</th>
            <th scope="col" className="px-6 py-4">{(billing.status === 0) ? 'Wait for processing' : (billing.status === 1) ? 'Wait for shipper' : (billing.status === 2) ? 'Delivering' : 'Delivered'}</th>
            <th scope="col" className="px-6 py-4">
                <Link
                    to={'/shop/billing-detail'}
                    state={{billing: billing}}
                    type="button"
                    className="inline-block rounded bg-blue-300 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    View Detail
                </Link>
            </th>
        </tr>
    }

    const getBillingData = () => {
        fetch(`https://${process.env.REACT_APP_API_URL}/api/billing/shop/`+JSON.parse(localStorage.profile).name,  {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token,
            }
        })
            .then(res => {
                const serverRes = res.json();
                serverRes.then(data => {
                    setBillings(data);
                    if (data.length % 10 === 0) {
                        setTotalBillingPage(data.length / 10);
                    }else {
                        setTotalBillingPage(parseInt(data.length / 10) + 1)
                    }

                })
            })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue.length !== 0) {
                let filterArr = billings;
                filterArr = filterArr.filter(billing => (billing.id.toString().includes(searchValue)));
                setBillings(filterArr);
            }else {
                getBillingData();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    const onSearchBillingChange = (e) => {
        setSearchValue(e.target.value);
    }


    return <div>
        <div className="rounded-2xl p-6 border-teal-200 border-[.125rem] ml-9 mt-10 mr-8 align-middle">
            <h3 className="text-center mb-5 text-2xl">Products Sold</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart width={730} height={400} data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"/>
                    <YAxis label={{value: 'Product Sold', angle: -90, position: 'insideLeft'}}/>
                    <Tooltip />

                    <Legend verticalAlign="top" iconType={"circle"} height={36}/>
                    <Line type="monotone" strokeWidth={3} dataKey="bought" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

        </div>
        <div className="flex">
            <div className="rounded-2xl p-6 border-teal-200 border-[.125rem] ml-9 mt-10 w-1/3">
                <h3 className="text-center mb-5 text-2xl">Top Products Sold</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart barCategoryGap={30} margin={{ top: 5, right: 0, left: 20, bottom: 5 }} layout="vertical" data={topProduct}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="totalSold" type={"number"} />
                        <YAxis  dataKey="productName" reversed type="category"
                                tickFormatter={(value) => {
                                    // Replace this logic with your desired label truncation or abbreviation method
                                    if (value.length > 10) {
                                        return value.substring(0, 10) + '...';
                                    }
                                    return value;
                                }}
                        />
                        <Tooltip />
                        <Legend verticalAlign="top"/>
                        <Bar dataKey="totalSold" fill="#F0BD58" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="rounded-2xl p-6 border-teal-200 border-[.125rem] ml-9 mt-10 w-2/3 mr-8">
                <h3 className="text-center mb-5 text-2xl">Category Customer Interested</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart width={730} height={400} data={categoryRecord}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="productName"/>
                        <YAxis label={{value: 'Product Sold', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip />

                        <Legend verticalAlign="top" iconType={"circle"} height={36}/>
                        <Bar type="monotone" barSize={25} dataKey="totalSold" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="rounded-2xl p-6 border-teal-200 border-[.125rem] ml-9 mt-10 mr-8 mb-10">
            <h3 className="text-center mb-5 text-2xl">Current Billing</h3>
            <div className="border-[2px] border-gray-200 w-1/3 p-2 rounded-xl">
                <input onChange={onSearchBillingChange} placeholder="Search by billing id"/>
            </div>
            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Billing No</th>
                                    <th scope="col" className="px-6 py-4">Customer ID</th>
                                    <th scope="col" className="px-6 py-4">Customer Name</th>
                                    <th scope="col" className="px-6 py-4">Total Price</th>
                                    <th scope="col" className="px-6 py-4">Order Date</th>
                                    <th scope="col" className="px-6 py-4">Status</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {billings.map((billing, index) => {
                                    if (searchValue.length !== 0) {
                                        return <RowBuilder key={index} billing={billing} />
                                    }else {
                                        if ((index < maxIdx) && (index >= minIdx)) {
                                            return <RowBuilder key={index} billing={billing} />
                                        }
                                    }
                                    return null;
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2 ml-5 mr-5">
                <div onClick={previousClick} className={`p-2 hover:bg-gray-200 rounded-sm ${(currentPage === 1) ? 'invisible' : ''}`}>
                    Previous
                </div>
                <div onClick={nextClick} className={`p-2 hover:bg-gray-200 rounded-sm ${(currentPage === totalBillingPage) ? 'invisible' : ''}`}>
                    Next
                </div>

            </div>
        </div>
    </div>
}
export default ShopRecordChart;