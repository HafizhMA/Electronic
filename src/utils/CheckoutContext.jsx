import React, { createContext, useState, useEffect } from 'react'
import { getAlamat, getCheckoutProducts } from '../services/apiServices';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const [checkout, setCheckout] = useState([]);
    const [alamatPengirim, setAlamatPengirim] = useState([]);

    const fetchcheckoutProducts = async () => {
        try {
            const response = await getCheckoutProducts();
            const checkouts = response.data;
            console.log('response', response);
            const datas = checkouts.items;
            setCheckoutProducts(datas);
            setCheckout(checkouts);
            console.log('checkout', checkouts);
            console.log('response checkout:', datas);
        } catch (error) {
            console.error('failed get checkout products', error);
        }
    }

    const fetchAlamatPengirim = async () => {
        const userid = localStorage.getItem('userid');
        try {
            const response = await getAlamat();
            const alamat = response.data.Alamat;
            const alamatUser = alamat.filter(item => item.userId === userid);
            setAlamatPengirim(alamatUser);
            console.log('alamat pengirim', alamatUser);
        } catch (error) {
            console.error('failed get alamat', error)
        }
    }

    useEffect(() => {
        fetchcheckoutProducts();
        fetchAlamatPengirim();
    }, [])

    const calculateTotalCheckout = () => {
        return checkoutProducts.reduce((total, item) => {
            const itemTotal = (item.product.hargaBarang - item.product.hargaBarang * item.product.diskon / 100) * item.quantity;
            return total + itemTotal;
        }, 0);
    };

    return (
        <CheckoutContext.Provider value={{ checkoutProducts, calculateTotalCheckout, alamatPengirim, checkout }}>{children}</CheckoutContext.Provider>
    )
}