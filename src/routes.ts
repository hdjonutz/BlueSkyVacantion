import {MenuGroup} from './components/ui/navigation/routes';
// import Page_one from './components/pages/page_one/page_one';
// import Page_two from './components/pages/page_two/page_two';
// import Page_theree from './components/pages/page_three/page_three';
// import ConatctUs from './components/pages/contact_us/contact_us_page';
// import LoginPage from './components/pages/login_page/login_page';
// import RegisterPage from './components/pages/login_page/register_page';
// import ForgotPasswordPage from './components/pages/login_page/forgot_password_page';

import UsersPage from './components/pages/Administrator/Admin';
import TablesPage from './components/pages/Administrator/Tables';
import OrdersPage from './components/pages/Administrator/orders_page';
// import CategoriesPage from './components/pages/Administrator/categories_page';
import ProductsAdminPage from './components/pages/Administrator/products_page';
import JsonViewerPage from './components/pages/Administrator/json_viewer_page';
import GanttPage from './components/pages/Administrator/gantt/gantt_page';
import PdfVertragPage from './components/pages/Administrator/pdf_vertrag_page';

import HomePage from './components/pages/Home/HomePage';
import ProductsPage from './components/pages/Products/ProductsPage';
import SignInPage from './components/pages/SignIn/SignIn';
import SignUpPage from './components/pages/SignUp/SignUp';
import ContactUsPage from './components/pages/ContactUs/ContactUs';

import CheckoutPage from './components/pages/checkout/Checkout';
import TestTablePage from './components/pages/Administrator/test_table_page';
import PricesPage from './components/pages/Administrator/prices_page';
import FormsPage from './components/pages/Administrator/forms_admin_table';


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
                licenses: (l: any) => {return true;},
                permissions: (p: any) => {return true;},
                component: HomePage,
                display_btn: false,
                children: [
                    {
                        title: 'Products',
                        path: '/online/home/:products',
                        component: ProductsPage,
                    },
                    {
                        title: 'ProductDetails',
                        path: '/online/home/products/:product_detail',
                        component: ProductsPage,
                    }
                    /*{
                        title: 'ProductDetails',
                        path: '/online/home/:products/:product_detail',
                        component: UsersPage,
                    }*/

                ]
            },
        ],
    },
    {
        title: 'ContactUs',
        icon: 'ContactUs_icon',
        path: '/contactUs',
        defaultPath: '/contactUs/contact_us',
        items: [
            {
                title: 'ContactUs',
                path: '/contactUs/contact_us',
                icon: 'ContactUs_icon',
                licenses: (l: any) => l.hasModule('inline3.planung.fahrzeugeinsatzplanung') || l.hasModule('inline3.planung.dispo'),
                permissions: (p: any) => p.hasPermission('plan'),
                component: ContactUsPage,
                display_btn: false,
            },
        ]
    },
    {
        title: 'Prices',
        icon: 'Prices_icon',
        path: '/prices',
        defaultPath: '/prices/prices',
        items: [
            {
                title: 'Prices',
                path: '/prices/prices',
                icon: 'Prices_icon',
                // licenses: (l: any) => l.hasModule('inline3.planung.fahrzeugeinsatzplanung') || l.hasModule('inline3.planung.dispo'),
                // permissions: (p: any) => p.hasPermission('plan'),
                component: PricesPage,
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
                component: SignInPage,
                display_btn: false,
            },
            {
                title: 'Register',
                path: '/logIn/RegisterPage',
                icon: 'RegisterPage_icon',
                component: SignUpPage,
                display_btn: false,
            },
            {
                title: 'ForgotPassword',
                path: '/logIn/ForgotPasswordPage',
                icon: 'ForgotPasswordPage_icon',
                component: SignInPage,
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
                path: '/admin/administrator/',
                icon: 'admin_icon',
                component: UsersPage,
                display_btn: false,
                children: [
                    {
                        titleI18n: 'Admin',
                        path: '/admin/administrator/:filename_page',
                        component: UsersPage,

                    },
                    {
                        titleI18n: 'Admin2',
                        path: '/admin/administrator/:filename_page',
                        component: TablesPage,

                    },
                    {
                        titleI18n: 'Orders-Contracts',
                        path: '/admin/administrator/:filename_page',
                        component: OrdersPage,
                    },
                    // {
                    //     titleI18n: 'Categories',
                    //     path: '/admin/administrator/:filename_page',
                    //     component: CategoriesPage,
                    // },
                    {
                        titleI18n: 'Products',
                        path: '/admin/administrator/:filename_page',
                        component: ProductsAdminPage,
                    },
                    {
                        titleI18n: 'JsonConfig',
                        path: '/admin/administrator/:filename_page',
                        component: JsonViewerPage,
                    },
                    {
                        titleI18n: 'Gantt',
                        path: '/admin/administrator/:filename_page',
                        component: GanttPage,
                    },
                    {
                        titleI18n: 'PdfVertrag',
                        path: '/admin/administrator/:filename_page',
                        component: PdfVertragPage,
                    },
                    {
                        titleI18n: 'TestTable',
                        path: '/admin/administrator/:filename_page',
                        component: TestTablePage,
                    },
                    {
                        titleI18n: 'FormsPage',
                        path: '/admin/administrator/:filename_page',
                        component: FormsPage,
                    }
                ],
            },
        ]
    },
    {
        titleI18n: 'ShoppingCart',
        icon: 'ShoppingCart_icon',
        path: '/shoppingCart',
        defaultPath: '/shoppingCart',
        items: [
            {
                title: 'ShoppingCart',
                path: '/shoppingCart/checkout',
                icon: 'ShoppingCart_icon',
                component: CheckoutPage,
                display_btn: false,
            },
        ]
    }

];

export default routes;
