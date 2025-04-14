import { faChevronLeft, faChevronRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons/faMailBulk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BaseUrl, CLOUDINARY_URL, fetchData } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [squad, setSquad] = React.useState(false);
    const [name, setName] = useState('');
    const [userData, setUserData] = React.useState({});

    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0],);
    };
    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const fetchUserData = async () => {
        setUploading(true);
        const id = localStorage.getItem('id');
        const data = await fetchData();
        setUserData(data);
        setSelectedImage(data?.profileImage);
        setUploading(false);
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    const handleImageChange = async (e) => {

        e.preventDefault();
        setUploading(true);

        if (!selectedImage) {
            alert('Please select an image to upload');
            setUploading(false);
            return;
        }


        let form = new FormData();
        form.append('file', selectedImage);
        form.append('upload_preset', 'tesco_app');
        form.append('cloud_name', 'da9jxjnlv');

        const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: form,
        });

        const cloudinaryData = await cloudinaryResponse.json();
        console.log('Cloudinary Response:', cloudinaryData.secure_url);

        if (!cloudinaryData.secure_url) {
            alert('Image upload failed. Please try again.');
            return;
        }
        let url1 = cloudinaryData.secure_url;

        console.log('images:', url1);

        const data = {
            profileImage: url1,
        };

        try {
            const response = await fetch(`${BaseUrl}/register/${userData?.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });

            const result = await response.json();
            console.log('Category added:', result);
            if (response.ok) {
                alert('Profile image updated successfully!');
                setSelectedImage(null);
                setUserData(result);
            }
        } catch (error) {
            console.error('Error submitting category:', error);
            alert('Failed to submit category');
        } finally {
            setUploading(false);
        }
    };

    const handleSquad = async (e) => {

        if (!name) {
            alert('Please enter a name to update');
            return;
        }
        const data = {
            name: name,
        };

        try {
            const response = await fetch(`${BaseUrl}/register/${userData?.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });

            const result = await response.json();
            console.log('Category added:', result);
            if (response.ok) {
                alert('Profile name updated successfully!');
                setName('');
                setUserData(result);
            }
        } catch (error) {
            console.error('Error submitting category:', error);
            alert('Failed to submit category');
        } finally {
            setUploading(false);
        }
    }


    return (
        <>
            {uploading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center justify-between w-[90%] bg-white shadow-md rounded-xl mt-4">
                    <div className="flex flex-row items-center justify-start w-full bg-[#347928] py-2 px-3 rounded-t-xl">
                        <div onClick={goBack} className="h-[15px] w-[15px] flex flex-col items-center justify-center">
                            <FontAwesomeIcon icon={faChevronLeft} className="h-[15px] w-[15px] text-white" />
                        </div>
                        <span className="text-white text-[18px] font-bold ml-[5%]">Profile Setting</span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full py-4">
                        <div className="flex flex-col items-center w-[30%]">
                            {selectedImage ? (
                                typeof selectedImage === 'string' ? (
                                    // If selectedImage is a URL string
                                    <img src={selectedImage} alt="Preview" className="w-[40px] h-[40px] rounded-full object-cover" />
                                ) : (
                                    // If selectedImage is a File object
                                    <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-[40px] h-[40px] rounded-full object-cover" />
                                )
                            ) : (
                                <FontAwesomeIcon icon={faUser} className="text-gray-300 border overflow-hidden rounded-full h-[40px] w-[40px]" />
                            )}
                            <span className="text-[12px] text-gray-500 font-semibold mt-2 w-[90%] text-center leading-[16px]">{userData?.name}</span>
                            {typeof selectedImage !== 'string' && selectedImage !== null && <button onClick={handleImageChange} type="button" className="text-[12px] text-blue-400 font-normal mt-2 underline">Change</button>}
                        </div>
                        <div className="flex flex-col items-end w-[70%] mr-[5%]">
                            <div className="flex flex-row items-center justify-end w-full mt-2">
                                <label
                                    htmlFor="avatar"
                                    className="text-gray-500 text-[14px] font-medium mr-4 cursor-pointer"
                                >
                                    Change Avatar
                                </label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <FontAwesomeIcon icon={faChevronRight} className="h-[10px] w-[10px] text-gray-500" />
                            </div>
                            <div onClick={() => setSquad(!squad)} className="flex flex-row items-center justify-end w-full mt-4">
                                <span className="text-gray-500 text-[14px] font-medium mr-4">Squad</span>
                                <FontAwesomeIcon icon={faChevronRight} className="h-[10px] w-[10px] text-gray-500" />
                            </div>
                        </div>
                    </div>
                    {squad && <div className="flex flex-col items-center w-full">
                        <input
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            placeholder="Enter Name"
                            className="w-[90%] border rounded-md h-[35px] pl-2 mb-2"
                            value={name}
                            onChange={handleChangeName}
                            required
                        />
                        <button type="button" onClick={handleSquad} className="w-[90%] bg-[#347928] h-[35px] rounded-md flex items-center justify-center text-white font-semibold mb-2">Update Name</button>
                    </div>}
                    <div className="flex flex-row items-center justify-start w-full bg-[#347928] py-2 px-3 rounded-b-xl">
                        <span className="text-white text-[18px] font-bold ml-[5%]">Security Information</span>
                    </div>
                </div>
                <div onClick={() => navigate(`/edit-password/${userData?.email}`)} className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <div className="flex flex-row items-center justify-end mt-4">
                        <div className="h-[30px] w-[30px] bg-gray-200 rounded-md flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faLock} className="h-[20px] w-[20px] text-[#347928]" />
                        </div>
                        <span className="text-gray-500 text-[14px] font-medium mr-4">login password</span>
                    </div>
                    <div className="flex flex-row items-center justify-end mt-4">
                        <span className="text-gray-500 text-[12px] font-medium mr-4">Edit</span>
                        <FontAwesomeIcon icon={faChevronRight} className="h-[10px] w-[10px] text-gray-500" />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <div className="flex flex-row items-center justify-end mt-4">
                        <div className="h-[30px] w-[30px] bg-gray-200 rounded-md flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faMailBulk} className="h-[20px] w-[20px] text-[#347928]" />
                        </div>
                        <span className="text-gray-500 text-[14px] font-medium mr-4">Mail</span>
                    </div>
                    <div className="flex flex-row items-center justify-end mt-4">
                        <span className="text-gray-500 text-[12px] font-medium mr-4">{userData?.email}</span>
                        <FontAwesomeIcon icon={faChevronRight} className="h-[10px] w-[10px] text-gray-500" />
                    </div>
                </div>
                <div onClick={() => navigate('/about')} className="flex flex-row items-center justify-between w-[90%] mt-2">
                    <div className="flex flex-row items-center justify-end mt-4">
                        <div className="h-[30px] w-[30px] bg-gray-200 rounded-md flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faMailBulk} className="h-[20px] w-[20px] text-[#347928]" />
                        </div>
                        <span className="text-gray-500 text-[14px] font-medium mr-4">About Us</span>
                    </div>
                    <div className="flex flex-row items-center justify-end mt-4">
                        <FontAwesomeIcon icon={faChevronRight} className="h-[10px] w-[10px] text-gray-500" />
                    </div>
                </div>
            </div>}
        </>
    )
}