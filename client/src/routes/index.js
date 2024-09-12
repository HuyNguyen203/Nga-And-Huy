import config from '~/config';
//Pages
import BangAnhXa from '~/pages/BangAnhXa';
import ChuongTrinhKhung from '~/pages/ChuongTrinhKhung';
import CLOs from '~/pages/CLOs';
import ELOsPIs from '~/pages/ELOsPIs';
import GiangVien from '~/pages/GiangVien';
import LopHocPhan from '~/pages/LopHocPhan';
import ChuanDauRa from '~/pages/ChuanDauRa';
import BoMon from '~/pages/BoMon';
import ChiTietLopHocPhan from '~/pages/LopHocPhan/ChiTietLopHocPhan';
import Login from '~/pages/Login';
import Layout from '~/Layout';
import Roles from '~/pages/Roles';
import Users from '~/pages/Users';

//public routes
const publicRoutes = [
    { path: config.routes.home, component: Login, layout: null },
    { path: config.routes.banganhxa, component: BangAnhXa },
    { path: config.routes.chuongtrinhkhung, component: ChuongTrinhKhung },
    { path: config.routes.clos, component: CLOs },
    { path: config.routes.elospis, component: ELOsPIs },
    { path: config.routes.giangvien, component: GiangVien },
    { path: config.routes.lophocphan, component: LopHocPhan },
    { path: config.routes.chuandaura, component: ChuanDauRa },
    { path: config.routes.bomon, component: BoMon },
    { path: config.routes.chitiethocphanID, component: ChiTietLopHocPhan },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.roles, component: Roles, layout: null },
    { path: config.routes.users, component: Users, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
