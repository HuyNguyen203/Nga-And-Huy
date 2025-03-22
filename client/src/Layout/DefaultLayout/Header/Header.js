import Logo_IUH from '~/IMG/Logo_IUH.png';
import { Link } from 'react-router-dom';
import avatar from '~/IMG/avatar.jpg';

//libs
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';

//componet
import Search from '~/components/Search';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';

function Header() {
    const cx = classNames.bind(styles);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const parentCallback = (children) => {
        switch (children) {
            case 'Đăng xuất': {
                return handleLogout();
            }
            case 'Đổi vai trò': {
                return navigate(config.routes.roles);
            }
        }
        return children;
    };
    const handleLogout = () => {
        logOut(dispatch, user?.id, navigate, user?.accessToken, axiosJWT);
    };

    return (
        <header className={cx('wrapper')}>
            <nav className={cx('custom-navbar')}>
                {/* Logo */}
                <Link to={config.routes.home}>
                    <img className={cx('logo-iuh')} src={Logo_IUH} alt="logo iuh" />
                </Link>
                {/* search */}
                <Search />

                <Menu
                    items={[
                        {
                            icon: <FontAwesomeIcon icon={faUser} />,
                            title: 'Thông tin cá nhân',
                        },

                        {
                            icon: <FontAwesomeIcon icon={faLock} />,
                            title: 'Đổi vai trò',
                        },
                        {
                            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
                            title: 'Đăng xuất',
                        },
                    ]}
                    parentCallback={parentCallback}
                >
                    <div className={cx('active')}>
                        <Image src={''} alt="" className={cx('user-avatar')} />
                        <div className={cx('name-role')}>
                            <strong className={cx('name')}>{user?.username}</strong>
                            <p className={cx('role')}>{user?.role}</p>
                        </div>
                    </div>
                </Menu>
            </nav>
        </header>
    );
}

export default Header;
