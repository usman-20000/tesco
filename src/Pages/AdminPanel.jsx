import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faMoneyBill, faBars, faTimes, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";
import TotalUsers from "../components/TotalUsers";
import ActiveUsers from "../components/ActiveUsers";
import PendingWithdraw from "../components/PendingWithdraw";
import TotalWithdraw from "../components/TotalWithdraw";
import PendingDeposit from "../components/PendingDeposits";
import TotalDeposit from "../components/TotalDeposit";
import Plans from "../components/Plans";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AdminPanel() {
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        pendingDeposits: 0,
        totalDeposits: 0,
        pendingWithdrawals: 0,
        totalWithdrawals: 0,
        unverifiedUsers: 0,
    });
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Dashboard");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {

            const usersResponse = await fetch(`${BaseUrl}/register`);
            const depositsResponse = await fetch(`${BaseUrl}/screenshot`);
            const withdrawalsResponse = await fetch(`${BaseUrl}/withdraw`);
            const activeResponse = await fetch(`${BaseUrl}/active-users`);

            const usersData = await usersResponse.json();
            const depositsData = await depositsResponse.json();
            const activeUsers = await activeResponse.json();
            const pendingDeposits = depositsData.filter(item => item.verify === false).length;
            const unverifiedUsers = usersData.filter(item => item.ban === true).length;
            const withdrawalsData = await withdrawalsResponse.json();
            const pendingWithdrawals = withdrawalsData.filter(item => item.pending === true).length;
            console.log('usersData:', depositsData);

            setDashboardData({
                totalUsers: usersData.length,
                activeUsers: activeUsers.data.length,
                pendingDeposits: pendingDeposits,
                totalDeposits: depositsData.length,
                pendingWithdrawals: pendingWithdrawals,
                totalWithdrawals: withdrawalsData.length,
                unverifiedUsers: unverifiedUsers,
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const Sidebar = () => (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 lg:translate-x-0`}
        >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <button className="lg:hidden text-white" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <nav className="mt-4">
                <ul className="space-y-2">
                    <li onClick={() => { setSelectedTab('Dashboard'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
                    <li onClick={() => { setSelectedTab('Plans'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Plans</li>
                    <li onClick={() => { setSelectedTab('TotalUsers'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Total Users</li>
                    <li onClick={() => { setSelectedTab('ActiveUsers'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Active Users</li>
                    <li onClick={() => { setSelectedTab('TotalWithdraw'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Total Withdrawals</li>
                    <li onClick={() => { setSelectedTab('PendingWithdraw'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Pending Withdrawals</li>
                    <li onClick={() => { setSelectedTab('TotalDeposit'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Total Deposit</li>
                    <li onClick={() => { setSelectedTab('PendingDeposit'); setSidebarOpen(false); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Pending Deposit</li>
                </ul>
            </nav>
        </div>
    );

    const DashboardCard = ({ icon, title, value, bgColor, iconColor }) => (
        <div
            className={`card p-4 flex flex-row rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 items-center`}
        >
            <div className={`flex flex-col w-[10%] py-2 items-center justify-center `}>
                <FontAwesomeIcon icon={icon} className={`${iconColor} text-2xl mb-2 ${bgColor} p-2 rounded-md`} />
            </div>
            <div className="flex flex-col w-[70%] ml-[10%] md:ml-[5%]">
                <p className="text-xl text-left font-bold mb-0">{value}</p>
                <h2 className="text-lg font-medium text-left">{title}</h2>
            </div>
            <div className="flex flex-col w-[10%] items-center">
                <FontAwesomeIcon icon={faChevronRight} className={`text-xl mb-2 text-gray-400`} />
            </div>
        </div>
    );

    const ChartContainer = ({ title, data }) => (
        <div className="chart bg-white p-4 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <Bar data={data} className="h-[200px]" options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
    );

    const depositsChartData = {
        labels: ["Pending", "Total"],
        datasets: [
            {
                label: "Deposits",
                data: [dashboardData.pendingDeposits, dashboardData.totalDeposits],
                backgroundColor: ["#FF6384", "#36A2EB"],
            },
        ],
    };

    const withdrawalsChartData = {
        labels: ["Pending", "Total"],
        datasets: [
            {
                label: "Withdrawals",
                data: [dashboardData.pendingWithdrawals, dashboardData.totalWithdrawals],
                backgroundColor: ["#FFCE56", "#4BC0C0"],
            },
        ],
    };

    const DashBoard = () => {
        return (
            <div className="dashboard md:w-[80%] md:ml-[20%]">
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <DashboardCard
                        icon={faUsers}
                        title="Total Users"
                        value={dashboardData?.totalUsers}
                        bgColor="bg-red-100"
                        iconColor="text-orange-500"
                    />
                    <DashboardCard
                        icon={faUsers}
                        title="Active Users"
                        value={dashboardData?.activeUsers}
                        bgColor="bg-blue-100"
                        iconColor="text-blue-500"
                    />
                    <DashboardCard
                        icon={faMoneyBill}
                        title="Pending Deposits"
                        value={dashboardData?.pendingDeposits}
                        bgColor="bg-green-100"
                        iconColor="text-green-500"
                    />
                    <DashboardCard
                        icon={faMoneyBill}
                        title="Total Deposits"
                        value={dashboardData?.totalDeposits}
                        bgColor="bg-yellow-100"
                        iconColor="text-yellow-500"
                    />
                    <DashboardCard
                        icon={faMoneyBill}
                        title="Pending Withdrawals"
                        value={dashboardData?.pendingWithdrawals}
                        bgColor="bg-red-100"
                        iconColor="text-red-500"
                    />
                    <DashboardCard
                        icon={faMoneyBill}
                        title="Total Withdrawals"
                        value={dashboardData?.totalWithdrawals}
                        bgColor="bg-purple-100"
                        iconColor="text-purple-500"
                    />
                    <DashboardCard
                        icon={faUsers}
                        title="Unverified Users"
                        value={dashboardData?.unverifiedUsers}
                        bgColor="bg-purple-100"
                        iconColor="text-pink-500"
                    />
                </div>

                {/* Charts */}
                <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ChartContainer title="Deposits Chart" data={depositsChartData} />
                    <ChartContainer title="Withdrawals Chart" data={withdrawalsChartData} />
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className={`flex-1 flex flex-col bg-gray-100 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Top Bar */}
                <div className="flex items-center justify-between bg-white px-4 py-4 shadow-md ">
                    <h1 className="text-xl font-bold md:text-center md:w-[60%]">Admin Panel</h1>
                    <button className="text-gray-800 lg:hidden" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>

                {/* Dashboard Content */}
                <div className="p-4">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {selectedTab === 'Dashboard' && <DashBoard />}
                            {selectedTab === 'TotalUsers' && <TotalUsers />}
                            {selectedTab === 'ActiveUsers' && <ActiveUsers />}
                            {selectedTab === 'PendingWithdraw' && <PendingWithdraw />}
                            {selectedTab === 'TotalWithdraw' && <TotalWithdraw />}
                            {selectedTab === 'PendingDeposit' && <PendingDeposit />}
                            {selectedTab === 'TotalDeposit' && <TotalDeposit />}
                            {selectedTab === 'Plans' && <Plans />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;