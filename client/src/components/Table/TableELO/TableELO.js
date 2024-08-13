//libs
import classNames from 'classnames/bind';
import styles from '../Table.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//component
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Table from '~/components/Table';
import FormELOs from '~/components/Form/FormELOs/FormELOs';

function TableELO({ states, valueData, add, edit, formELOs, formId }) {
    const cx = classNames.bind(styles);
    const formIdModalPIs = '#exampleModalPIs';

    const childState = ['PIS', 'MÔ TẢ', 'BLOOM’S TAXONOMY LEVELS ', 'DOMAIN', 'CHÚ THÍCH', ''];
    ///
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    ///

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-table')}>
                <table className={cx('table', 'custom-table')}>
                    <thead className={cx('header-CLO')}>
                        <tr>
                            <th scope="col">STT</th>

                            {states.map((state, index) => (
                                <th scope="col" key={index}>
                                    {state}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {valueData ? (
                        <tbody className={cx('body')}>
                            {valueData.map((elo) => (
                                <React.Fragment key={elo.id}>
                                    <tr
                                        className={expandedRow === elo.id ? cx('highlighted') : cx('no-highlight')}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <th scope="row" onClick={() => toggleRow(elo.id)}>
                                            {elo.id.toString().padStart(4, '0')}
                                        </th>
                                        <td onClick={() => toggleRow(elo.id)}>{elo.maELO}</td>
                                        <td onClick={() => toggleRow(elo.id)}>{elo.eloTiengAnh}</td>
                                        <td onClick={() => toggleRow(elo.id)}>{elo.chuThich}</td>
                                        <td>
                                            {add && (
                                                <FontAwesomeIcon
                                                    className={cx('add-btn')}
                                                    icon={faPlus}
                                                    data-toggle="modal"
                                                    data-target={formId}
                                                />
                                            )}

                                            {edit && (
                                                <FontAwesomeIcon
                                                    className={cx('edit-btn')}
                                                    icon={faPencil}
                                                    data-toggle="modal"
                                                    data-target={formId}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                    {expandedRow === elo.id && (
                                        <tr className={cx('form')}>
                                            <td
                                                colSpan="7"
                                                className={cx('child-form')}
                                                style={{
                                                    padding: 0,
                                                }}
                                            >
                                                <Table
                                                    states={childState}
                                                    valueData={elo.pis}
                                                    // add
                                                    edit
                                                    formPIs
                                                    formId={formIdModalPIs}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="6" className={cx('no-data')}>
                                    KHÔNG CÓ DỮ LIỆU
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            {formELOs && <FormELOs />}
        </div>
    );
}

export default TableELO;
