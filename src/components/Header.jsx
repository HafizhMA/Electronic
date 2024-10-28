import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./register-login/Logout";
import { BsCart4 } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { CartContext } from "../utils/CartContext";

const Header = () => {
  const [login, setLogin] = useState(false);
  const [query, setQuery] = useState("");
  const { totalQuantity } = useContext(CartContext);

  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search-product?query=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header>
      <nav className="z-50 fixed top-0 bg-slate-600 w-full p-4">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center">
            <Link to='/' className="text-white logo-header font-bold text-2xl hidden lg:inline-block me-1">Electronic</Link>
          </div>
          <div className="form-control mx-1 w-full">
            <form onSubmit={handleSearch}>
              <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="input input-bordered w-full" />
            </form>
          </div>

          <div className="flex">
            <div className="text-white py-2 px-4  my-auto mx-1 flex">
              <Link to='/'>
                <IoHomeOutline size={25} className="hover:text-gray-200 me-4 z-[100]" />
              </Link>
              <Link className='relative' to='/cart'>
                <BsCart4 size={25} className="hover:text-gray-200" />
                <div className="absolute -top-2 -right-4 bg-red-700 text-white rounded-full px-2 ">{totalQuantity}</div>
              </Link>
            </div>
            {login ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] flex justify-start p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><button className="transform-text-profile">Profile (coming soon)</button></li>
                  <li><button className="transform-text-profile">Form Jual (coming soon)</button></li>
                  <li><button onClick={() => window.location.href = '/order-list'} className="transform-text-profile">Pembayaran</button></li>
                  <li><Logout /></li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/register"
                  className="bg-white my-auto p-2 font-semibold text-slate-600 rounded hover:text-slate-300 transition"
                >
                  Masuk
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav >
    </header >
  );
};

export default Header;
