import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Team() {

    const navigate = useNavigate();

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert(`${text} copied to clipboard!`);
    };

    return (
        <div className="flex flex-col items-center mt-4 w-full pb-[20%]">
            <div className='flex flex-row items-center justify-between mb-4 w-[70%] mt-4'>
                <div onClick={()=>navigate('/my-team')} className="flex flex-col items-center p-2 border shadow-md rounded-xl w-[45%]">
                    <span className='text-[#347928] text-[12px] font-medium'>Team Member</span>
                    <h3 className='text-black font-medium text-[12px] pt-1'>13 members </h3>
                </div>
                <div className="flex flex-col items-center p-2 border shadow-md rounded-xl w-[45%]">
                    <span className='text-[#347928] text-[12px] font-medium'>Team Sale</span>
                    <h3 className='text-black font-medium text-[12px] pt-1'>Rs. 1000</h3>
                </div>
            </div>
            <h2 className="font-bold text-[#347928] underline mt-4">Team UP</h2>
            <p className="w-[80%] text-[16px] text-center">Performace-based <span className="font-bold text-[#347928]">Investment & Interest Rewards</span> on every direct and team investment, with invite bonuses across <span className="font-bold text-[#347928]">Three-Level Commission Structures.</span></p>
            <p className="w-[80%] text-[16px] text-center text-[#347928] text-bold mt-4">ہر براہ راست اور ٹیم سرمایہ کاری پر کارکردگی پر مبنی سرمایہ کاری اور سود کے انعامات، تین سطحی کمیشن کے ڈھانچے میں دعوتی بونس کے ساتھ۔</p>
            <span className="font-bold text-[#347928] mt-3">Invitaion Code</span>
            <h2 className="font-[bold] text-[#347928]  mt-1">987988F</h2>
            <div className="border rounded-md flex flex-row items-center justify-between w-[90%]">
                <span className='text-[14px] text-black font-medium p-[3px] line-clamp-1 w-[77%]'>https://tesco.com/invitation/abcdeffjeogijeogjeoigjeoi</span>
                <button className="w-[13%] bg-[#347928] p-[3px] rounded-tr-md rounded-br-md" onClick={() => handleCopy('Bank XYZ')}>
                    <FontAwesomeIcon icon={faCopy} className='text-white text-[14px]' />
                </button>
            </div>
            <h2 className="font-bold text-[#347928] mt-4 text-[16px] w-[90%]">Investment Commissions</h2>
            <div class="overflow-x-auto w-[90%]">
                <table class="table-auto border-collapse border border-gray-300 w-full text-center">
                    <thead class="bg-[#347928] text-white text-[12px]">
                        <tr>
                            <th class="border border-gray-300 px-4 py-1">Level</th>
                            <th class="border border-gray-300 px-4 py-1">Team Investment Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 01</td>
                            <td class="border border-gray-300 px-4 py-1">8%</td>
                        </tr>
                        <tr class="hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 02</td>
                            <td class="border border-gray-300 px-4 py-1">3%</td>
                        </tr>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 03</td>
                            <td class="border border-gray-300 px-4 py-1">1%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 className="font-bold text-[#347928] mt-4 text-[16px] w-[90%]">Team Interest Commissions</h2>
            <div class="overflow-x-auto w-[90%]">
                <table class="table-auto border-collapse border border-gray-300 w-full text-center">
                    <thead class="bg-[#347928] text-white text-[12px]">
                        <tr>
                            <th class="border border-gray-300 px-4 py-1">Level</th>
                            <th class="border border-gray-300 px-4 py-1">Team Interest Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 01</td>
                            <td class="border border-gray-300 px-4 py-1">10%</td>
                        </tr>
                        <tr class="hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 02</td>
                            <td class="border border-gray-300 px-4 py-1">5%</td>
                        </tr>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 03</td>
                            <td class="border border-gray-300 px-4 py-1">3%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}