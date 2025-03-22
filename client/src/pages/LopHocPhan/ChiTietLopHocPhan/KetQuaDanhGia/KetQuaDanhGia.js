//libs
import classNames from 'classnames/bind';
import styles from './KetQuaDanhGia.module.scss';

//components
import Table from '~/components/Table';

function KetQuaDanhGia({ datas }) {
    const cx = classNames.bind(styles);
    const formIdModalKetQuaDG = '#exampleModalKQDG';

    const stateTable = ['MSSV', 'HỌ VÀ TÊN', 'CLO1', 'CLO2', 'CLO3', 'CLO4', 'TRẠNG THÁI', ''];

    const transformedDatas = datas?.map((data) => {
        // Extract clo fields from the clos array
        const cloFields = data.clos.reduce((acc, clo, index) => {
            acc[`clo${index + 1}`] = clo;
            return acc;
        }, {});

        // Return the transformed object with the desired order
        return {
            mssv: data.mssv,
            hoTen: data.hoTen,
            ...cloFields,
            trangThai: data.trangThai,
        };
    });

    return (
        <div className={cx('wrapper')}>
            <Table
                states={stateTable}
                valueData={transformedDatas}
                formKetQuaDanhGia
                edit
                formId={formIdModalKetQuaDG}
            />
        </div>
    );
}

export default KetQuaDanhGia;
