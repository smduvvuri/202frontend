import { Link } from "react-router-dom";

const AdminHotelNav = () => {
  const active = window.location.pathname;
  //   console.log(active);
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/adminDashboard" && "active"}`}
          to="/adminDashboard"
        >
          Add Hotel
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard/seller" && "active"}`}
          to="/dashboard/seller"
        >
          Modify Hotel
        </Link>
      </li>
    </ul>
  );
};

export default AdminHotelNav;