import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import { Dots, Spinner } from "react-activity";
import Modal from "../components/ModalShow";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PendingDeposit() {

    const [screenshots, setScreenshots] = useState([]);
    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [userDetail, setUserDetail] = useState({});
    const [view, setView] = useState('screenshots');

    // Fetch Screenshots
    const fetchScreenshots = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/screenshot`);
            const json = await response.json();
            const pendingData = await json.filter((item) => item.verify === false);
            setScreenshots(pendingData);
        } catch (e) {
            console.log('error fetching screenshots');
        } finally {
            setLoading(false);
        }
    }


    // Fetch Withdraw Requests
    const fetchWithdrawRequests = async () => {
        try {
            const response = await fetch(`${BaseUrl}/withdraw`);
            const json = await response.json();
            const pendingData = await json.filter((item) => item.pending === true);
            setWithdrawRequests(pendingData);
        } catch (e) {
            console.log('error fetching withdraw requests');
        }
    }

    useEffect(() => {
        fetchScreenshots();
        fetchWithdrawRequests();
    }, []);

    const verifyScreenshot = async (amount, screenshotId, id) => {
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
        return (
            <>
                {screenshots?.map((item) => (
                    <div onClick={() => { setSelectedImage(item.image1); setIsModalOpen(true); }} className="flex flex-col items-center shadow-m rounded-lg w-[90%] p-2 border">
                        <img src={item.image1} alt="Screenshot" className="w-full h-[150px] rounded-md" />
                        <span className="w-full text-[14px] font-medium mt-[2%]">Name: {item.name}</span>
                        <span className="w-full text-[14px] font-medium">Bank: {item.bank}</span>
                        <span className="w-full text-[14px] font-medium">Amount: {item.amount}</span>
                        {loading && selectedId === item._id ? (
                            <Spinner color="#000" size={32} speed={1} animating={true} />
                        ) : (
                            <button
                                onClick={() => verifyScreenshot(item.amount, item._id, item.payerId)}
                                className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-full mt-[5%]"
                            >
                                Verify
                            </button>
                        )}
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full md:w-[80%] md:ml-[20%] bg-white">
                {/* Conditional Rendering Based on View */}
                <RenderScreenshots />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <img src={selectedImage} alt="image" className="h-auto w-full transition-transform duration-300 ease-in-out hover:scale-150" />
                    <h2 className="text-2xl font-semibold mb-4">Modal Content</h2>
                    <div className="flex flex-col items-center w-full">
                        <span className="w-full text-[14px] font-medium">Name: {userDetail.name}</span>
                        <span className="w-full text-[14px] font-medium">Email: {userDetail.email}</span>
                        <span className="w-full text-[14px] font-medium">Balance: {userDetail.balance}</span>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Close Modal
                    </button>
                </Modal>
            </div>}
        </>
    );
}
