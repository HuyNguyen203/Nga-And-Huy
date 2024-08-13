//libs
import classNames from 'classnames/bind';
import styles from './BoMon.module.scss';
import { useEffect, useState } from 'react';

//components
import HeaderContent from '~/Layout/HeaderContent';
import Table from '~/components/Table';

function BoMon() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const formIdModalBoMon = '#exampleModalBoMon';
    const states = ['MÃ BỘ MÔN', 'TÊN BỘ MÔN', 'TRƯỞNG BỘ MÔN', 'PHÓ BỘ MÔN', 'TRẠNG THÁI', ''];
    const valueState1 = [
        {
            title: 'Mã CN',
        },
    ];
    const valueState2 = [
        {
            title: 'Chuyên ngành',
        },
    ];
    const valueState3 = [
        {
            title: 'Trạng thái',
        },
    ];

    const getData = async () => {
        try {
            let result = await fetch('http://localhost:4000/bomon');
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

    // const data = [
    // {
    // maBoMon: 'CN0001',
    // tenBoMon: 'Kỹ thuật phần mềm',
    // truongBoMon: 'TS.Nguyễn Thị Hạnh',
    // phoBoMon: 'ThS.Đặng Thị Thu Hà',
    // trangThai: 'Hoạt động',
    // },
    // {
    // maBoMon: 'CN0002',
    // tenBoMon: 'Công nghệ thông tin',
    // truongBoMon: 'TS.Tạ Duy Công Chiến',
    // phoBoMon: 'ThS.NCS.Võ Công Minh',
    // trangThai: 'Hoạt động',
    // },
    //
    // {
    // maBoMon: 'CN0003',
    // tenBoMon: 'Khoa học máy tính',
    // truongBoMon: 'TS.Hồ Đắc Quán',
    // phoBoMon: 'ThS.Đặng Thị Phúc',
    // trangThai: 'Hoạt động',
    // },
    //
    // {
    // maBoMon: 'CN0004',
    // tenBoMon: 'Khoa học dữ liệu',
    // truongBoMon: 'TS.Nguyễn Chí Kiên',
    // phoBoMon: 'ThS.Nguyễn Hữu Tình',
    // trangThai: 'Hoạt động',
    // },
    //
    // {
    // maBoMon: 'CN0005',
    // tenBoMon: 'Hệ thống thông tin',
    // truongBoMon: 'TS.Ngô Hữu Dũng',
    // phoBoMon: 'ThS.Trần Thị Kim Chi',
    // trangThai: 'Hoạt động',
    // },
    // ];
    return (
        <div className={cx('wrapper')}>
            <HeaderContent
                name="THÔNG TIN BỘ MÔN"
                valueState1={valueState1}
                valueState2={valueState2}
                valueState3={valueState3}
                btnAdd
                formId={formIdModalBoMon}
            />
            <div className={cx('wrapper-table')}>
                <Table states={states} valueData={data} edit formThongTinBoMon formId={formIdModalBoMon} />
            </div>
        </div>
    );
}

export default BoMon;
