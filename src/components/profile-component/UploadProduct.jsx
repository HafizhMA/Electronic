import React from 'react'

const UploadProduct = () => {
    return (
        <div className='min-h-screen py-32 flex justify-center items-center'>
            <form action="" className='bg-slate-600 p-3 px-10 rounded border-2 border-white text-white'>
                <p className='mt-2 mb-10 font-bold'>Jual Produk Kamu</p>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Nama Barang:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Deskripsi Barang:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Harga Barang:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Quantity:</label>
                        <input type="number" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Size:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Warna:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Berat:</label>
                        <input type="number" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Features:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Capacity:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Konsumsi Daya:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Dimensi:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Kategori:</label>
                        <input type="text" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Diskon:</label>
                        <input type="number" className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Gambar:</label>
                        <input type="file" className='rounded text-black' />
                    </div>
                </div>
                <div className='text-end font-semibold mt-8 mb-3'>
                    <button className='px-4 py-2 bg-white hover:bg-slate-800 hover:text-white transition duration-150 rounded text-slate-600 font-semibold'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UploadProduct