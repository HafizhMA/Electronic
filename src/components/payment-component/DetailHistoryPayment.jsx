import React from 'react'

const DetailHistoryPayment = () => {
    return (
        <div className='min-h-screen py-32 px-28'>
            <div className='py-5 px-10 border-2 border-slate-500 rounded bg-slate-50 space-y-4'>
                <p className='font-bold text-xl mb-4'>Detail Histori Transaksi</p>
                <div className='font-semibold border-b-2 border-slate-500 pb-3'>
                    <p className='font-bold'>Pesanan Selesai</p>
                    <div className='flex justify-between'>
                        <p>Tanggal Pembayaran</p>
                        <p>90-10-2024</p>
                    </div>
                </div>
                <div className='font-semibold border-b-2 pb-3 border-slate-500'>
                    <div className='flex justify-between font-bold'>
                        <p>Detail Produk</p>
                        <p>Nama Penjual</p>
                    </div>
                    <div className='grid grid-cols-8 gap-5'>
                        <div className='bg-red-500'>
                            <img src="" alt="" />
                        </div>
                        <div className='col-span-6'>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, non!</p>
                            <p>1x rp 1201920</p>
                        </div>
                        <div>
                            <p>Total harga</p>
                            <p>rp. 792020</p>
                        </div>
                    </div>
                </div>
                <div className='font-semibold'>
                    <p className='font-bold'>Info Pengiriman</p>
                    <div>
                        <div className='flex justify-between'>
                            <p>kurir</p>
                            <p>kurir gatau</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Alamat</p>
                            <p>jl jlasjljalshdkab</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailHistoryPayment