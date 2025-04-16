import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import { Dots, Spinner } from "react-activity";
import Modal from "../components/ModalShow";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PendingWithdraw() {

    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetail, setUserDetail] = useState({});


    const fetchDetail = async (userId) => {
        try {
            setLoading(true);
            setIsModalOpen(true);
            const response = await fetch(`${BaseUrl}/register/${userId}`);
            const json = await response.json();
            if (response.ok) {
                setUserDetail(json);
            }
        } catch (e) {
            console.log('error fetching user data', e);
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
        fetchWithdrawRequests();
    }, []);

    const verifyWithdraw = async (withdrawId) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/verifywithdraw/${withdrawId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Withdraw verified:', data.message);
                fetchWithdrawRequests(); // Refresh the withdraw requests list
                // optionally refresh the list or show success toast
            } else {
                console.error('Failed to verify withdraw:', data.message);
            }

        } catch (error) {
            console.error('Error verifying withdraw:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const RenderWithdrawRequests = () => {
        return (
            <>
                {withdrawRequests?.map((request) => (
                    <div key={request._id} className="flex flex-col items-center shadow-m rounded-lg w-[90%] p-2 border">
                        <span className="w-full text-[14px] font-bold">Withdraw Request</span>
                        <span className="w-full text-[14px] font-medium">Amount: {request.amount}</span>
                        <button onClick={() => fetchDetail(request.sender)} className='w-full text-[12px] text-[#5D8736] font-medium w-full text-left underline'>Detail</button>
                        <button
                            onClick={() => verifyWithdraw(request._id)}
                            className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-full mt-[5%]"
                        >
                            Process Withdraw
                        </button>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full md:w-[80%] md:ml-[20%] bg-white">

                <RenderWithdrawRequests />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <>
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
                    </>
                </Modal>
            </div>}
        </>
    );
}
