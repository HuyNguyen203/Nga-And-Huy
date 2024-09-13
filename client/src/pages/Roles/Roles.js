//libs
import classNames from 'classnames/bind';
import styles from './Roles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//components
import Role from '~/components/Role';
import Button from '~/components/Button';
import { logOut } from '~/redux/apiRequest';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { useEffect, useState } from 'react';

function Roles() {
    const cx = classNames.bind(styles);
    const [roleData, setRoleData] = useState([]);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = () => {
        logOut(dispatch, user?.id, navigate, user?.accessToken, axiosJWT);
    };

    const getData = async () => {
        try {
            let result = await fetch('http://localhost:4000/user/' + user?._id);
            const roleData = await result.json();

            setRoleData(roleData);
            return roleData;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user')}>
                <div className={cx('username')}>User: {user?.username}</div>
                <Button primary onClick={handleLogout} className={cx('logout')}>
                    Logout
                </Button>
            </div>
            <div className={cx('title')}>Chọn một vai trò để đăng nhập</div>
            <div className={cx('wrapper-roles')}>
                {roleData.map((role, index) => (
                    <Role key={index} role={role} />
                ))}
            </div>
        </div>
    );
}

export default Roles;
