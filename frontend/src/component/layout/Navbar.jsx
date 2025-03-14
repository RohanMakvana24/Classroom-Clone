import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatach = useDispatch();
  const token = useSelector((state)=>state.auth.token)
  const handleLogout = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/private-auth`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      if(response.data.isValid && response.data.success ){
        dispatach(logout());
        localStorage.removeItem('auth');
        toast.success("logout Successfull")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const user = useSelector((state)=>state.auth.user);

  
  return (
    <> <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container-fluid">
      <button
        className="btn btn-outline-secondary d-lg-none me-2"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar"
        onClick={<> </>}
      >
        <i className="fas fa-bars" />
      </button>
      <a
        className="navbar-brand d-flex align-items-center"
        href="#"
        style={{ fontWeight: "600" }}
      >
        <i class="fa-solid fa-book" style={{ marginRight : "4px", fontSize : "15px"}}></i>
        Classroom
      </a>
      <div className="d-flex align-items-center ms-auto">
        <div className="dropdown">
          <button
            className="btn btn-link "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-plus" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#creteClassModal"
              >
                Create Class
              </button>
            </li>
            <li>
            <button
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#joinClassModal"
              >
                Join Class
              </button>
              
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              alt="User profile picture"
              className="rounded-circle"
              height="32"
              src={`${user.profile.url ? user.profile.url : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_w.jpeg" }`}
              width="32"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav></>
  )
}

export default Navbar