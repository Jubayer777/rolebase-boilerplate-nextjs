import configRoutes, { routes } from './configureRotes';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Role } from '@/redux/auth/authSlice';
export interface RouteControlProps {
    children: any;
}

export default function RouteControl(props: RouteControlProps) {
    const router = useRouter();
    const auth = useSelector((state: any) => state.auth);
    if (configRoutes.adminRoutes.includes(router.pathname)){
        if (auth.loggedInToken && auth.loggedInUser.roles[0].title === Role.ADMIN) {
            return props.children;
        }
        else router.push(routes.login);
    }
    else if (router.pathname === routes.home && auth.loggedInUser.roles[0].title !== Role.ADMIN) {
        router.push(routes.login);
    }
    else if (router.pathname === routes.login && auth.loggedInUser.roles[0].title === Role.ADMIN) {
        router.replace(routes.home);
    }
    return props.children;
}
