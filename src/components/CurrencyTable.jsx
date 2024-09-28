import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyTable = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

    // API Key dari Currency Freaks
    const API_KEY = 'e1124bd48ab042918fe6f7cc6cc3a753';

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=${currencies.join(',')}`);
                setRates(response.data.rates);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    const calculateWeBuy = (rate) => {
        // Logika pembelian (contohnya 2% di bawah rate yang didapatkan)
        return (1 / rate * 0.98).toFixed(4);
    };

    const calculateWeSell = (rate) => {
        // Logika penjualan (contohnya 2% di atas rate yang didapatkan)
        return (1 / rate * 1.02).toFixed(4);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Currency Rates (Base: USD)</h1>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Rate</th>
                        <th>We Buy</th>
                        <th>We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map(currency => (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{rates[currency]}</td>
                            <td>{calculateWeBuy(rates[currency])}</td>
                            <td>{calculateWeSell(rates[currency])}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrencyTable;
