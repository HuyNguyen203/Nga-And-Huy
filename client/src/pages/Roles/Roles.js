//libs
import classNames from 'classnames/bind';
import styles from './Roles.module.scss';
//components
import Role from '~/components/Role';

function Roles() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-roles')}>
                <Role />
                <Role />
                <Role />
            </div>
        </div>
    );
}

export default Roles;
