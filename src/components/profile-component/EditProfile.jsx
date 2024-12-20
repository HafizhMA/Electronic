import React, { useState } from 'react'
import axios from 'axios';
import { updateUserData, uploadImgProfile } from '../../services/apiServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const preset = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
    const cloudName = import.meta.env.VITE_ClOUDINARY_CLOUD_NAME;

    const handleChangeFile = async (e) => {
        const selectedFile = e.target.files[0]
        setLoading(true);

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
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userId: localStorage.getItem('userid'),
                username,
                phoneNumber
            }
            const updateUser = await updateUserData(data);
            toast.success('success update')
            window.location.href = '/'
        } catch (error) {
            toast.error('update failed')
            console.error('failed update user data', error);
        }
    }


    return (
        <div className='min-h-screen flex flex-col items-center justify-center text-white'>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='bg-slate-600 rounded p-5'>
                <div className='flex flex-col space-y-3'>
                    <div className='flex justify-between space-x-2 items-center'>
                        <label htmlFor="">Username</label>
                        <input type="text" className='text-black' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex justify-between space-x-2 items-center'>
                        <label htmlFor="">Phone Number</label>
                        <input type="text" className='text-black' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className='flex justify-between space-x-2 items-center'>
                        <input type="file"
                            onChange={handleChangeFile}
                            accept="image/*"
                            className='rounded' />
                        <p className={`${loading ? 'visible' : 'hidden'}`}>Loading...</p>
                    </div>
                    <div className='text-end'>
                        <button className='px-2 py-1 rounded bg-white text-slate-600 font-semibold hover:text-slate-800'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile