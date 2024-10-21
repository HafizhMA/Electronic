import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneHistoryCheckout } from '../../services/apiServices';
import FormattedDate from '../../utils/FormattedDate';
import { formatDate } from '../../utils/maxFont';
import { formatter } from '../../utils/formatIDR';

const DetailHistoryPayment = () => {
    const { id } = useParams();
    const [payments, setPayment] = useState([]);
    const [products, setProduct] = useState([]);
    const [services, setServices] = useState([]);
    const [alamat, setAlamat] = useState({});


    const fetchOneCheckout = async () => {
        const response = await getOneHistoryCheckout(id);
        const detailCheckout = response.detailCheckout;
        console.log(detailCheckout);
        setPayment(detailCheckout.payment);
        setProduct(detailCheckout.purchasedItem.product);
        setServices(detailCheckout.purchasedItem.services);
        setAlamat(detailCheckout.AlamatPengiriman);
    }

    useEffect(() => {
        fetchOneCheckout();
    }, [])


    return (
        <div className='min-h-screen py-32 px-28'>
            <div className='py-5 px-10 border-2 border-slate-500 rounded bg-slate-50 space-y-4'>
                <p className='font-bold text-xl mb-4'>Detail Histori Transaksi</p>
                {payments.map((payment) => (
                    <div key={payment.id} className='font-semibold border-b-2 border-slate-500 pb-3'>
                        <p className={`font-bold ${payment.paymentStatus === "SUCCESS" ? 'text-green-500' : 'text-red-500'}`}>{payment.paymentStatus === "SUCCESS" ? 'Pesanan Sudah Dibayar' : 'Pesanan Pending'}</p>
                        <div className='flex justify-between'>
                            <p>Tanggal Pembayaran</p>
                            <p className={`${payment.paymentStatus === "SUCCESS" ? 'text-green-500' : 'text-red-500'}`}>{payment.paymentStatus === "SUCCESS" ? payment.updatedAt : 'Pembayaran belum selesai'}</p>
                        </div>
                    </div>
                ))}
                {products.map(product => (
                    <div key={product.id} className='font-semibold border-b-2 pb-3 border-slate-500'>
                        <div className='flex justify-between font-bold mb-3'>
                            <p>Detail Produk</p>
                            <p>{product.merchant_name}</p>
                        </div>
                        <div className='grid grid-cols-8 gap-5'>
                            <div>
                                <img src={product.img} className='object-cover w-[300px]' alt={product.name} />
                            </div>
                            <div className='col-span-6'>
                                <p>{product.name}</p>
                                <p>{product.quantity} x {formatter.format(product.price)}</p>
                            </div>
                            <div className='text-center'>
                                <p>Total harga</p>
                                <p>{formatter.format(product.price * product.quantity)}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='font-semibold'>
                    <p className='font-bold'>Info Pengiriman</p>
                    {services.map(service => (
                        <div key={service.id} className='border-b-2 border-slate-300 pb-3 space-y-3'>
                            <div className='flex justify-between'>
                                <p>Kurir</p>
                                <p>{service.namaJasa}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Ongkir</p>
                                <p>{formatter.format(service.ongkosKirim)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Alamat</p>
                                <p>{alamat.alamat} {alamat.kota} {alamat.provinsi} {alamat.kodePos}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailHistoryPayment