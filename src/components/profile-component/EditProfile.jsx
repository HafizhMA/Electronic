import React, { useState } from 'react'

const EditProfile = () => {
    const [File, setFile] = useState();

    const handleChangeFile = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
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
                        <input type="file" onChange={handleChangeFile} accept='image/' className='rounded' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile