//libs
import classNames from 'classnames/bind';
import styles from './Role.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//components
import Button from '../Button';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/config';

function Role({ role }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon-roles')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')}></FontAwesomeIcon>
            </div>
            <div className={cx('role-name')}>{role.roleName}</div>
            <div className={cx('role-content')}>{role.roleContent}</div>
            <Button
                className={cx('submit')}
                primary
                rightIcon={<FontAwesomeIcon icon={faUser} />}
                to={config.routes.lophocphan}
            >
                Truy cập
            </Button>
        </div>
    );
}

export default Role;
