import React, { useCallback, useEffect, useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEye, faEyeSlash, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, fetchData, investmentOffers } from '../Assets/Data';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/ModalShow';

function Home() {
    const navigate = useNavigate();

    const [showBalance, setShowBalance] = useState(false);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [peopleInvested, setPeopleInvested] = useState({});
    const [freePlan, setFreePlan] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const showChart = localStorage.getItem('showChart');
    const [openModal, setOpenModal] = useState(showChart === 'true' ? true : false);
    const itemsPerPage = 5; // Number of offers to show per page

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchData();
            await fetchPlans();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPlans = useCallback(async () => {
        try {
            const id = localStorage.getItem('id');
            const [plansResponse, detailsResponse] = await Promise.all([
                fetch(`${BaseUrl}/myplan/${id}`),
                fetch(`${BaseUrl}/details/${id}`),
            ]);
            const plans = await plansResponse.json();
            const details = await detailsResponse.json();

            const hasFreePlan = plans.some((item) => item.planId === '1');
            setFreePlan(hasFreePlan);
            setPeopleInvested(details);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const toggleVisibility = (setter) => {
        setter((prev) => !prev);
    };

    const renderBalanceCard = (label, value, isHidden, toggleVisibility) => (
        <div className="user-info flex flex-col items-center p-2 border border-gray-600 rounded-md w-[70%]">
            <p className="text-black text-[12px]">{label}</p>
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-[#347928] font-bold text-[14px]">
                    PKR: {isHidden ? '****' : value}
                </h3>
                <button onClick={toggleVisibility} className="ml-2">
                    <FontAwesomeIcon
                        icon={isHidden ? faEyeSlash : faEye}
                        className="text-[#347928] text-[14px]"
                    />
                </button>
            </div>
        </div>
    );

    const renderActionButton = (label, icon, link) => (
        <a href={link} className="no-underline">
            <button className="flex flex-col items-center justify-center text-[12px] text-red-500 font-medium">
                <div className="flex flex-col items-center justify-center border-1 border-red-500 rounded-full h-10 w-10">
                    <FontAwesomeIcon icon={icon} className="text-red-500 text-[18px]" />
                </div>
                {label}
            </button>
        </a>
    );

    const renderInvestmentOffer = (offer) => {
        const peopleCount = peopleInvested[`plan${offer.id}`] || '0';

        return (
            <div
                key={offer.id}
                onClick={() => !offer.lock && navigate(`/invest/${offer.id}`)}
                className={`offer-card ${offer.lock ? '' : 'shadow-md'}`}
            >
                <img src={offer.image} alt={offer.name} className="offer-image" />
                <div className="w-[50%] flex flex-col items-left">
                    <h2>Investment: {offer.amount}</h2>
                    <p className="pb-0 mb-0">Expire Plan: {offer.days}D</p>
                    <span className="text-[10px] font-semibold text-red-500 text-left ml-2 w-full">
                        {peopleCount} people invested
                    </span>
                </div>
                <div className="w-[30%] flex flex-col items-center justify-end h-full">
                    <span className="text-[#347928] font-bold text-[11px]">{offer.name}</span>
                    <span className="text-[#347928] font-bold text-[10px]">
                        Daily Profit: {offer.profit}
                    </span>
                    <span
                        className={`${offer.lock ? 'bg-red-500' : 'bg-[#77B254]'} p-1 pl-2 pr-2 text-[8px] text-white rounded-md rounded-br-sm w-full`}
                    >
                        {offer.lock ? 'Locked' : 'Open Now'}
                    </span>
                </div>
            </div>
        );
    };

    const paginatedOffers = investmentOffers
        .filter((offer) => !(freePlan && offer.id.toString() === '1'))
        .filter((offer) => offer.lock === false)
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(
        investmentOffers.filter((offer) => !(freePlan && offer.id.toString() === '1') && !offer.lock).length /
        itemsPerPage
    );

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col items-center w-full">
                    <span className="pt-[10%] text-[12px] font-bold w-[90%] text-black text-center">
                        Important Notice🚨🚨
                    </span>
                    <span className="pt-[2%] text-[12px] font-medium w-[90%] text-black text-center">
                        Be sure to join our WhatsApp group. Every new update will be given in the WhatsApp Group🤩
                    </span>
                    <div className="home-container md:mb-4 mb-[25%] md:mt-[5%] mt-[5%]">
                        <div className="flex flex-row items-center justify-center mb-4 w-[70%] mt-4">
                            {renderBalanceCard(
                                'Total Balance',
                                userData?.balance,
                                !showBalance,
                                () => toggleVisibility(setShowBalance)
                            )}
                        </div>
                        <div className="action-buttons flex flex-row items-center justify-center gap-4">
                            {renderActionButton('Deposit', faAdd, '/deposit')}
                            {renderActionButton('Withdraw', faMoneyBillTransfer, '/withdraw')}
                        </div>
                        <div className="investment-offers">
                            <div className="flex flex-row items-center justify-between mb-4">
                                <span className="text-[14px] font-medium text-black">Investment Offers</span>
                                <a href="/offers" className="no-underline">
                                    <span className="text-[14px] font-bold text-red-500">Locked Offers</span>
                                </a>
                            </div>
                            <div className="offers-grid">
                                {paginatedOffers.map(renderInvestmentOffer)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal isOpen={openModal} onClose={() =>{ localStorage.setItem('showChart', false); setOpenModal(false); }}>
                <div className="max-w-xl flex flex-col items-center mx-auto p-4">
                    <h2 className="text-xl font-bold text-center mb-4 text-gray-800">ضروری ہدایات!!!</h2>
                    <ol className="list-decimal list-inside space-y-2 text-right text-gray-700 text-xs font-medium">
                        <li>رقم نکالنے کی درخواست دینے کا ٹائم صبح 10 بجے سے لے کر شام 5 بجے تک ہے۔</li>
                        <li>آپکے بنک اکاؤنٹ میں رقم 12 گھنٹے سے 24 گھنٹے تک پہنچے گی،اگر اس دوران نا پہنچے تو ایڈمنز سے رابطہ کریں۔</li>
                        <li>کم سے کم رقم 100 نکالی جا سکتی ہے اس سے کم نہیں۔</li>
                        <li>رقم نکالنے پر 2% سروس چارجز لاگو ہوں گے۔</li>
                        <li>اگر آپ اپنے ریفرل لنک سے لوگوں کو جوائن کرواتے ہیں تو ہر ایک لاکھ کے ڈیپازٹ پر آپکو 3000 روپے ریفرل کمیشن کے علاوہ دیا جائے گا۔</li>
                        <li>وقفے وقفے سے ہم یوزرز کو بونس دیتے رہتے ہیں۔ بونس کی تازہ ترین معلومات کیلئے ہمارا واٹس ایپ گروپ لازمی جوائن کریں۔</li>
                        <li>ڈیپازٹ ہر وقت آن رہتا ہے۔ آپ کسی بھی وقت رقم ہمارے اکاؤنٹس میں ڈیپازٹ کر سکتے ہیں۔</li>
                        <li>ہماری پالیسیز کی خلاف ورزی پر آپکا اکاؤنٹ بلاک کر دیا جائے گا اور کسی بھی صورت نہیں کھولا جائے گا۔</li>
                        <li>تمام معلومات اور بروقت اسپورٹ کے لئے ایپ میں آفیشل گروپ کا لنگ موجود ہے. اسے لازمی جوائن کر لیں۔</li>
                    </ol>
                    <p className="mt-4 text-center text-black font-semibold">Thank you Tesco Community</p>
                    <button type="button" className="flex flex-row items-center justify-center w-full h-[50px] rounded-md bg-[#347928] mt-2 mb-2">
                        <span className="text-white text-[14px] font-medium ml-2 text-center w-full">Chat with us</span>
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default Home;