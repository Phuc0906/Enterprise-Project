import React from "react";
import NavBar from "../components/NavBar";
import ShopRecord from "../components/ShopRecord";
import ShopRecordChart from "../components/ShopRecordChart";
import {shopNavContent} from "../utils";

const ShopDashboard = () => {

    return <div>
        <NavBar items={shopNavContent} />
        <ShopRecord />
        <ShopRecordChart/>
    </div>
}

export default ShopDashboard;