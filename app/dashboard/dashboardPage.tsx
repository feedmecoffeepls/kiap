"use client";

import BidsTable from "@/components/dashboard/bidsTable";
import ItemsTable from "@/components/dashboard/itemsTable";
import { useSellerMode } from "@/stores/sellerMode";

const DashboardPage = () => {


    const sellerMode = useSellerMode((state) => state.sellerMode);

    return (
        <div>
            {!sellerMode && <BidsTable />}
            {sellerMode && <ItemsTable />}
        </div>
    )
}

export default DashboardPage;