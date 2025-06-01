const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const consumeAPI = async function () {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        console.log(data);
        console.log(`result = ${JSON.stringify(data)}`);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

try {
    consumeAPI();
} catch (error) {
    console.log(error);
}