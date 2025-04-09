import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notification() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-row items-center w-[90%] bg-white">
                <button onClick={goBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                </button>
                <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1 text-center">Notifications</span>
            </div>
            <div className="flex flex-col items-center w-[90%] shadow-md bg-white rounded-md mt-2 p-2">
                <span className="text-black text-[14px] font-bold w-full">Investment Success</span>
                <span className="text-black text-[12px] font-regular w-full">You amount invested successfully</span>
                <span className="text-black text-[10px] font-regular w-full text-right">12/4/2025</span>
            </div>
        </div>
    )
}