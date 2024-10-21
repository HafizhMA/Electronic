import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "../../utils/CartContext";
import { formatter } from '../../utils/formatIDR';
import { ToastContainer } from 'react-toastify';

const CartComponent = () => {
    const {
        products,
        favorite,
        handleFavorite,
        handleIncrement,
        handleDecrement,
        handleDelete,
        handleQuantityChange,
        calculateTotal,
        handleOneCart,
        handleSelectAllChange,
        handleCheckout,
        checkedCart,
        selectAll,
    } = useContext(CartContext);

    return (
        <div className='container mx-auto px-8 min-h-screen'>
            <ToastContainer />
            <div className='py-[6rem]'>
                <p className='font-bold text-2xl'>Keranjang</p>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='kiri col-span-2'>
                        {products.length !== 0 ?
                            (<div className='flex items-center gap-3 px-5 bg-white py-3 rounded-md my-4'>
                                <input type="checkbox" checked={selectAll}
                                    onChange={(handleSelectAllChange)} />
                                <p className='font-semibold'>Pilih Semua</p>
                            </div>)
                            :
                            (<div className='flex justify-center my-4'>
                                <div className='flex justify-center font-semibold place-content-center h-[100px] w-full bg-slate-600 text-white rounded items-center'>
                                    <p>Cart kamu masih kosong nih...</p>
                                </div>
                            </div>)}
                        {products.map((item) => (
                            <div key={item.id} className='flex flex-col gap-3 bg-white py-3 px-5 rounded-md my-4'>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" checked={checkedCart.includes(item.id)}
                                        onChange={() => handleOneCart(item.id)} />
                                    <p className='font-semibold'>{item.product.user.username}</p>
                                </div>
                                <div className='flex gap-3'>
                                    <div className=''>
                                        <img className='max-w-[120px] rounded' src={item.product.img} alt="" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className='flex flex-row-reverse justify-between w-full gap-3'>
                                            <p>{formatter.format((item.product.hargaBarang - item.product.hargaBarang * item.product.diskon / 100) * item.quantity)}</p>
                                            <p>{item.product.deskripsiBarang}</p>
                                        </div>
                                        <div className='flex flex-row-reverse my-3'>
                                            <p className='line-through'>{formatter.format(item.product.hargaBarang)}</p>
                                        </div>
                                        <div className='flex flex-row-reverse items-center gap-8'>
                                            <div className="flex items-center rounded-md border-2 border-slate-500">
                                                <button onClick={() => handleDecrement(item.id)} className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-l">-</button>
                                                <input
                                                    id="number-input"
                                                    type="number"
                                                    value={item.quantity}
                                                    min="1"
                                                    className="text-center w-16 border border-gray-300 py-2"
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                />
                                                <button onClick={() => handleIncrement(item.id)} className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-r">+</button>
                                            </div>
                                            <div className='gap-3 flex'>
                                                {/* <button onClick={handleFavorite}>
                                                    {favorite ? <MdOutlineFavorite size={20} /> : <MdOutlineFavoriteBorder size={20} />}
                                                </button> */}
                                                <FaRegTrashAlt size={20} onClick={() => handleDelete(item.id)} className='cursor-pointer' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='kanan my-4'>
                        <div className='bg-white sticky top-[7rem] p-3 rounded-md'>
                            <p className='font-semibold'>Ringkasan Belanja</p>
                            <div className='flex justify-between my-5'>
                                <p className='text-slate-600 font-semibold'>Total</p>
                                <p className=''>{formatter.format(calculateTotal())}</p>
                            </div>
                            <div className='text-center'>
                                <button onClick={handleCheckout} className='text-white bg-slate-600 w-full py-1 rounded-md'>
                                    Beli
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;