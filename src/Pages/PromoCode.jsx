import React from "react";
import { BaseUrl, fetchData } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PromoCode() {

    const [code, setCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const createPromo = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/promo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 10  // Replace with dynamic value if needed
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Promo created successfully:', data);
                alert('Promo created successfully!');
            } else {
                console.error('Failed to create promo:', data.message);
                alert('Failed to create promo: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const claimPromo = async () => {
        setLoading(true);
        const userId = localStorage.getItem('id');
        const data = await fetchData();
        const name = await data.name; // Replace with actual user name

        try {
            const response = await fetch(`${BaseUrl}/promo/claim/${code}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    name
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Promo claimed:', data);
                alert('Promo Claimed');
                // You can update UI or show success message
            } else {
                console.error('Claim failed:', data.message);
                alert('Claim failed: ' + data.message);
                // Show error message to user
            }
        } catch (error) {
            console.error('Error:', error);
        }finally{
            setLoading(false);
        }
    };


    return (
        <div className="w-full h-screen flex flex-col items-center mt-[30%]">
            {loading ? <LoadingSpinner /> : <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-4 w-[90%] md:w-[50%] lg:w-[30%]">
                <h1 className="text-[20px] font-bold text-center">You are a Regular User.</h1>
                <label className="text-[12px] font-medium text-left text-gray-500 w-full">Enter Promo Code</label>
                <input type="text" value={code} onChange={handleChange} placeholder="Enter promo code" className="border border-gray-300 rounded-md p-2 w-full mt-1" />
                <button onClick={claimPromo} className="bg-[#347928] text-white rounded-md p-2 py-1 mt-2 w-full">Claim Promo Code</button>
            </div>}
        </div>
    )
}