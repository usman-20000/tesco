import React, { useEffect } from "react";
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyTeam() {
    const [selectedLevel, setSelectedLevel] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    const levels = [
        { id: 1, name: "Level 1" },
        { id: 2, name: "Level 2" },
        { id: 3, name: "Level 3" },
    ];

    const [level1, setLevel1] = React.useState([]);
    const [level2, setLevel2] = React.useState([]);
    const [level3, setLevel3] = React.useState([]);

    const id = localStorage.getItem('id');

    const fetchLevels = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/mylevels/${id}`);
            const json = await response.json();
            console.log('json:', json.level1.name, id);
            setLevel1(json.level1);
            setLevel2(json.level2);
            setLevel3(json.level3);
        } catch (e) {
            console.log('error fetching levels...');
        } finally {
            setLoading(false);
        }
    }

    let selectedData = selectedLevel === 1 ? level1 : selectedLevel === 2 ? level2 : level3;

    useEffect(() => {
        fetchLevels();
    }, []);

    return (
        <div className="flex flex-col items-center mt-[5%] w-full h-screen">
            <div className="flex space-x-4 mb-2 bg-white pt-2 mt-[2%]">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 ${selectedLevel === level.id
                            ? "bg-[#347928] text-white shadow-lg"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {level.name}
                    </button>
                ))}
            </div>

            {loading ? <LoadingSpinner /> : <div className="overflow-y-auto w-full flex flex-col items-center px-4 mb-[20%]" style={{ maxHeight: '80vh' }}>
                {selectedData?.map((member, index) => (
                    <div key={index} className="w-[90%] max-w-md pl-4 pr-4 p-2 mb-2 rounded-lg shadow-md bg-[#347928] text-white">
                        <div className="flex justify-between items-top">
                            <h3 className="text-[14px] font-medium w-[50%]">Name: {member?.name}</h3>
                            <span className="text-[14px] font-medium w-[50%] text-right">Invested: Rs. {member?.totalInvest}</span>
                        </div>
                        <div className="text-left text-xs font-normal">
                            {member?.email}
                        </div>
                        {/* <div className="text-right text-[10px] font-normal">
                            {member?.date}
                        </div> */}
                    </div>
                ))}
            </div>}
        </div>
    );
}