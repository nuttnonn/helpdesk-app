import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../../store/store.ts';
import { logout, updateUserSuccess } from "../../features/auth/authSlice.ts";
import { TbUserSquareRounded } from 'react-icons/tb';
import { IoLogOutOutline } from 'react-icons/io5';
import { Modal } from 'antd';
import UserForm from '../forms/UserForm.tsx';
import { useUpdateUser } from '../../features/users/usersAPI.ts';

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const { mutate: updateUser, isPending, isError, error } = useUpdateUser();

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const onFinish = async (values) => {
        if (!values.password) delete values.password;

        await updateUser({ ...values, id: user.id }, {
            onSuccess: (response) => {
                delete response.password;
                dispatch(updateUserSuccess(response));
                setIsUserModalOpen(false);
            },
        });
    };

    return (
        <nav className="w-screen px-4 py-3 fixed top-0 z-50 flex justify-between items-center gap-3 bg-background border-b-[1px] border-border">
            <h3 className="text-secondary font-extrabold tracking-tighter">Helpdesk.</h3>
            <div className="flex justify-end items-center gap-3">
                <h4 className="text-xl">{user.name}</h4>
                <div
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="p-1 relative rounded-t-lg ease-in-out duration-300 hover:bg-black/[0.75] hover:backdrop-blur-lg"
                >
                    <TbUserSquareRounded className="text-[40px] text-textPrimary" />
                    <div
                        className={`min-w-36 absolute bottom-0 right-0 translate-y-[100%] flex flex-col justify-start items-start gap-3 ease-in-out duration-300 ${
                            isDropdownOpen
                                ? 'opacity-100 h-fit p-4 rounded-lg rounded-tr-none bg-black/[0.95]'
                                : 'opacity-0 h-[0px] overflow-hidden rounded-none p-0 bg-black/[0]'
                        }`}>
                        <button
                            onClick={() => setIsUserModalOpen(true)}
                            className={`whitespace-nowrap hover:underline ${isDropdownOpen ? 'flex' : 'hidden'}`}>
                            Users Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className={`w-full py-[6px] flex justify-center items-center gap-2 rounded-[4px] bg-error/[0.5] hover:bg-error ${isDropdownOpen ? 'flex ease-in-out duration-300' : 'hidden'}`}
                        >
                            Logout
                            <IoLogOutOutline className="text-[20px] text-textPrimary" />
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                title="Users Profile"
                centered
                open={isUserModalOpen}
                footer={null}
                onCancel={() => setIsUserModalOpen(false)}
                rootClassName="custom-modal"
            >
                <div className="w-full pt-6 pb-2">
                    <UserForm
                        user={user}
                        onFinish={onFinish}
                        isLoading={isPending}
                        passwordRequired={false}
                        isUpdate={true}
                    />
                </div>
                {(isError && error) && <p className="text-red-500 text-sm">{error.message}</p>}
            </Modal>
        </nav>
    );
};

export default Navbar;