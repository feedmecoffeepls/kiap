"use client";

import BidsTable from "@/components/dashboard/bidsTable";
import ItemsTable from "@/components/dashboard/itemsTable";
import PurchaseTable from "@/components/dashboard/purchaseTable";
import { useSellerMode } from "@/stores/sellerMode";

const DashboardPage = () => {


    const sellerMode = useSellerMode((state) => state.sellerMode);

    return (
        <div>
            {!sellerMode && <BidsTable />}
            {!sellerMode && <div className="my-8"><PurchaseTable /></div>}
            {sellerMode && <ItemsTable />}
        </div>
    )
}

export default DashboardPage;