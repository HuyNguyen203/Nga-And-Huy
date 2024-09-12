//libs
import classNames from 'classnames/bind';
import styles from './FormRegister.module.scss';
import { useState } from 'react';

//components
import Button from '~/components/Button';
import Input from '~/components/Input';
import { registerUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';

function FormRegister() {
    const cx = classNames.bind(styles);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            username: username,
            password: password,
            email: email,
        };
        registerUser(newUser, dispatch);
    };

    return (
        <div
            className={cx('modal', 'fade')}
            id="exampleModalRegister"
            role="dialog"
            aria-labelledby="exampleModalLabel"
        >
            <form className={cx('modal-dialog')} role="document" style={{ justifyContent: 'center' }}>
                <div
                    className={cx('form', 'modal-body', 'modal-content', 'modal-content-custom')}
                    id="exampleModalRegister"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                >
                    <div className={cx('content')}>
                        <div className={cx('close-modal')} data-dismiss="modal" aria-label="Close">
                            &times;
                        </div>
                        <div className={cx('wrapper')}>
                            <div className={cx('title')}>Đăng ký</div>
                            <div className={cx('guide')}>Nhập ID và password để đăng ký</div>
                            <div className={cx('account')}>
                                <div className={cx('account-id')}>
                                    <div className={cx('title-id')}>Email</div>
                                    <Input placeholder="Nhập email" onChange={(e) => setEmail(e)} />
                                </div>

                                <div className={cx('account-id')}>
                                    <div className={cx('title-id')}>ID</div>
                                    <Input placeholder="Nhập mã giảng viên" onChange={(e) => setUsername(e)} />
                                </div>

                                <div className={cx('account-password')}>
                                    <div className={cx('title-password')}>Password</div>
                                    <Input placeholder="" password onChange={(e) => setPassword(e)} />
                                </div>
                            </div>
                            <div className={cx('action')}>
                                {
                                    <Button
                                        primary
                                        className={cx('custom-btn')}
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleRegister}
                                    >
                                        Đăng ký
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormRegister;
