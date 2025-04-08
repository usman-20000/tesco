import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Invest() {

    const navigate = useNavigate();

    const [pkr, setPkr] = useState(0);

    const goBack = () => {
        navigate(-1);
    }

    const handlePkrChange = (e) => {
        const { value } = e.target;
        setPkr(value);
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-row items-center w-[90%]">
                <button onClick={goBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                </button>
                <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1">Selected Plan</span>
            </div>
            <h3 className='text-[#347928] font-bold text-[24px] mt-[10%]'>PKR {pkr}</h3>
            <label className="text-[14px] text-gray-500 font-medium mt-0">Enter Amount</label>
            <input
                className="p-2 h-[40px] w-[100px] border rounded-md bg-white mt-1 text-[12px] font-bold text-center"
                type="text"
                id="pkr"
                name="pkr"
                placeholder=""
                value={pkr}
                onChange={handlePkrChange}
                required
            />
            {pkr > 0 && (<>
                <span className='text-black font-bold text-[12px] mt-4 w-[90%]'>Daily Profit: <span className="font-normal">8% = {(pkr * 8) / 100}</span></span>
                <span className='text-black font-bold text-[12px] mt-2 w-[90%]'>Total Profit: <span className="font-normal">8% = {((pkr * 8) / 100) * 2}</span></span>
                <span className='text-black font-bold text-[12px] mt-2 w-[90%]'>Return Profit: <span className="font-normal">8% = {(((pkr * 8) / 100) * 2) + parseInt(pkr)}</span></span>
            </>)}
            <button onClick={() => navigate('/invest-success')} className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-[90%] mt-[50%]">
                Invest
            </button>
        </div>
    )
}