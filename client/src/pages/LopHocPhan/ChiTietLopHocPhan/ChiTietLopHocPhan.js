import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ChiTietLopHocPhan.module.scss';

// Components
import HeaderContent from '~/Layout/HeaderContent';
import DanhSachSinhVien from './DanhSachSinhVien';
import KetQuaDanhGia from './KetQuaDanhGia';

function ChiTietLopHocPhan() {
    const { id } = useParams();
    const cx = classNames.bind(styles);
    const location = useLocation();
    const data = location.state || {};
    const [dataStudent, setDataStudent] = useState([]);
    const [choose, setChoose] = useState(false);
    const [error, setError] = useState(false); // Thêm trạng thái để xử lý lỗi
    const formIdModalDanhSachSV = '#exampleModalDSSV';
    const formIdModalKetQuaDG = '#exampleModalKQDG';

    const valueState1 = [{ title: 'Mã lớp học phần' }];
    const valueState2 = [{ title: 'Tên lớp học phần' }];
    const valueState3 = [{ title: 'Trạng thái' }];

    const callbackFunction = (childChoose) => {
        setChoose(childChoose);
    };

    const getData = async () => {
        try {
            const result = await fetch(`http://localhost:4000/lophocphan/${id}`);
            const dataStudent = await result.json();
            setDataStudent(dataStudent);
        } catch (e) {
            console.log(e);
            setError(true); // Cập nhật trạng thái lỗi nếu có lỗi xảy ra
        }
    };

    useEffect(() => {
        if (id.match(/[^\d]/)) {
            // Kiểm tra id ngay trong useEffect
            setError(true);
        } else {
            getData();
        }
    }, [id]);

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return <div className={cx('error')}>404 Not Found</div>;
    }

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
            {!choose ? <DanhSachSinhVien data={dataStudent} /> : <KetQuaDanhGia datas={dataStudent} />}
        </div>
    );
}

export default ChiTietLopHocPhan;
