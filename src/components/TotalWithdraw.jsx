import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import { Dots, Spinner } from "react-activity";
import Modal from "../components/ModalShow";
import LoadingSpinner from "../components/LoadingSpinner";
import { fromJSON } from "postcss";

export default function TotalWithdraw() {

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
            setWithdrawRequests(json);
        } catch (e) {
            console.log('error fetching withdraw requests');
        }
    }

    useEffect(() => {
        fetchWithdrawRequests();
    }, []);

    const RenderWithdrawRequests = () => {
        return (
            <>
                {withdrawRequests?.map((request) => (
                    <div key={request._id} className="flex flex-col items-center shadow-m rounded-lg w-[90%] p-2 border mt-2">
                        <span className="w-full text-[14px] font-bold">Withdraw Request</span>
                        <span className="w-full text-[14px] font-medium">Amount: {request.amount}</span>
                        <button onClick={() => fetchDetail(request.sender)} className='w-full text-[12px] text-[#5D8736] font-medium w-full text-left underline'>Detail</button>
               
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
