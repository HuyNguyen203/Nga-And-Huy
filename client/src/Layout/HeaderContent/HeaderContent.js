//libs
import styles from './HeaderContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';

//component
import Button from '~/components/Button';
import Filter from '~/components/Filter';

function HeaderContent({
    name,
    valueState1,
    valueState2,
    valueState3,
    btnAdd,
    btnImport,
    onClickWhenAdd,
    onClickWhenImport,
    listStudentResultBtn,
    parentCallback,
    formId,
}) {
    const cx = classNames.bind(styles);

    const [selectionBtnList, setSelectionBtnList] = useState(true);
    const [selectionBtnResult, setSelectionBtnResult] = useState(false);

    const sendChoose = () => {
        parentCallback(selectionBtnList);
    };

    const handleBtnList = () => {
        if (selectionBtnList) return;
        setSelectionBtnList(true);
        setSelectionBtnResult(false);
        sendChoose();
    };

    const handleBtnResult = () => {
        if (selectionBtnResult) return;
        setSelectionBtnResult(true);
        setSelectionBtnList(false);
        sendChoose();
    };

    return (
        <div className={cx('header')}>
            <h1 className={cx('name-page')}>{name}</h1>
            {listStudentResultBtn && (
                <div className={cx('listStudent_result_btn')}>
                    <Button
                        className={cx('listStudent_btn')}
                        onClick={handleBtnList}
                        style={{
                            backgroundColor: selectionBtnList ? 'var(--primary)' : 'var(--white)',
                            color: selectionBtnList ? 'var(--white)' : 'var(--primary)',
                        }}
                    >
                        <strong>DANH SÁCH SINH VIÊN</strong>
                    </Button>
                    <Button
                        className={cx('result_btn')}
                        onClick={handleBtnResult}
                        style={{
                            backgroundColor: selectionBtnResult ? 'var(--primary)' : 'var(--white)',
                            color: selectionBtnResult ? 'var(--white)' : 'var(--primary)',
                        }}
                    >
                        <strong>KẾT QUẢ ĐÁNH GIÁ</strong>
                    </Button>
                </div>
            )}

            <div className={cx('container')}>
                <Filter valueState1={valueState1} valueState2={valueState2} valueState3={valueState3} />
                <div className={cx('action')}>
                    {btnAdd && (
                        <Button
                            primary
                            small
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={onClickWhenAdd}
                            data-toggle="modal"
                            data-target={formId}
                        >
                            <strong>THÊM</strong>
                        </Button>
                    )}
                    {btnImport && (
                        <Button
                            primary
                            small
                            leftIcon={<FontAwesomeIcon icon={faFileImport} />}
                            onClick={onClickWhenImport}
                            className={cx('import-btn')}
                        >
                            <strong>IMPORT</strong>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
HeaderContent.protoTypes = {
    name: PropTypes.string.isRequired,
    state1: PropTypes.string,
    state2: PropTypes.string,
    state3: PropTypes.string,
    btnAdd: PropTypes.node,
    btnImport: PropTypes.node,
};
export default HeaderContent;
