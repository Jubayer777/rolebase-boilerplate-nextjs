export interface AppRoutes {
    guestRoutes: string[];
    adminRoutes: string[];
    viewingUserRoutes: string[];
    ventureRoutes: string[];
}

export const routes = {
    login: '/login',
    home: '/',
};

const configRoutes: AppRoutes = {
    guestRoutes: [],
    adminRoutes: ['/admin'],
    viewingUserRoutes: [],
    ventureRoutes: [],
};

export default configRoutes;
