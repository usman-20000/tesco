import React, { useCallback, useEffect } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEye, faEyeSlash, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, fetchData, investmentOffers } from '../Assets/Data';
import LoadingSpinner from '../components/LoadingSpinner';

function Offers() {
    const navigate = useNavigate();

    const [userData, setUserData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [peopleInvested, setPeopleInvested] = React.useState({});
    const [freePlan, setFreePlan] = React.useState(false);

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

    const renderInvestmentOffer = (offer) => {
        const peopleCount =
            peopleInvested[`plan${offer.id}`] || '0';

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
                        className={`${offer.lock ? 'bg-red-500' : 'bg-[#77B254]'
                            } p-1 pl-2 pr-2 text-[8px] text-white rounded-md rounded-br-sm w-full`}
                    >
                        {offer.lock ? 'Locked' : 'Open Now'}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col items-center mt-4 w-[90%] pb-[20%] ml-[5%]">
                    {/* <div className="flex flex-row items-center justify-center mb-4 w-[70%] mt-4">
                        {renderBalanceCard(
                            'Total Balance',
                            userData?.balance,
                            !showBalance,
                            () => toggleVisibility(setShowBalance)
                        )}
                    </div> */}
                    {/* <div className="action-buttons flex flex-row items-center justify-center gap-4">
                        {renderActionButton('Deposit', faAdd, '/deposit')}
                        {renderActionButton('Withdraw', faMoneyBillTransfer, '/withdraw')}
                    </div> */}
                    {/* <div className="flex flex-row items-center justify-between w-full border rounded-md p-4 mt-4">
                        <div className="flex flex-col items-center justify-between w-full">
                            <div className="flex flex-col items-center">
                                <span className="text-[14px] font-bold text-[#347928]">
                                    {userData?.totalDeposit}
                                </span>
                                <span className="text-[12px] font-bold text-black">
                                    Total Deposit
                                </span>
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <span className="text-[14px] font-bold text-[#347928]">
                                    {userData?.totalInvest}
                                </span>
                                <span className="text-[12px] font-bold text-black">
                                    Total Invest
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between w-full">
                            <div className="flex flex-col items-center">
                                <span className="text-[14px] font-bold text-[#347928]">
                                    {userData?.deposit}
                                </span>
                                <span className="text-[12px] font-bold text-black">
                                    Deposit Balance
                                </span>
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <span className="text-[14px] font-bold text-[#347928]">
                                    {userData?.totalWithdraw}
                                </span>
                                <span className="text-[12px] font-bold text-black">
                                    Total Withdraw
                                </span>
                            </div>
                        </div>
                    </div> */}
                    <div className="investment-offers">
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-[14px] font-medium text-black">
                                Investment Offers
                            </span>
                            <span className="text-[14px] font-bold text-[#347928]">
                                All Offers
                            </span>
                        </div>
                        <div className="offers-grid">
                            {investmentOffers
                                .filter((offer) => !(freePlan && offer.id.toString() === '1'))
                                .map(renderInvestmentOffer)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Offers;