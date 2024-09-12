//libs
import classNames from 'classnames/bind';
import styles from './Users.module.scss';
//components
import User from '~/components/User';
import Button from '~/components/Button';
import FormRegister from '~/components/Form/FormRegister';

function Roles() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <Button primary className={cx('addUser')} data-toggle="modal" data-target="#exampleModalRegister">
                New user
            </Button>
            <FormRegister />
            <div className={cx('admin')}>
                <div className={cx('title')}>Admin</div>
                <div className={cx('list')}>
                    <User />
                    <User />
                </div>
            </div>
            <div className={cx('user')}>
                <div className={cx('title')}>User</div>
                <div className={cx('list')}>
                    <User />
                    <User />
                </div>
            </div>
        </div>
    );
}

export default Roles;
