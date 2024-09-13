//libs
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faBook,
    faBorderAll,
    faBriefcase,
    faChalkboardUser,
    faChevronRight,
    faGear,
    faGraduationCap,
    faLandmark,
    faListCheck,
    faSchool,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//component
import config from '~/config';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { logOut } from '~/redux/apiRequest';
import { createAxios } from '~/redux/createInstance';
import { loginSuccess } from '~/redux/authSlice';

function Sidebar({ parentCallback }) {
    const cx = classNames.bind(styles);
    const [lighted, setLighted] = useState(false);
    const [close, setClose] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = () => {
        logOut(dispatch, user?.id, navigate, user?.accessToken, axiosJWT);
    };

    return (
        <nav className={cx('sidebar', close ? 'close' : '')}>
            <header>
                <FontAwesomeIcon
                    className={cx('icon-arrow')}
                    icon={faChevronRight}
                    onClick={() => {
                        setClose(!close);
                    }}
                />
            </header>

            <div className={cx('menu-bar')}>
                <div className={cx('menu')}>
                    <ul className={cx('menu-link')}>
                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.lophocphan}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faBook} />
                                <span className={cx('text', 'nav-text')}>LỚP HỌC PHẦN</span>
                            </NavLink>
                        </li>
                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.banganhxa}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faBorderAll} />
                                <span className={cx('text', 'nav-text')}>BẢNG ÁNH XẠ</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.elospis}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faSchool} />
                                <span className={cx('text', 'nav-text')}>ELOs & PIs</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.clos}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faLandmark} />
                                <span className={cx('text', 'nav-text')}> CLOs</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.chuongtrinhkhung}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faListCheck} />
                                <span className={cx('text', 'nav-text')}>CHƯƠNG TRÌNH KHUNG</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.giangvien}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faChalkboardUser} />
                                <span className={cx('text', 'nav-text')}>GIẢNG VIÊN</span>
                            </NavLink>
                        </li>
                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.chuandaura}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faGraduationCap} />
                                <span className={cx('text', 'nav-text')}>CHUẨN ĐẦU RA</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink
                                className={(nav) => cx('menu-item', 'item', { active: nav.isActive })}
                                to={config.routes.bomon}
                            >
                                <FontAwesomeIcon className={cx('icon')} icon={faBriefcase} />
                                <span className={cx('text', 'nav-text')}>BỘ MÔN</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={cx('bottom-content')}>
                    <li className={cx('nav-link')}>
                        <NavLink className={cx('item')} onClick={handleLogout}>
                            <FontAwesomeIcon className={cx('icon')} icon={faArrowRightFromBracket} />
                            <span className={cx('text', 'nav-text')}>Đăng xuất</span>
                        </NavLink>
                    </li>
                    <li className={cx('mode', 'nav-link')}>
                        <div className={cx('moon-sun')}>
                            <FontAwesomeIcon className={cx('icon', 'moon')} icon={lighted ? faMoon : faSun} />
                        </div>
                        <span className={cx('mode-text', 'text')}>Dark Mode</span>
                        <div
                            className={cx('toggle-switch', lighted ? 'dark' : '')}
                            onClick={() => {
                                setLighted(!lighted);
                                parentCallback(lighted);
                            }}
                        >
                            <span className={cx('switch')}></span>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
