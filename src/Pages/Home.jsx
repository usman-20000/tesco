import React, { useEffect } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faEye, faEyeSlash, faMoneyBill, faMoneyBill1, faMoneyBillTransfer, faMoneyCheckDollar, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { fetchData, investmentOffers } from '../Assets/Data';

function Home() {

    const navigate = useNavigate();

    const [showBalance, setShowBalance] = React.useState(false);
    const [showDeposit, setShowDeposit] = React.useState(false);
    const [userData, setUserData] = React.useState([]);

    const fetchUserData = async()=>{
        const data = await fetchData();
        console.log('data:', data?.name);
        setUserData(data);
    }
    useEffect(() => {
        fetchUserData();
    }, []);

    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    const toggleDepositVisibility = () => {
        setShowDeposit(!showDeposit);
    };

    return (
        <div className="home-container md:mb-4 mb-[25%] md:mt-[5%] mt-[15%]">
            {/* User Info Section */}
            <div className='flex flex-row items-center justify-between mb-4 w-[70%] mt-4'>
                <div className="user-info flex flex-col items-center p-2 border border-gray-600 rounded-md w-[48%]">
                    <p className='text-black text-[16px]'>Deposit Balance</p>
                    <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-[#347928] font-bold text-[14px]'>PKR: {showDeposit ? userData.deposit : '****'}</h3>
                        <button onClick={toggleDepositVisibility} className='ml-2'>
                            {showDeposit ? (
                                <FontAwesomeIcon icon={faEyeSlash} className='text-[#347928] text-[14px]' />
                            ) : (
                                <FontAwesomeIcon icon={faEye} className='text-[#347928] text-[14px]' />
                            )}
                        </button>
                    </div>
                </div>
                <div className="user-info flex flex-col items-center p-2 border border-gray-600 rounded-md w-[48%]">
                    <p className='text-black text-[1px]'>&nbsp; Total Balance &nbsp;</p>
                    <div className='flex flex-row items-center justify-between'>
                        <h3 className='text-[#347928] font-bold text-[14px]'>PKR: {showBalance ? userData?.balance : '****'}</h3>
                        <button onClick={toggleBalanceVisibility} className='ml-2'>
                            {showBalance ? (
                                <FontAwesomeIcon icon={faEyeSlash} className='text-[#347928] text-[14px]' />
                            ) : (
                                <FontAwesomeIcon icon={faEye} className='text-[#347928] text-[14px]' />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="action-buttons flex flex-row items-center justify-center gap-4">
                <a href='/deposit' className='no-underline'>
                    <button className="flex flex-col items-center justify-center text-[12px] text-black font-medium ">
                        <div className="flex flex-col items-center justify-center text-[12px] text-[#347928] border-1 border-[#347928] rounded-full h-10 w-10">
                            <FontAwesomeIcon icon={faAdd} className='text-[#347928] text-[18px]' />
                        </div>
                        Deposit
                    </button>
                </a>
                <a href='/withdraw' className='no-underline'>
                    <button className="flex flex-col items-center justify-center text-[12px] text-black font-medium ">
                        <div className="flex flex-col items-center justify-center text-[12px] text-[#347928] border-1 border-[#347928] rounded-full h-10 w-10">
                            <FontAwesomeIcon icon={faMoneyBillTransfer} className='text-[#347928] text-[18px]' />
                        </div>
                        Withdraw
                    </button>
                </a>
            </div>
            <div className='flex flex-col items-center w-full border rounded-md p-4 mt-4'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <div className='flex flex-col items-center'>
                        <span className='text-[14px] font-bold text-[#347928]'>{userData?.totalDeposit}</span>
                        <span className='text-[12px] font-bold text-black'>Total Deposit</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-[14px] font-bold text-[#347928]'>{userData?.totalInvest}</span>
                        <span className='text-[12px] font-bold text-black'>Total Invest</span>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-[14px] font-bold text-[#347928]'>{userData?.totalWithdraw}</span>
                    <span className='text-[12px] font-bold text-black'>Total Withdraw</span>
                </div>
            </div>
            {/* Investment Offers Section */}
            <div className="investment-offers">
                <div className='flex flex-row items-center justify-between mb-4'>
                    <span className='text-[14px] font-medium text-black'>Investment Offers</span>
                    <span className='text-[14px] font-bold text-[#347928]'>All Offers</span>
                </div>
                <div className="offers-grid">
                    {investmentOffers.map((offer) => (
                        <div onClick={() => navigate(`/invest/${offer.id}`)} key={offer.id} className="offer-card">
                            <img src={offer.image} alt={offer?.name} className="offer-image" />
                            <div className='w-[50%]'>
                                <h2>investment:{offer.amount}</h2>
                                <p>Expire Plan:{offer.days}D</p>
                            </div>
                            <div className='w-[30%] flex flex-col items-center justify-end h-full'>
                                <span className='text-[#347928] font-bold text-[10px]'>Daily Profit:{offer.profit}</span>
                                <span className='bg-[#77B254] p-1 pl-2 pr-2 text-[8px] text-white rounded-md rounded-br-sm w-full'>Open Now</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;