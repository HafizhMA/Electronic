import React, { useState } from 'react'
import axios from 'axios';
import { uploadImgProfile } from '../../services/apiServices';

const EditProfile = () => {

    const preset = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
    const cloudName = import.meta.env.VITE_ClOUDINARY_CLOUD_NAME;

    const handleChangeFile = async (e) => {
        const selectedFile = e.target.files[0]

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', preset);
        formData.append('cloud_name', cloudName);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const imgUrl = response.data.secure_url

            const updateUser = await uploadImgProfile(imgUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }


    return (
        <div className='min-h-screen flex flex-col items-center justify-center text-white'>
            <form className='bg-slate-600 rounded p-5'>
                <div className='flex flex-col space-y-3'>
                    <div className='flex justify-between space-x-2 items-center'>
                        <label htmlFor="">Username</label>
                        <input type="text" className='text-black' />
                    </div>
                    <div className='flex justify-between space-x-2 items-center'>
                        <label htmlFor="">Phone Number</label>
                        <input type="text" className='text-black' />
                    </div>
                    <div className='flex justify-between space-x-2 items-center'>
                        <input type="file"
                            onChange={handleChangeFile}
                            accept="image/*"
                            className='rounded' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile