//libs
import classNames from 'classnames/bind';
import styles from './CLOs.module.scss';
import HeaderContent from '~/Layout/HeaderContent';
import TableCLO from '~/components/Table/TableCLO';
import { useEffect, useState } from 'react';
//component

function CLOs() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);

    const formIdModalCLOs = '#exampleModalCLOs';
    const states = ['MÃ MÔN HỌC', 'TÊN MÔN HỌC', 'CHỦ QUẢN', 'CHÚ THÍCH', ''];
    const valueState1 = [
        {
            title: 'Môn học',
        },
    ];
    const valueState2 = [
        {
            title: 'Order types',
        },
    ];
    const valueState3 = [
        {
            title: 'Order status',
        },
    ];

    const getData = async () => {
        try {
            let result = await fetch(`http://localhost:4000/clos`);
            const data = await result.json();

            setData(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <HeaderContent
                name="CLOs"
                valueState1={valueState1}
                valueState2={valueState2}
                valueState3={valueState3}
                formId={formIdModalCLOs}
            />
            <div className={cx('wrapper-table')}>
                <TableCLO states={states} valueData={data} add edit formCLOs formId={formIdModalCLOs} />
            </div>
        </div>
    );
}

export default CLOs;
