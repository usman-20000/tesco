import React from "react";

export default function MyTeam() {
    const [selectedLevel, setSelectedLevel] = React.useState(1);

    const levels = [
        { id: 1, name: "Level 1" },
        { id: 2, name: "Level 2" },
        { id: 3, name: "Level 3" },
    ];

    return (
        <div className="flex flex-col items-center mt-8 w-full">
            {/* Tabs for Levels */}
            <div className="flex space-x-4 mb-6">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${selectedLevel === level.id
                            ? "bg-[#347928] text-white shadow-lg"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {level.name}
                    </button>
                ))}
            </div>

            <div className="w-[90%] max-w-md pl-4 pr-4 p-2 rounded-lg shadow-lg bg-[#347928] text-white">
                <div className="flex justify-between items-top">
                    <h3 className="text-[14px] font-medium w-[50%]">Name: John Doe</h3>
                    <span className="text-[14px] font-medium w-[50%] text-right">Invested: Rs. 1000</span>
                </div>
                <div className="text-left text-xs font-normal">
                    example@gmail.com
                </div>
                <div className="text-right text-[10px] font-normal">
                    23/3/2025
                </div>
            </div>
        </div>
    );
}