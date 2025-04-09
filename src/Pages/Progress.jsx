import React from "react";

export default function Progress() {

    return (
        <div className="flex flex-col items-center mt-4 w-full">
            <div className="w-[90%] flex flex-col items-center p-2 py-4 shadow-sm rounded-xl mt-[5%]">
                <div className="flex flex-row items-center justify-between w-[90%]">
                    <span className="text-[12px] font-bold ml-2 w-[90%] mt-2 text-black text-left">Company Name</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] mt-2 text-right text-[#347928] text-right">Lorem ipsum ltd.</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-black">Return Profit Amount:</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-right text-[#347928]">35.00</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-black">Invested Amount:</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-right text-[#347928]">500</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-black">Progress:</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-right text-[#347928]">50%</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-black">Profit %:</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-right text-[#347928]">50%</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-black">Starting Date:</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-right text-[#347928]">09/4/2025</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-black">Ending Date:</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-right text-[#347928]">11/4/2025</span>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-black">Status:</span>
                    <span className="text-[12px] font-bold ml-2 w-[90%] text-right text-[#347928]">Pending</span>
                </div>
                {/* <span className="px-2 py-1 border-[1.5px] border-[#347928] rounded-md text-[12px] text-[#347928] self-start ml-[5%] mt-2">Pending</span> */}
                <button className="px-2 py-1 bg-[#347928]  rounded-md text-[12px] text-white self-start ml-[5%] mt-2">Claim</button>
            </div>
        </div>
    )
}