import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import { Dots, Spinner } from "react-activity";

export default function Dashboard() {

    const id = localStorage.getItem('id');
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const fetchScreenshots = async () => {
        try {
            const response = await fetch(`${BaseUrl}/screenshot`);
            const json = await response.json();
            const pendingData = await json.filter((item) => item.verify === false);
            setScreenshots(pendingData);
        } catch (e) {
            console.log('error fetching screenshots');
        }
    }

    useEffect(() => {
        fetchScreenshots();
    }, []);

    const verifyScreenshot = async (amount, screenshotId) => {
        try {
            setLoading(true);
            setSelectedId(screenshotId);
            const response = await fetch(`${BaseUrl}/verifyscreenshot/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount,
                    screenshotId
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Success:", data.message);
                fetchScreenshots();
            } else {
                console.error("Failed:", data.message);
            }

        } catch (error) {
            console.error("Error:", error.message);
        } finally {
            setLoading(false);
        }
    };


    const RenderScreenshots = () => {
        return (<>
            {screenshots?.map((item) => (
                < div className="flex flex-col items-center shadow-m rounded-lg w-[90%] p-2 border">
                    <img src={item.image1} alt="Screenshot" className="w-full h-[150px] rounded-md" />
                    <span className="w-full text-[14px] font-medium mt-[2%]">Name: {item.name}</span>
                    <span className="w-full text-[14px] font-medium">Bank: {item.bank}</span>
                    <span className="w-full text-[14px] font-medium">Amount: {item.amount}</span>
                    {loading && selectedId === item._id ? (
                        <Spinner color="#000" size={32} speed={1} animating={true} />
                    ) : (
                        <button
                            onClick={() => verifyScreenshot(item.amount, item._id)}
                            className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-full mt-[5%]"
                        >
                            Verify
                        </button>
                    )}
                </div >))}
        </>
        )
    }

    return (
        <div className="flex flex-col items-center w-full bg-white">
            <RenderScreenshots />
        </div>
    )
}