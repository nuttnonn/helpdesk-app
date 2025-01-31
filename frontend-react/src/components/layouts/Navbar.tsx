import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../../store/store.ts';
import { logout } from "../../features/auth/authSlice.ts";
import { TbUserSquareRounded } from 'react-icons/tb';
import { IoLogOutOutline } from 'react-icons/io5';

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const [open, setOpen] = useState<boolean>(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="w-screen px-4 py-1 fixed top-0 z-50 flex justify-end items-center gap-3 bg-primary">
            <h4 className="text-xl">{user.name}</h4>
            <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="p-1 relative rounded-t-lg ease-in-out duration-300 hover:bg-black/[0.75] hover:backdrop-blur-lg"
            >
                <TbUserSquareRounded className="text-[40px] text-textPrimary" />
                <div className={`min-w-36 absolute bottom-0 right-0 translate-y-[100%] flex flex-col justify-start items-start gap-3 ease-in-out duration-300 ${
                    open
                        ? 'opacity-100 h-fit p-4 rounded-lg rounded-tr-none bg-black/[0.75] backdrop-blur-lg'
                        : 'opacity-0 h-[0px] overflow-hidden rounded-none p-0 bg-black/[0]'
                }`}>
                    <button className={`whitespace-nowrap hover:underline ${open ? 'flex' : 'hidden'}`}>Edit Profile</button>
                    <button
                        onClick={handleLogout}
                        className={`w-full py-[6px] flex justify-center items-center gap-2 rounded-[4px] bg-error/[0.5] hover:bg-error ${open ? 'flex ease-in-out duration-300' : 'hidden'}`}
                    >
                        Logout
                        <IoLogOutOutline className="text-[20px] text-textPrimary" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;