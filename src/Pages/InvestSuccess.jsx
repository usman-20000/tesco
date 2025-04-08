import React from "react";

export default function InvestSuccess() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <img src={require('../Assets/image/ladder.png')} className="w-[170px] h-[170px]" />
            <h2 className="text-[24px] font-bold text-[#347928] mt-[10%]">Invest Successfully</h2>
            <p className="text-[18px] text-gray-500 mt-4 text-center">Your Amount has been invested successfully.</p>
            <a href="/home" className="mt-6 bg-[#347928] text-white px-4 py-2 rounded-md w-[90%] text-center no-underline">Go to Home</a>
        </div>
    );
}