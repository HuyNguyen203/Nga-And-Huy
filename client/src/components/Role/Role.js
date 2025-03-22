//libs
import classNames from 'classnames/bind';
import styles from './Role.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
//components
import Button from '../Button';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/config';
import { updateUserRole } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

function Role({ role }) {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChooseRole = async () => {
        try {
            updateUserRole(user?.accessToken, dispatch, user?._id, navigate, role?.roleName);
        } catch (error) {
            console.log(error);
        }
    };

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
                onClick={handleChooseRole}
            >
                Truy cập
            </Button>
        </div>
    );
}

export default Role;
