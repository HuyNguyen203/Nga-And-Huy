//libs
import classNames from 'classnames/bind';
import styles from './FormRegister.module.scss';
//components
import Button from '~/components/Button';
import Input from '~/components/Input';

function FormRegister() {
    const cx = classNames.bind(styles);

    return (
        <div
            className={cx('modal', 'fade')}
            id="exampleModalRegister"
            taxIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className={cx('modal-dialog')} role="document" style={{ justifyContent: 'center' }}>
                <div
                    className={cx('form', 'modal-body', 'modal-content', 'modal-content-custom')}
                    id="exampleModalRegister"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
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
                                    <div className={cx('title-id')}>ID</div>
                                    <Input placeholder="Nhập mã giảng viên" />
                                </div>
                                <div className={cx('account-password')}>
                                    <div className={cx('title-password')}>Password</div>
                                    <Input placeholder="" password />
                                </div>
                            </div>
                            <div className={cx('action')}>
                                {
                                    <Button primary className={cx('custom-btn')}>
                                        Đăng nhập
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormRegister;
