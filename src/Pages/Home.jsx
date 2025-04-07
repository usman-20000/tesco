import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faEye, faEyeSlash, faMoneyBill, faMoneyBill1, faMoneyBillTransfer, faMoneyCheckDollar, faSliders } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const user = {
        name: 'John Doe',
        balance: 5000,
    };

    const [showBalance, setShowBalance] = React.useState(false);
    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    const investmentOffers = [
        {
            id: 1,
            image: 'https://st.depositphotos.com/1000128/1949/i/450/depositphotos_19492613-stock-photo-gold-ingots.jpg',
            name: 'Gold Investment',
            days: '30 Days',
            percentage: '10%',
        },
        {
            id: 2,
            image: 'https://img.freepik.com/premium-vector/silver-award-sport-medal-winners-with-red-ribbon-second-place-trophy-honor-badges_599062-3670.jpg?semt=ais_hybrid&w=740',
            name: 'Silver Investment',
            days: '60 Days',
            percentage: '20%',
        },
        {
            id: 3,
            image: 'https://marinaleksov.com/wp-content/uploads/2021/02/platinum.jpg',
            name: 'Platinum Investment',
            days: '90 Days',
            percentage: '30%',
        },
    ];

    return (
        <div className="home-container md:mb-4 mb-[25%] md:mt-[5%] mt-[15%]">
            {/* User Info Section */}
            <div className='w-[70px] h-[3px] bg-[#347928] mb-[2%] rounded-md' />
            <div className="user-info flex flex-col items-center">
                <p>Total Balance</p>
                <div className='flex flex-row items-center justify-between'>
                    <h3 className='text-[#347928] font-bold'>PKR: {showBalance ? user.balance : '****'}</h3>
                    <button onClick={toggleBalanceVisibility} className='ml-2'>
                        {showBalance ? (
                            <FontAwesomeIcon icon={faEyeSlash} className='text-[#347928] text-[14px]' />
                        ) : (
                            <FontAwesomeIcon icon={faEye} className='text-[#347928] text-[14px]' />
                        )}
                    </button>
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
                        <span className='text-[14px] font-bold text-[#347928]'>0</span>
                        <span className='text-[12px] font-bold text-black'>Total Deposit</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-[14px] font-bold text-[#347928]'>0</span>
                        <span className='text-[12px] font-bold text-black'>Total Invest</span>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-[14px] font-bold text-[#347928]'>0</span>
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
                        <div key={offer.id} className="offer-card">
                            <img src={offer.image} alt={offer.name} className="offer-image" />
                            <div className='w-[50%]'>
                                <h2>{offer.name}</h2>
                                <p>{offer.days}</p>
                            </div>
                            <div className='w-[30%]'>
                                <p className='text-[#347928] font-bold'>{offer.percentage} / day</p>
                                <span className='bg-[#77B254] p-1 pl-2 text-[10px] text-white rounded-md'>Buy Now</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;