import React, { useEffect } from "react";
import { BaseUrl, formatDate } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";


export default function DepositHistory() {

    const [loading, setLoading] = React.useState(false);
    const [depositHistory, setDepositHistory] = React.useState([]);
    const id = localStorage.getItem('id');

    const fetchDepositHistory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/deposit-history/${id}`);
            const json = await response.json();
            console.log('Deposit history:', json);
            setDepositHistory(json);
        } catch (e) {
            console.log('error fetching deposit history', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDepositHistory();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen mt-[10%] w-full">
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col items-center w-[90%]">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        depositHistory.map((item, index) => (
                            <div key={index} className="flex flex-col items-center w-full p-2 border-b last:border-b-0 border shadow-sm rounded-md">
                                <span className="text-xs text-black font-medium w-full">Transaction: {item.type}</span>
                                <span className="text-xs text-black font-medium w-full">Amount: {item.amount}</span>
                                <span className="text-xs text-black font-medium w-full">Status: <span className="text-[#3F7D58]">{item.status}</span></span>
                                <span className="text-xs text-black font-medium w-full text-right">{item.timestamp && formatDate(item.timestamp)}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}