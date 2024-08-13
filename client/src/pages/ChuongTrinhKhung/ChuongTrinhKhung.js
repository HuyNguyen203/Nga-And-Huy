//libs
import classNames from 'classnames/bind';
import styles from './ChuongTrinhKhung.module.scss';

//components
import HeaderContent from '~/Layout/HeaderContent';
import TableCTK from '~/components/Table/TableCTK';
import { useEffect, useState } from 'react';

function ChuongTrinhKhung() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const formIdModalMonHoc = '#exampleModalMonHoc';
    const states = ['MÃ MÔN HỌC', 'TÊN MÔN HỌC', 'SỐ TÍN CHỈ', 'HỌC PHẦN', 'GHI CHÚ'];
    const valueState1 = [{ title: 'Loại học phần' }, { title: 'Học phần bắt buộc' }, { title: 'Học phần tự chọn' }];
    const valueState2 = [{ title: 'Khóa 17' }, { title: 'Khóa 18' }];
    const valueState3 = [
        {
            title: 'Kỹ thuật phần mềm',
        },
        {
            title: 'Hệ thống thông tin',
        },
        {
            title: 'Khoa học máy tính',
        },
        {
            title: 'Khoa học dữ liệu',
        },
        {
            title: 'Công nghệ thông tin',
        },
    ];
    const getData = async () => {
        try {
            let result = await fetch('http://localhost:4000/chuongtrinhkhung/NG01');
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
                name="CHƯƠNG TRÌNH KHUNG"
                state1="Loại học phần"
                state2="Kỹ thuật phần mềm"
                valueState1={valueState1}
                valueState2={valueState2}
                valueState3={valueState3}
                btnAdd
                btnImport
                formId={formIdModalMonHoc}
            />
            <div className={cx('wrapper-table')}>
                <TableCTK states={states} valueData={data} formThongTinMonHoc formId={formIdModalMonHoc} />
            </div>
        </div>
    );
}

export default ChuongTrinhKhung;
