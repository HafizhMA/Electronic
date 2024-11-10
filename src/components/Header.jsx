import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./register-login/Logout";
import { BsCart4 } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { CartContext } from "../utils/CartContext";
import { getUserLogin } from "../services/apiServices";

const Header = () => {
  const [login, setLogin] = useState(false);
  const [query, setQuery] = useState("");
  const { totalQuantity } = useContext(CartContext);
  const [user, setUser] = useState([]);

  const navigate = useNavigate()

  const getUserLoginData = async () => {
    try {
      const response = await getUserLogin();
      setUser(response.data.user);
      console.log('data user', response);
    } catch (error) {
      console.log('failed', error);

    }
  }

  useEffect(() => {
    getUserLoginData();

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
        <div className="px-2 mx-auto flex justify-between">
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
                    <img alt="Tailwind CSS Navbar component" src={user.foto_profile} />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] flex justify-start p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><Link to='/edit-profile' className="transform-text-profile">Profile</Link></li>
                  <li><button className="transform-text-profile">Form Jual (coming soon)</button></li>
                  <li><Link to='/order-list' className="transform-text-profile">Pembayaran</Link></li>
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
