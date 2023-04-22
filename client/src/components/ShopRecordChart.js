import React from "react";
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

const ShopRecordChart = () => {
    const data = [
        {
            "date": "Day 1",
            "bought": 20
        },
        {
            "date": "Day 2",
            "bought": 50
        },
        {
            "date": "Day 3",
            "bought": 10
        },
        {
            "date": "Day 4",
            "bought": 5
        },
        {
            "date": "Day 5",
            "bought": 9
        },
        {
            "date": "Day 6",
            "bought": 70
        },
        {
            "date": "Day 7",
            "bought": 100
        }
    ]

    const topProduct = [
        {
            "name": "Product 1",
            "sold": 200
        },
        {
            "name": "Product 2",
            "sold": 500
        },
        {
            "name": "Product 3",
            "sold": 2000
        },
        {
            "name": "Product 4",
            "sold": 1500
        }
    ]

    const categoryRecord = [
        {
            "name": "Category 1",
            "sold": 200
        },
        {
            "name": "Category 2",
            "sold": 500
        },
        {
            "name": "Category 3",
            "sold": 2000
        },
        {
            "name": "Category 4",
            "sold": 1500
        }
    ]

    topProduct.sort((a, b) => {
        return a.sold - b.sold;
    })

    return <div>
        <div className="rounded-2xl p-6 border-teal-200 border-[.125rem] ml-9 mt-10 mr-8 align-middle">
            <h3 className="text-center mb-5 text-2xl">Products Sold last 7 days</h3>
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
                        <XAxis dataKey="sold" type={"number"} />
                        <YAxis dataKey="name" reversed type="category" />
                        <Tooltip />
                        <Legend verticalAlign="top"/>
                        <Bar dataKey="sold" fill="#F0BD58" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="rounded-2xl p-6 border-teal-200 border-[.125rem] ml-9 mt-10 w-2/3 mr-8">
                <h3 className="text-center mb-5 text-2xl">Category Customer Interested in last 7 days </h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart width={730} height={400} data={categoryRecord}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"/>
                        <YAxis label={{value: 'Product Sold', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip />

                        <Legend verticalAlign="top" iconType={"circle"} height={36}/>
                        <Bar type="monotone" barSize={25} dataKey="sold" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="rounded-2xl p-6 border-teal-200 border-[.125rem] ml-9 mt-10 mr-8 mb-10">
            <h3 className="text-center mb-5 text-2xl">Current Billing</h3>
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
                                    <tr className="border-b dark:border-neutral-500">
                                        <th scope="col" className="px-6 py-4">1</th>
                                        <th scope="col" className="px-6 py-4">123</th>
                                        <th scope="col" className="px-6 py-4">Phuc Hoang</th>
                                        <th scope="col" className="px-6 py-4">250$</th>
                                        <th scope="col" className="px-6 py-4">20/4/2023</th>
                                        <th scope="col" className="px-6 py-4">Processing</th>
                                        <th scope="col" className="px-6 py-4">
                                            <button
                                                type="button"
                                                className="inline-block rounded bg-blue-300 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                View Detail
                                            </button>
                                        </th>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <th scope="col" className="px-6 py-4">1</th>
                                        <th scope="col" className="px-6 py-4">123</th>
                                        <th scope="col" className="px-6 py-4">Phuc Hoang</th>
                                        <th scope="col" className="px-6 py-4">250$</th>
                                        <th scope="col" className="px-6 py-4">20/4/2023</th>
                                        <th scope="col" className="px-6 py-4">Processing</th>
                                        <th scope="col" className="px-6 py-4">
                                            <button
                                                type="button"
                                                className="inline-block rounded bg-blue-300 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                View Detail
                                            </button>
                                        </th>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <th scope="col" className="px-6 py-4">1</th>
                                        <th scope="col" className="px-6 py-4">123</th>
                                        <th scope="col" className="px-6 py-4">Phuc Hoang</th>
                                        <th scope="col" className="px-6 py-4">250$</th>
                                        <th scope="col" className="px-6 py-4">20/4/2023</th>
                                        <th scope="col" className="px-6 py-4">Processing</th>
                                        <th scope="col" className="px-6 py-4">
                                            <button
                                                type="button"
                                                className="inline-block rounded bg-blue-300 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                View Detail
                                            </button>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default ShopRecordChart;