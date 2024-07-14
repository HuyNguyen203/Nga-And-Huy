//libs
import classNames from 'classnames/bind';
import styles from './FormThongTinSinhVien.module.scss';

//components
import Input from '~/components/Input';
import Button from '~/components/Button';
import Combobox from '~/components/Combobox';

const FromThongTinSinhVien = () => {
    const cx = classNames.bind(styles);
    return (
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document" style={{ justifyContent: 'center' }}>
                <div
                    className={cx('form', 'modal-body', 'modal-content', 'modal-content-custom')}
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div className={cx('content')}>
                        <div className={cx('close-modal')} data-dismiss="modal" aria-label="Close">
                            &times;
                        </div>
                        <div className={cx('title')}>THÔNG TIN SINH VIÊN</div>
                        <div className={cx('info', 'row')}>
                            <Input title="MSSV" isRequire />
                            <Input title="Họ và tên" isRequire />
                            <Input title="Ngày sinh" isRequire />
                            <Input title="Lớp danh nghĩa" isRequire />
                            <Combobox title="Giới tính" isRequire />
                            <Combobox title="Trạng thái" isRequire />
                        </div>
                        <div className={cx('action')}>
                            <Button primary className={cx('confirm-btn')} data-dismiss="modal" aria-label="Close">
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FromThongTinSinhVien;
