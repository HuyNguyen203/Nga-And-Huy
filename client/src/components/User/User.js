//libs
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

//components
import Button from '../Button';
import { deleteUser } from '~/redux/apiRequest';

function User({ username, userId, axiosJWT }) {
    const dispatch = useDispatch();
    const cx = classNames.bind(styles);
    const user = useSelector((state) => state.auth.login?.currentUser);

    return (
        <div className={cx('wrapper')}>
            <div className="userName">{username}</div>
            <div className={cx('userRole')}>userRole</div>
            <Button
                primary
                onClick={() => {
                    deleteUser(user?.accessToken, dispatch, userId, axiosJWT);
                }}
            >
                Delete
            </Button>
        </div>
    );
}

export default User;
