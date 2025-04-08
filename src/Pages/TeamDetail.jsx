import React, { useState } from "react";

export default function TeamDetail() {

    return (
        <div className="flex flex-col items-center w-full pb-[20%]">
            <h6 className="mt-4 pt-4 pb-2 text-[#347928]">Team & Commission Detail</h6>
            <div className="flex flex-col items-center w-[90%] p-2 border rounded-md shadow-sm">
                <span className="text-sm text-[#347928] font-bold">309747</span>
                <span className="text-xs text-black font-medium">Total Team Deposit</span>
            </div>
            <div className="flex flex-col items-center w-[90%] p-2 border rounded-md shadow-sm mt-2">
                <span className="text-sm text-[#347928] font-bold">309747</span>
                <span className="text-xs text-black font-medium">Total Team Commission</span>
            </div>
            <div className="flex flex-col items-center w-[90%] p-2 border rounded-md  shadow-sm mt-2">
                <span className="text-sm text-[#347928] font-bold">309747</span>
                <span className="text-xs text-black font-medium">Total Team Members</span>
            </div>
            <div className="flex flex-col items-center w-[90%] p-2 border rounded-md shadow-sm  mt-2">
                <span className="text-sm text-[#347928] font-bold">23234</span>
                <span className="text-xs text-black font-medium">Level 01 Commission</span>
            </div><div className="flex flex-col items-center w-[90%] p-2 border rounded-md  shadow-sm mt-2">
                <span className="text-sm text-[#347928] font-bold">433</span>
                <span className="text-xs text-black font-medium">Level 02 Commission</span>
            </div><div className="flex flex-col items-center w-[90%] p-2 border rounded-md  shadow-sm mt-2">
                <span className="text-sm text-[#347928] font-bold">5454</span>
                <span className="text-xs text-black font-medium">Level 03 Commission</span>
            </div>
        </div>
    )
}