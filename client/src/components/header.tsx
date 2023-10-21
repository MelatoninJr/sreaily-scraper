import React from "react";
import pfp from '../dillonpfp2.jpeg';

const Header = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                {/* Assuming it's a navigational link to the homepage */}
                <a href="/" className="btn btn-ghost normal-case text-xl">REscrape</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    {/* Using a button instead of label for the dropdown trigger */}
                    <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src={pfp} alt="User profile" />
                        </div>
                    </button>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            {/* Assuming these are navigational links */}
                            <a href="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a href="/settings">Settings</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;
