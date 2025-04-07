import { faBank, faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Withdraw() {

    const [showBalance, setShowBalance] = useState(false);
    const [pkr, setPkr] = useState(0);
    const user = {
        balance: 10000,
    };
    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setPkr(value);
    }

    return (
        <div className="flex flex-col items-center mt-4 w-full">
            <h2 className="text-[28px] font-bold">Total Balance</h2>
            <div className='flex flex-row items-center justify-between'>
                <h3 className='text-[#347928] font-bold text-[28px] mt-2'>PKR: {showBalance ? user.balance : '****'}</h3>
                <button onClick={toggleBalanceVisibility} className='ml-2'>
                    {showBalance ? (
                        <FontAwesomeIcon icon={faEyeSlash} className='text-[#347928] text-[16px]' />
                    ) : (
                        <FontAwesomeIcon icon={faEye} className='text-[#347928] text-[16px]' />
                    )}
                </button>
            </div>
            <h3 className='text-[#347928] font-bold text-[38px] mt-2'>PKR {pkr}</h3>
            <label className="text-[16px] text-gray-500 font-bold mt-4">Enter Amount</label>
            <input
                className="p-2 w-[120px] border rounded-md bg-white mt-1 text-[24px] font-bold"
                type="text"
                id="pkr"
                name="pkr"
                placeholder="Enter amount"
                value={pkr}
                onChange={handleChange}
                required
            />
            <span className="text-[18px] text-black w-[90%] font-medium mt-4">Withdraw Money To</span>
            <div className="flex flex-row items-center justify-between p-2 pl-4 pr-4 rounded-lg shadow-sm w-[90%] mt-4">
                <FontAwesomeIcon icon={faBank} className='text-[#347928] text-[24px]' />
                <div className="flex flex-col items-start w-[70%]">
                    <span className="text-[18px] text-black font-medium">JazzCash</span>
                    <span className="text-[18px] text-black font-medium">*********9768</span>
                </div>
                <FontAwesomeIcon icon={faEdit} className='text-[#347928] text-[16px]' />
                </div>
        </div>
    )
}