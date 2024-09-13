import Logo_IUH from '~/IMG/Logo_IUH.png';
import { Link } from 'react-router-dom';
import avatar from '~/IMG/avatar.jpg';

//libs
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import config from '~/config';
import { useSelector } from 'react-redux';
//componet
import Search from '~/components/Search';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightFromBracket, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const cx = classNames.bind(styles);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const parentCallback = (children) => {
        return children;
    };
    return (
        <header className={cx('wrapper')}>
            <nav className={cx('navbar', 'custom-navbar')}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo')}>
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
                            title: 'Đổi mật khẩu',
                        },
                        {
                            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
                            title: 'Đăng Xuất',
                        },
                    ]}
                    parentCallback={parentCallback}
                >
                    <div className={cx('active')}>
                        <Image src={''} alt="" className={cx('user-avatar')} />
                        <div className={cx('name-role')}>
                            <strong className={cx('name')}>{user?.username}</strong>
                            <p className={cx('role')}>a</p>
                        </div>
                    </div>
                </Menu>
            </nav>
        </header>
    );
}

export default Header;
