//libs
import classNames from 'classnames/bind';
import styles from './Users.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components
import User from '~/components/User';
import Button from '~/components/Button';
import FormRegister from '~/components/Form/FormRegister';
import { getAllUsers, logOut } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '~/redux/axiosInstance';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';

function Roles() {
    const cx = classNames.bind(styles);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users?.allUsers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const msg = useSelector((state) => state.users?.msg);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const handleLogout = () => {
        logOut(dispatch, user?.id, navigate, user?.accessToken, axiosJWT);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('action')}>
                <Button primary onClick={handleLogout} className={cx('logout')}>
                    Logout
                </Button>
                <div>{msg}</div>

                <Button primary className={cx('addUser')} data-toggle="modal" data-target="#exampleModalRegister">
                    New user
                </Button>
            </div>
            <FormRegister />
            <div className={cx('admin')}>
                <div className={cx('title')}>Admin</div>
                <div className={cx('list')}>
                    {userList
                        ?.filter((user) => user.admin)
                        .map((user, index) => (
                            <User
                                key={index}
                                admin={user.admin}
                                username={user.username}
                                userId={user._id}
                                email={user.email}
                            />
                        ))}
                </div>
            </div>
            <div className={cx('user')}>
                <div className={cx('title')}>User</div>
                <div className={cx('list')}>
                    {userList
                        ?.filter((user) => !user.admin)
                        .map((user, index) => (
                            <User
                                key={index}
                                admin={user.admin}
                                username={user.username}
                                userId={user._id}
                                email={user.email}
                                axiosJWT={axiosJWT}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Roles;
