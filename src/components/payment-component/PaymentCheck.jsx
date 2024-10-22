import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { getCheckoutPayment } from '../../services/apiServices';
import FormattedDate from '../../utils/FormattedDate';
import { formatter } from '../../utils/formatIDR';
import { Link } from 'react-router-dom';

const PaymentCheck = () => {
    const [getCheckoutsPayment, setGetCheckoutsPayment] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const fetchCheckoutPayment = async () => {
        const response = await getCheckoutPayment();
        if (response?.data?.checkouts) {
            console.log('response checkout payment', response);
            setGetCheckoutsPayment(response.data.checkouts);
        } else {
            console.log('No checkouts found or response is null');
            setGetCheckoutsPayment([]);
        }
    }

    useEffect(() => {
        fetchCheckoutPayment();
    }, [])

    const filteredByName = getCheckoutsPayment.filter(checkout =>
        checkout.purchasedItem.product.some(product =>
            product.name.toLowerCase().includes(filterTerm.toLowerCase())
        )
    );

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    }

    const filteredByDate = getCheckoutsPayment.filter((checkout) => {
        const itemDate = formatDate(checkout.createdAt);
        return itemDate === filterDate;
    });

    const filteredDatas = filterTerm
        ? filteredByName
        : filterDate
            ? filteredByDate
            : getCheckoutsPayment;

    return (
        <div className='px-10 py-5 min-h-screen'>
            <p className='font-bold text-2xl mb-5 my-20'>Daftar Transaksi</p>
            <div>
                <div className='flex space-x-4 mb-5'>
                    <input
                        type="text"
                        className='w-[60%] rounded'
                        value={filterTerm}
                        onChange={(e) => setFilterTerm(e.target.value)}
                        placeholder='Cari pembelianmu disini'
                    />
                    <input
                        type="date"
                        className='rounded'
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
                {/* Check if filteredDatas is empty */}
                {filteredDatas.length === 0 ? (
                    <p className="text-center text-gray-500">Checkout history not available</p>
                ) : (
                    filteredDatas.map((item) => (
                        <div key={item.id} className='bg-slate-50 border-2 border-slate-600 rounded p-5 space-y-4 mb-5'>
                            <div className='flex space-x-4 items-center'>
                                <MdOutlineLocalGroceryStore size={23} />
                                <p className='font-semibold'>Belanja</p>
                                <p><FormattedDate dateString={item.createdAt} /></p>
                                <Link
                                    to={item.payment[0].paymentUrl}
                                    className={`${item.payment[0].paymentStatus === 'SUCCESS' ? 'text-green-400 border-green-500' : 'text-red-400 border-2 border-red-500'} border-2 rounded px-2 bg-red-50 font-semibold`}
                                >
                                    PAYMENT {item.payment[0].paymentStatus}
                                </Link>
                            </div>
                            {item.purchasedItem?.product?.map((product, index) => (
                                <div key={index}>
                                    <div className='mt-2'>
                                        <p className='font-semibold text-md text-slate-600 mb-2'>{product.merchant_name}</p>
                                    </div>
                                    <div className='grid grid-cols-5 gap-5 mb-5'>
                                        <div className='flex justify-center items-center'>
                                            <img src={product.img} className='object-cover w-40' alt="" />
                                        </div>
                                        <div className='col-span-3 flex flex-col justify-center'>
                                            <p className='font-semibold'>{product.name}</p>
                                            <p>{product.quantity} barang {formatter.format(product.price)}</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='font-semibold'>Total Belanja</p>
                                            <p>{formatter.format(product.price * product.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='flex justify-end p-3'>
                                <Link to={`/order-list/${item.id}`} className='font-bold text-slate-600 border-2 border-slate-600 rounded px-2 py-1'>Lihat Detail Transaksi</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default PaymentCheck