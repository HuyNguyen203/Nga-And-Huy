//libs
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState } from 'react';

//components
import Input from '~/components/Input';
import Button from '~/components/Button';
import config from '~/config';
import { loginUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    const cx = classNames.bind(styles);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    };
    return (
        <div className={cx('wrapper')}>
            <form className={cx('login')} onSubmit={handleLogin}>
                <div className={cx('title')}>Đăng nhập</div>
                <div className={cx('guide')}>Nhập ID và password để đăng nhập</div>
                <div className={cx('account')}>
                    <div className={cx('account-id')}>
                        <div className={cx('title-id')}>ID</div>
                        <Input large placeholder="Nhập mã giảng viên" onChange={(e) => setUsername(e)} />
                    </div>
                    <div className={cx('account-password')}>
                        <div className={cx('password')}>
                            <div className={cx('title-password')}>Password</div>
                            <div className={cx('forgot-password')}>Forgot Password?</div>
                        </div>
                        <Input large placeholder="" password onChange={(e) => setPassword(e)} />
                    </div>
                    <div className={cx('remember-password')}>
                        <input type="checkbox" />
                        Nhớ mật khẩu
                    </div>
                </div>
                <div className={cx('action')}>
                    {
                        <Button primary className={cx('custom-btn')} onClick={handleLogin}>
                            Đăng nhập
                        </Button>
                    }
                </div>
            </form>
        </div>
    );
}

export default Login;
