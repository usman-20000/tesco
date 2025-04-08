import React from "react";

export default function MyTeam() {

    const [selectedLevel, setSelectedLevel] = React.useState(1);

    const levels = [
        { id: 1, name: "Level 1" },
        { id: 2, name: "Level 2" },
        { id: 3, name: "Level 3" },
    ];

    return (
        <div className="flex flex-col items-center mt-4 w-full">
            <div className="flex space-x-4 mt-4 bg-[#3A7D44] rounded-md">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`px-4 py-2 rounded-md font-medium text-[12px] ${selectedLevel === level.id
                            ? "bg-gradient-to-r from-[#255F38] via-[#67AE6E] to-[#255F38] text-white"
                            : "text-white"
                            }`}
                    >
                        {level.name}
                    </button>
                ))}
            </div>
            <div className="w-[90%] max-w-sm p-4 py-1 rounded-lg shadow-md bg-gradient-to-r from-[#347928] to-[#67AE6E] text-white mt-[5%]">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-[14px]">John Doe</span>
                    <span className="text-xs font-medium">Invested: Rs. 1000</span>
                </div>
                <span className="text-left text-[12px] font-semibold">
                    9878676769
                </span>
                <div className="text-[10px] text-right font-semibold">
                    23/3/2025
                </div>
            </div>
        </div>
    );
}