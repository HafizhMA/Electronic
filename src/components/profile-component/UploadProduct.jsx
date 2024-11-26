import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createProduct } from '../../services/apiServices';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const UploadProduct = () => {
    const { register, handleSubmit, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
    const cloudName = import.meta.env.VITE_ClOUDINARY_CLOUD_NAME;

    const onSubmit = async (data) => {
        const selectedFile = watch('img');
        setLoading(true); // Start loading when image upload starts

        try {
            const formData = new FormData();
            formData.append('file', selectedFile[0]);
            formData.append('upload_preset', preset);
            formData.append('cloud_name', cloudName);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const img = response.data.secure_url;

            const userId = localStorage.getItem('userid');
            const newData = { ...data, img, userId };
            const createData = await createProduct(newData);
            toast.success('berhasil create')
            console.log(createData);
            window.location.href = '/'
        } catch (error) {
            toast.error('gagal toast')
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false); // Stop loading once the upload is complete
        }
    };

    return (
        <div className='min-h-screen py-32 flex justify-center items-center'>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-600 p-3 px-10 rounded border-2 border-white text-white'>
                <p className='mt-2 mb-10 font-bold'>Jual Produk Kamu</p>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="namaBarang">Nama Barang:</label>
                        <input type="text" {...register("namaBarang", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="deskripsiBarang">Deskripsi Barang:</label>
                        <input type="text" {...register("deskripsiBarang", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="hargaBarang">Harga Barang:</label>
                        <input type="number" {...register("hargaBarang", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" {...register("quantity", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="size">Size:</label>
                        <input type="text" {...register("size", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="color">Warna:</label>
                        <input type="text" {...register("color", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="berat">Berat:</label>
                        <input type="number" {...register("berat", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="features">Features:</label>
                        <input type="text" {...register("features", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="capacity">Capacity:</label>
                        <input type="text" {...register("capacity", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="powerConsumption">Konsumsi Daya:</label>
                        <input type="text" {...register("powerConsumption", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="dimensi">Dimensi:</label>
                        <input type="text" {...register("dimensi", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="kategori">Kategori:</label>
                        <input type="text" {...register("kategori", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="diskon">Diskon:</label>
                        <input type="number" {...register("diskon", { required: true })} className='rounded text-black' />
                    </div>
                    <div className='border-2 border-white p-2 rounded space-x-2 flex justify-between items-center'>
                        <label htmlFor="">Gambar:</label>
                        <input type="file"  {...register("img", { required: true })} accept="image/*" className='rounded text-black' />
                    </div>
                    {loading && (
                        <div className="mt-4 text-center text-white font-bold">Mohon tunggu...</div>
                    )}
                </div>
                <div className='text-end font-semibold mt-8 mb-3'>
                    <button className='px-4 py-2 bg-white hover:bg-slate-800 hover:text-white transition duration-150 rounded text-slate-600 font-semibold'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UploadProduct