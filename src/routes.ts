import {MenuGroup} from './components/pages/ui/navigation/routes';
import Page_one from './components/pages/page_one/page_one';
import Page_two from './components/pages/page_two/page_two';
import Page_theree from './components/pages/page_three/page_three';
import ConatctUs from './components/pages/contact_us/contact_us_page';
import LoginPage from './components/pages/login_page/login_page';
import RegisterPage from './components/pages/login_page/register_page';
import ForgotPasswordPage from './components/pages/login_page/forgot_password_page';

import UsersPage from './components/pages/admin_page/users_page';
import CategoriesPage from './components/pages/admin_page/categories_page';
import ProductsPage from './components/pages/admin_page/products_page';


/**
 * Routen-Definition der Anwendung.
 * Diese Definition wird genutzt um die Routen anzulegen, das Menü zu füllen und kann auch an anderen Stellen genutzt
 * werden um Menüstrukturen zu erstellen.
 */
const routes: ReadonlyArray<MenuGroup> = [
    {
        titleI18n: 'menu.module_online.online_data',
        icon: 'live',
        path: '/online',
        defaultPath: '/online/home',
        items: [
            {
                title: 'Home',
                path: '/online/home',
                icon: 'dashboard_online',
                licenses: (l) => {return true;},
                permissions: (p) => {return true;},
                component: Page_one,
            },
            {
                titleI18n: 'menu.module_online.abfahrtstafeln Page2',
                path: '/online/page2',
                icon: 'abfahrt',
                licenses: (l) => {return true;},
                permissions: (p) => {return true;},
                component: Page_two,
            },
        ],
    },
    {
        titleI18n: 'menu.module_planung.planung',
        icon: 'planung_balken',
        path: '/planung',
        defaultPath: '/planung/page3',
        items: [
            {
                title: 'Page3',
                path: '/planung/page3',
                icon: 'dashboard_planung',
                licenses: (l) => l.hasModule('inline3.planung.fahrzeugeinsatzplanung') || l.hasModule('inline3.planung.dispo'),
                permissions: (p) => p.hasPermission('plan'),
                component: Page_theree,
            },
        ]
    },
    {
        titleI18n: 'ContactUs',
        icon: 'ContactUs_icon',
        path: '/contactUs',
        defaultPath: '/contactUs/contact_us',
        items: [
            {
                title: 'ContactUs',
                path: '/contactUs/contact_us',
                icon: 'ContactUs_icon',
                licenses: (l) => l.hasModule('inline3.planung.fahrzeugeinsatzplanung') || l.hasModule('inline3.planung.dispo'),
                permissions: (p) => p.hasPermission('plan'),
                component: ConatctUs,
                display_btn: false,
            },
        ]
    },
    {
        titleI18n: 'Login',
        icon: 'LogIn_icon',
        path: '/logIn',
        defaultPath: '/logIn/logIn',
        items: [
            {
                title: 'Login',
                path: '/logIn/logIn',
                icon: 'LogIn_icon',
                component: LoginPage,
                display_btn: false,
            },
            {
                title: 'Register',
                path: '/logIn/RegisterPage',
                icon: 'RegisterPage_icon',
                component: RegisterPage,
                display_btn: false,
            },
            {
                title: 'ForgotPassword',
                path: '/logIn/ForgotPasswordPage',
                icon: 'ForgotPasswordPage_icon',
                component: ForgotPasswordPage,
                display_btn: false,
            }
        ]
    },
    {
        titleI18n: 'Admin',
        icon: 'Admin_icon',
        path: '/admin',
        defaultPath: '/admin/administrator',
        items: [
            {
                title: 'Users',
                path: '/admin/administrator',
                icon: 'admin_icon',
                component: UsersPage,
                display_btn: true,
                children: [
                    {
                        titleI18n: 'Admin',
                        path: '/admin/administrator/:filename_page',
                        component: UsersPage,

                    },
                    {
                        titleI18n: 'Categories',
                        path: '/admin/administrator/:filename_page',
                        component: CategoriesPage,
                    },
                    {
                        titleI18n: 'Products',
                        path: '/admin/administrator/:filename_page',
                        component: ProductsPage,
                    },
                ],
            },
        ]
    }
];

export default routes;
