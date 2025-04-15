import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, formatDate, timeAgo } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Notification() {

    const navigate = useNavigate();
    const [notifications, setnotifications] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const fetchData = async () => {
        const id = localStorage.getItem('id');
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/notifications/receiver/${id}`);
            const json = await response.json();
            if (response.ok) {
                setnotifications(json);
            } else {
                console.error('Error fetching notifications:', json.message);
            }
        } catch (e) {
            console.log('error fetching notifications', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const goBack = () => {
        navigate(-1);
    }

    const updateNotification = async (id, path) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/notifications/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seen: true,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User updated successfully:', data);
                navigate(path);
            } else {
                console.error('Error updating user:', data.message);
            }
        } catch (error) {
            console.error('Request failed:', error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full">
                <div className="flex flex-row items-center w-[90%] bg-white">
                    <button onClick={goBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                    </button>
                    <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1 text-center">Notifications</span>
                </div>
                {notifications.map((item) => (<div onClick={() => updateNotification(item._id, item.path)} className={`flex flex-col items-center w-[90%] ${item.seen ? '' : 'shadow-md'} border bg-white rounded-md mt-2 p-2`}>
                    <span className="text-black text-[14px] font-bold w-full">{item?.heading}</span>
                    <span className="text-black text-[12px] font-regular w-full">{item?.subHeading}</span>
                    <span className="text-black text-[10px] font-regular w-full text-right">{item.timestamp && timeAgo(item.timestamp)}</span>
                </div>))}
            </div>}
        </>
    )
}