//libs
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

//components
import Button from '../Button';
import { deleteUser } from '~/redux/apiRequest';

function User({ admin, username, userId, email, axiosJWT }) {
    // const { admin, username, userId, email, axiosJWT } = props
    const dispatch = useDispatch();
    const cx = classNames.bind(styles);
    const user = useSelector((state) => state.auth.login?.currentUser);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('userName')}>{username}</div>
            <div className={cx('email')}>{email}</div>
            {!admin && (
                <Button
                    className={cx('btn-delete')}
                    primary
                    onClick={() => {
                        deleteUser(user?.accessToken, dispatch, userId, axiosJWT);
                    }}
                >
                    Delete
                </Button>
            )}
        </div>
    );
}

export default User;
