//libs
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//components
import Button from '../Button';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/config';

function Role() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className="userName">userName</div>
            <div className={cx('userRole')}>userRole</div>
            <Button primary>Delete</Button>
        </div>
    );
}

export default Role;
