import { faBank, faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './Deposit.css';
import Modal from "../components/ModalShow";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {

    const navigate = useNavigate();

    const [showBalance, setShowBalance] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
    });
    const [pkr, setPkr] = useState(0);
    const user = {
        balance: 10000,
    };
    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    const handlePkrChange = (e) => {
        const { value } = e.target;
        setPkr(value);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add logic to handle form submission
    };


    return (
        <div className="flex flex-col items-center mt-4 w-full">
            <h2 className="text-[28px] font-bold">Total Balance</h2>
            <div className='flex flex-row items-center justify-between'>
                <h3 className='text-[#347928] font-bold text-[28px] mt-2'>PKR: {showBalance ? user.balance : '****'}</h3>
                <button onClick={toggleBalanceVisibility} className='ml-2'>
                    {showBalance ? (
                        <FontAwesomeIcon icon={faEyeSlash} className='text-[#347928] text-[16px]' />
                    ) : (
                        <FontAwesomeIcon icon={faEye} className='text-[#347928] text-[16px]' />
                    )}
                </button>
            </div>
            <h3 className='text-[#347928] font-bold text-[38px] mt-2'>PKR {pkr}</h3>
            <label className="text-[16px] text-gray-500 font-bold mt-4">Enter Amount</label>
            <input
                className="p-2 w-[120px] border rounded-md bg-white mt-1 text-[24px] font-bold"
                type="text"
                id="pkr"
                name="pkr"
                placeholder=""
                value={pkr}
                onChange={handlePkrChange}
                required
            />
            <span className="text-[18px] text-black w-[90%] font-medium mt-4">Withdraw Money To</span>
            <div className="flex flex-row items-center justify-between p-2 pl-4 pr-4 rounded-lg shadow-sm w-[90%] mt-4">
                <FontAwesomeIcon icon={faBank} className='text-[#347928] text-[24px]' />
                <div className="flex flex-col items-start w-[70%]">
                    <span className="text-[18px] text-black font-medium">JazzCash</span>
                    <span className="text-[18px] text-black font-medium">*********9768</span>
                </div>
                <button onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon={faEdit} className='text-[#347928] text-[16px]' />
                </button>
            </div>
            <p className="text-[14px] text-red-500 w-[90%] mt-4 font-medium">
                Note: According to the policy service charges will be applicable on every withdrawal.
            </p>
            <button type="submit" onClick={() => navigate('/withdraw-sucess')} className="submit-button w-[90%] mt-4">Withdraw</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Bank Details:</h2>
                <form className="deposit-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bankName">Select Bank Name</label>
                        <select
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Bank</option>
                            <option value="Bank XYZ">Bank XYZ</option>
                            <option value="Bank ABC">Bank ABC</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountHolderName">Account Holder Name</label>
                        <input
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            placeholder="Enter account holder name"
                            value={formData.accountHolderName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountNumber">Account Number</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            placeholder="Enter account number"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Update</button>
                </form>
            </Modal>
        </div>
    )
}