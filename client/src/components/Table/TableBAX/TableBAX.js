//libs
import classNames from 'classnames/bind';
import styles from './TableBAX.module.scss';
//components
function TableBAX({ states, data }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-table')}>
                <table className={cx('table', 'custom-table')}>
                    <thead>
                        <tr>
                            <th rowSpan="2" className={cx('sticky-column-1')}>
                                STT
                            </th>
                            <th rowSpan="2" className={cx('sticky-column-2')}>
                                Tên môn học
                            </th>
                            <th rowSpan="2" className={cx('sticky-column-3')}>
                                Tên môn tiếng Anh
                            </th>
                            {states.map((elo, index) => (
                                <th key={index} colSpan={elo.pis.length}>
                                    {elo.sttELO}
                                </th>
                            ))}
                            <th rowSpan="2">Học kì</th>
                        </tr>
                        <tr>{states.map((elo) => elo.pis.map((pi, index) => <th key={index}>{pi}</th>))}</tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td className={cx('sticky-column-1')}>{index + 1}</td>
                                <td className={cx('sticky-column-2')}>{item.tenTiengViet}</td>
                                <td className={cx('sticky-column-3')}>{item.tenTiengAnh}</td>
                                {states.map((elo) =>
                                    elo.pis.map((pi) => {
                                        const currentELO = item.elos.find((e) => e.sttELO === elo.sttELO);
                                        if (currentELO) {
                                            const currentPI = currentELO.pis.find((p) => p.sttPI === pi);
                                            if (currentPI) {
                                                return (
                                                    <td key={pi}>
                                                        {currentPI.clos
                                                            .map((clo) => `${clo.sttCLO.join(',')}_${clo.level}`)
                                                            .join('; ')}
                                                    </td>
                                                );
                                            }
                                        }
                                        return <td key={pi}></td>;
                                    }),
                                )}
                                <td>{item.hocKy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableBAX;
