
// export const BaseUrl = "https://tesco-api.vercel.app";
export const BaseUrl = "http://localhost:4000";

const id = localStorage.getItem('id');

export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/da9jxjnlv/image/upload";

export const fetchData = async () => {
    try {
        console.log('id:', id);
        const response = await fetch(`${BaseUrl}/register/${id}`);
        const json = await response.json();
        console.log('json:', json);
        return json;
    } catch (e) {
        console.log('error fetching Data...', e);
    }
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const addThirtyDays = async (originalDate, days) => {
    const newDate = new Date(originalDate);
    const generatedDate = newDate.setDate(originalDate.getDate() + days);
    return generatedDate;
}


export const timeAgo = (inputTime) => {
    const now = new Date();
    const past = new Date(inputTime);
    const diffInMs = now - past;


    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours <= 24) return `${hours} hr ago`;
    if (days < 7) return `${days} day ago`;

    if (weeks < 4) return `${weeks} week ago`;
    if (months < 12) return `${months} mon ago`;
    return `${years} yrs ago`;
}

export const timeDifference = (start) => {
    const startDate = new Date(start);
    const now = new Date();

    const msIn24Hours = 1000 * 60 * 60 * 24;
    const endDate = new Date(startDate.getTime() + msIn24Hours);
    const diffMs = endDate - now;

    if (diffMs <= 0) {
        return 'ready';
    }

    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const diffSeconds = Math.floor((diffMs / 1000) % 60);

    return `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
};

export const maskString = (str) => {
    // Check if the string is longer than 4 characters
    if (str.length > 4) {
        // Replace all characters except the last 4 with asterisks
        return '*'.repeat(str.length - 4) + str.slice(-4);
    }
    return str; // If the string is 4 characters or fewer, just return it as is
};


export const investmentOffers = [
    {
        id: 1,
        image: 'https://st.depositphotos.com/1000128/1949/i/450/depositphotos_19492613-stock-photo-gold-ingots.jpg',
        name: 'Gold Investment',
        days: 30,
        profit: 25,
        amount: 500,
    },
    {
        id: 2,
        image: 'https://img.freepik.com/premium-vector/silver-award-sport-medal-winners-with-red-ribbon-second-place-trophy-honor-badges_599062-3670.jpg?semt=ais_hybrid&w=740',
        name: 'Silver Investment',
        days: 60,
        profit: 25,
        amount: 1000,
    },
    {
        id: 3,
        image: 'https://marinaleksov.com/wp-content/uploads/2021/02/platinum.jpg',
        name: 'Platinum Investment',
        days: 90,
        profit: 25,
        amount: 1500,
    },
];
