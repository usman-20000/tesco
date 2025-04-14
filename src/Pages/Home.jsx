import React, { useCallback, useEffect } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faEye, faEyeSlash, faMoneyBill, faMoneyBill1, faMoneyBillTransfer, faMoneyCheckDollar, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, fetchData, investmentOffers } from '../Assets/Data';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {

    const navigate = useNavigate();

    const [showBalance, setShowBalance] = React.useState(false);
    const [showDeposit, setShowDeposit] = React.useState(false);
    const [userData, setUserData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [peopleInvested, setPeopleInvested] = React.useState([]);
    const [freePlan, setFreePlan] = React.useState(false);

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        const data = await fetchData();
        console.log('data:', data?.name);
        await fetchPlans();
        await setUserData(data);
        setLoading(false);
    }, []);


    const fetchPlans = useCallback(async () => {
        try {
            const id = localStorage.getItem('id');
            setLoading(true);
            const response = await fetch(`${BaseUrl}/myplan/${id}`);
            const response2 = await fetch(`${BaseUrl}/details/${id}`);
            const json = await response.json();
            const json2 = await response2.json();
            const findFreePlan = json.find((item) => item.planId === '1');
            if (findFreePlan) {
                setFreePlan(true);
            }
            setPeopleInvested(json2);
            console.log('plan data:', json2);
        } catch (e) {
            console.log('error fetching plans...');
        } finally {
            setLoading(false);
        }
    }, []);

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
        <>
            {loading ? <LoadingSpinner /> : <div className="home-container md:mb-4 mb-[25%] md:mt-[5%] mt-[15%]">
                <div className='flex flex-row items-center justify-center mb-4 w-[70%] mt-4'>
                    {/* <div className="user-info flex flex-col items-center p-2 border border-gray-600 rounded-md w-[48%]">
                        <p className='text-black text-[16px]'>Deposit Balance</p>
                        <div className='flex flex-row items-center justify-between'>
                            <h3 className='text-[#347928] font-bold text-[14px]'>PKR: {showDeposit ? userData?.deposit : '****'}</h3>
                            <button onClick={toggleDepositVisibility} className='ml-2'>
                                {showDeposit ? (
                                    <FontAwesomeIcon icon={faEyeSlash} className='text-[#347928] text-[14px]' />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} className='text-[#347928] text-[14px]' />
                                )}
                            </button>
                        </div>
                    </div> */}
                    <div className="user-info flex flex-col items-center p-2 border border-gray-600 rounded-md w-[70%]">
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
                        <button className="flex flex-col items-center justify-center text-[12px] text-red-500 font-medium ">
                            <div className="flex flex-col items-center justify-center text-[12px] text-red-500 border-1 border-red-500 rounded-full h-10 w-10">
                                <FontAwesomeIcon icon={faAdd} className='text-red-500 text-[18px]' />
                            </div>
                            Deposit
                        </button>
                    </a>
                    <a href='/withdraw' className='no-underline'>
                        <button className="flex flex-col items-center justify-center text-[12px] text-red-500 font-medium ">
                            <div className="flex flex-col items-center justify-center text-[12px] text-red-500 border-1 border-red-500 rounded-full h-10 w-10">
                                <FontAwesomeIcon icon={faMoneyBillTransfer} className='text-red-500 text-[18px]' />
                            </div>
                            Withdraw
                        </button>
                    </a>
                </div>
                <div className='flex flex-row items-center justify-between w-full border rounded-md p-4 mt-4'>
                    <div className='flex flex-col items-center justify-between w-full'>
                        <div className='flex flex-col items-center'>
                            <span className='text-[14px] font-bold text-[#347928]'>{userData?.totalDeposit}</span>
                            <span className='text-[12px] font-bold text-black'>Total Deposit</span>
                        </div>
                        <div className='flex flex-col items-center mt-2'>
                            <span className='text-[14px] font-bold text-[#347928]'>{userData?.totalInvest}</span>
                            <span className='text-[12px] font-bold text-black'>Total Invest</span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-between w-full'>
                        <div className='flex flex-col items-center'>
                            <span className='text-[14px] font-bold text-[#347928]'>{userData?.deposit}</span>
                            <span className='text-[12px] font-bold text-black'>Deposit Balance</span>
                        </div>
                        <div className='flex flex-col items-center mt-2'>
                            <span className='text-[14px] font-bold text-[#347928]'>{userData?.totalWithdraw}</span>
                            <span className='text-[12px] font-bold text-black'>Total Withdraw</span>
                        </div>
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
                            freePlan && offer.id.toString() === '1' ? <></> : <div onClick={() => { !offer.lock && navigate(`/invest/${offer.id}`) }} key={offer.id} className={`offer-card ${offer.lock ? '' : 'shadow-md'}`}>
                                <img src={offer.image} alt={offer?.name} className="offer-image" />
                                <div className='w-[50%] flex flex-col items-left'>
                                    <h2>investment:{offer.amount}</h2>
                                    <p className='pb-0 mb-0'>Expire Plan:{offer.days}D</p>
                                    <span className="text-[10px] font-semibold text-red-500 text-left ml-2 w-full">{offer.planId === '1' ?
                                        peopleInvested.plan1 : offer.id.toString() === '2' ?
                                            peopleInvested.plan2 : offer.id.toString() === '3' ?
                                                peopleInvested.plan3 : offer.id.toString() === '4' ?
                                                    peopleInvested.plan4 : offer.id.toString() === '5' ?
                                                        peopleInvested.plan5 : offer.id.toString() === '6' ?
                                                            peopleInvested.plan6 : offer.id.toString() === '7' ?
                                                                peopleInvested.plan7 : offer.id.toString() === '8' ?
                                                                    peopleInvested.plan8 : offer.id.toString() === '9' ?
                                                                        peopleInvested.plan9 : offer.id.toString() === '10' ?
                                                                            peopleInvested.plan10 : offer.id.toString() === '11' ?
                                                                                peopleInvested.plan11 : offer.id.toString() === '12' ?
                                                                                    peopleInvested.plan12 : offer.id.toString() === '13' ?
                                                                                        peopleInvested.plan13 : ''} people invested</span>
                                </div>
                                <div className='w-[30%] flex flex-col items-center justify-end h-full'>
                                    <span className='text-[#347928] font-bold text-[11px]'>{offer.name}</span>
                                    <span className='text-[#347928] font-bold text-[10px]'>Daily Profit:{offer.profit}</span>
                                    <span className={`${offer.lock ? 'bg-red-500' : 'bg-[#77B254]'} p-1 pl-2 pr-2 text-[8px] text-white rounded-md rounded-br-sm w-full`}>{offer.lock ? 'Locked' : 'Open Now'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Home;