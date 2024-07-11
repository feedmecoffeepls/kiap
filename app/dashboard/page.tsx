import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardPage from "./dashboardPage";
import { getQueryClient } from "@/lib/tanstack/queryClient";
import { fetchUserBids } from "@/lib/tanstack/fetchUserBids";

const Dashboard = async () => {
    const queryClient = getQueryClient()

    void queryClient.prefetchQuery(await fetchUserBids())
    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <DashboardPage />
            </HydrationBoundary>
        </>
    )
}
export default Dashboard;