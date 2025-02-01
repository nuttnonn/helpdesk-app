import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../../store/store.ts';
import { logout, updateUserSuccess } from "../../features/auth/authSlice.ts";
import { TbUserSquareRounded } from 'react-icons/tb';
import { IoLogOutOutline } from 'react-icons/io5';
import { Modal } from 'antd';
import UserForm from '../forms/UserForm.tsx';
import { useUpdateUser } from '../../features/users/userAPI.ts';

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const { mutate: updateUser, isPending, isError, error } = useUpdateUser();

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

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
                setOpenModal(false);
            },
        });
    };

    return (
        <nav className="w-screen px-4 py-1 fixed top-0 z-50 flex justify-end items-center gap-3 bg-primary">
            <h4 className="text-xl">{user.name}</h4>
            <div
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
                className="p-1 relative rounded-t-lg ease-in-out duration-300 hover:bg-black/[0.75] hover:backdrop-blur-lg"
            >
                <TbUserSquareRounded className="text-[40px] text-textPrimary" />
                <div className={`min-w-36 absolute bottom-0 right-0 translate-y-[100%] flex flex-col justify-start items-start gap-3 ease-in-out duration-300 ${
                    openDropdown
                        ? 'opacity-100 h-fit p-4 rounded-lg rounded-tr-none bg-black/[0.75] backdrop-blur-lg'
                        : 'opacity-0 h-[0px] overflow-hidden rounded-none p-0 bg-black/[0]'
                }`}>
                    <button
                        onClick={() => setOpenModal(true)}
                        className={`whitespace-nowrap hover:underline ${openDropdown ? 'flex' : 'hidden'}`}>
                        User Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`w-full py-[6px] flex justify-center items-center gap-2 rounded-[4px] bg-error/[0.5] hover:bg-error ${openDropdown ? 'flex ease-in-out duration-300' : 'hidden'}`}
                    >
                        Logout
                        <IoLogOutOutline className="text-[20px] text-textPrimary" />
                    </button>
                </div>
            </div>
            <Modal
                title="User Profile"
                centered
                open={openModal}
                footer={null}
                onCancel={() => setOpenModal(false)}
                rootClassName="custom-modal"
            >
                <UserForm
                    user={user}
                    onFinish={onFinish}
                    isLoading={isPending}
                    passwordRequired={false}
                    isUpdate={true}
                />
                {(isError && error) && <p className="text-red-500 text-sm">{error.message}</p>}
            </Modal>
        </nav>
    );
};

export default Navbar;