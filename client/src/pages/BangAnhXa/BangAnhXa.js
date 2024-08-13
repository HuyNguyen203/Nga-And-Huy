//libs
import classNames from 'classnames/bind';
import styles from './BangAnhXa.module.scss';
//components
import HeaderContent from '~/Layout/HeaderContent';
import TableBAX from '~/components/Table/TableBAX';
import { useEffect, useState } from 'react';

function BangAnhXa() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const valueState1 = [
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
    const valueState2 = [
        {
            title: 'Học kỳ 1',
        },
        {
            title: 'Học kỳ 2',
        },
        {
            title: 'Học kỳ 3',
        },
        {
            title: 'Học kỳ 4',
        },
        {
            title: 'Học kỳ 5',
        },
        {
            title: 'Học kỳ 6',
        },
        {
            title: 'Học kỳ 7',
        },
        {
            title: 'Học kỳ 8',
        },
        {
            title: 'Học kỳ 9',
        },
    ];

    const states = [
        { sttELO: 'ELOa', pis: ['PI1', 'PI2'] },
        { sttELO: 'ELOb', pis: ['PI1', 'PI2', 'PI3'] },
        { sttELO: 'ELOc', pis: ['PI1', 'PI2', 'PI3', 'PI4'] },
        { sttELO: 'ELOd', pis: ['PI1', 'PI2'] },
        { sttELO: 'ELOe', pis: ['PI1', 'PI2'] },
        { sttELO: 'ELOf', pis: ['PI1', 'PI2'] },
    ];
    const transformData = (inputData) => {
        return inputData.map((item) => {
            const groupedByELO = item.elos.reduce((acc, elo) => {
                // Initialize the ELO group if it doesn't exist
                if (!acc[elo.sttELO]) {
                    acc[elo.sttELO] = { sttELO: elo.sttELO, pis: [] };
                }

                // Find the PI group within the ELO group
                let piGroup = acc[elo.sttELO].pis.find((pi) => pi.sttPI === elo.sttPI);
                if (!piGroup) {
                    piGroup = { sttPI: elo.sttPI, clos: [] };
                    acc[elo.sttELO].pis.push(piGroup);
                }

                // Add CLO to the PI group
                let closGroup = piGroup.clos.find((clos) => clos.level === elo.level);
                if (!closGroup) {
                    closGroup = { sttCLO: [], level: elo.level };
                    piGroup.clos.push(closGroup);
                }
                closGroup.sttCLO.push(elo.sttCLO);

                return acc;
            }, {});

            // Convert grouped data into the desired structure
            const elos = Object.values(groupedByELO);

            return {
                id: item.id,
                tenTiengViet: item.tenMonHocTiengViet,
                tenTiengAnh: item.tenMonHocTiengAnh,
                hocKy: 1, // Assuming hocKy is 1; adjust as needed
                elos: elos.map((elo) => ({
                    sttELO: elo.sttELO,
                    pis: elo.pis.map((pi) => ({
                        sttPI: pi.sttPI,
                        clos: pi.clos.map((clos) => ({
                            sttCLO: [...new Set(clos.sttCLO)], // Remove duplicates
                            level: clos.level,
                        })),
                    })),
                })),
            };
        });
    };
    const getData = async () => {
        try {
            let result = await fetch(`http://localhost:4000/elos/banganhxa`);
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

    const dataBAX = transformData(data);
    return (
        <div className={cx('wrapper')}>
            <HeaderContent name="BẢNG ÁNH XẠ" valueState1={valueState1} valueState2={valueState2} />
            <div className={cx('wrapper-table')}>
                <TableBAX states={states} data={dataBAX} />
            </div>
        </div>
    );
}

export default BangAnhXa;
