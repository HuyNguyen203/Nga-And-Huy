//libs
import classNames from 'classnames/bind';
import styles from './ChiTietLopHocPhan.module.scss';
import HeaderContent from '~/Layout/HeaderContent';
import { useEffect, useState } from 'react';

//component
import DanhSachSinhVien from './DanhSachSinhVien';
import KetQuaDanhGia from './KetQuaDanhGia';
import { useLocation, useParams } from 'react-router-dom';

function ChiTietLopHocPhan() {
    const { id } = useParams();

    const cx = classNames.bind(styles);
    const location = useLocation();
    const data = location.state || {};
    const [dataStudent, setDataStudent] = useState([]);
    const [choose, setChoose] = useState(false);
    const formIdModalDanhSachSV = '#exampleModalDSSV';
    const formIdModalKetQuaDG = '#exampleModalKQDG';

    if (id.match(/[^\d]/)) {
        return <div className={cx('error')}>404 Not Found</div>;
    }

    const valueState1 = [
        {
            title: 'Mã lớp học phần',
        },
    ];
    const valueState2 = [
        {
            title: 'Tên lớp học phần',
        },
    ];
    const valueState3 = [
        {
            title: 'Trạng thái',
        },
    ];

    const callbackFunction = (childChoose) => {
        setChoose(childChoose);
    };

    const getData = async () => {
        try {
            let result = await fetch(`http://localhost:4000/lophocphan/${id}`);
            const dataStudent = await result.json();

            setDataStudent(dataStudent);
            return dataStudent;
        } catch (e) {
            console.log(e);
        }
    };

    const datas = [
        {
            mssv: id,
            hoTen: 'Nguyễn Thị Nga',
            ngaySinh: '20/09/2003',
            lopDanhNghia: 'DHKTPM17B',
            clos: [4, 4, 4, 4],
            trangThai: 'Còn học',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <HeaderContent
                name={'LỚP HỌC PHẦN - ' + data.thongTinMonHoc.tenMonHocTiengViet + ' (' + data.maLopHocPhan + ')'}
                valueState1={valueState1}
                valueState2={valueState2}
                valueState3={valueState3}
                btnAdd
                btnImport
                listStudentResultBtn
                parentCallback={callbackFunction}
                formId={choose ? formIdModalKetQuaDG : formIdModalDanhSachSV}
            />
            {!choose ? <DanhSachSinhVien data={datas} /> : <KetQuaDanhGia datas={datas} />}
        </div>
    );
}

export default ChiTietLopHocPhan;
