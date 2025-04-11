import React, { useEffect, useState } from "react";
import { BaseUrl, formatDate, timeAgo, timeDifference } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Progress() {

    const [selectedLevel, setSelectedLevel] = React.useState(1);
    const [planData, setPlanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const id = localStorage.getItem('id');

    const levels = [
        { id: 1, name: "Complete" },
        { id: 2, name: "Running" },
        { id: 3, name: "Ready" },
    ];

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/myplan/${id}`);
            const json = await response.json();
            console.log('plan data:', json);
            if (selectedLevel === 1) {
                const completed = json.filter((item) => item.status === 'complete');
                setPlanData(completed);
            } else if (selectedLevel === 2) {
                const completed = json.filter((item) => item.status === 'pending');
                setPlanData(completed);
            } else if (selectedLevel === 3) {
                const completed = json.filter((item) => item.status === 'ready');
                setPlanData(completed);
            }
        } catch (e) {
            console.log('error fetching plans...');
        } finally {
            setLoading(false);
        }
    }

    const handleClaim = async (planId) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/dailyclaim/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    planId: planId
                })
            });
            if (!response.ok) {
                alert('error in claiming');
            } else {
                alert('successfully claimed');
                fetchPlans();
            }
        } catch (e) {
            console.log('error in claim', e);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPlans();
    }, [selectedLevel])

    return (<>
        {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center mt-[10%] w-full mb-[20%]">
            <div className="flex space-x-4 mb-2 position-fixed bg-white">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 ${selectedLevel === level.id
                            ? "bg-[#347928] text-white shadow-lg"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {level.name}
                    </button>
                ))}
            </div>
            {planData?.map((item) => (<div className="w-[90%] flex flex-col items-center p-2 py-4 shadow-sm rounded-xl mt-[10%]">
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-black">Invested Amount:</span>
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-right text-[#347928]">{item?.investment}</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-black">Daily Profit:</span>
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-right text-[#347928]">{item?.dailyProfit}</span>
                </div>
                {selectedLevel === 2 && <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-black">Remaining Time to Claim:</span>
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-right text-[#347928]">{item?.lastClaim && timeDifference(item.lastClaim)}</span>
                </div>}
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-black">Starting Date:</span>
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-right text-[#347928]">{item?.startDate && formatDate(item.startDate)}</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-black">Ending Date:</span>
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-right text-[#347928]">{item?.endDate && formatDate(item.endDate)}</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-black">Status:</span>
                    <span className="text-[12px] font-bold ml-2 w-[50%] text-right text-[#347928]">{item?.status}</span>
                </div>
                {item?.status === 'pending' && <span className="px-2 py-1 border-[1.5px] border-[#347928] rounded-md text-[12px] text-[#347928] self-start ml-[5%] mt-2">Pending</span>}
                {item?.status === 'ready' && <button onClick={() => handleClaim(item._id)} className="px-2 py-1 bg-[#347928] rounded-md text-[12px] text-white self-start ml-[5%] mt-2">Claim</button>}
            </div>))}
        </div>}
    </>
    )
}