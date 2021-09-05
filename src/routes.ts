import {MenuGroup} from './components/pages/ui/navigation/routes';
import Page_one from './components/pages/page_one/page_one';
import Page_two from './components/pages/page_two/page_two';
import Page_theree from './components/pages/page_three/page_three';

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
        defaultPath: '/online/page1',
        items: [
            {
                title: 'Übersicht Online-Daten Page1',
                path: '/online/page1',
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
                title: 'Übersicht Planung Page3',
                path: '/planung/page3',
                icon: 'dashboard_planung',
                licenses: (l) => l.hasModule('inline3.planung.fahrzeugeinsatzplanung') || l.hasModule('inline3.planung.dispo'),
                permissions: (p) => p.hasPermission('plan'),
                component: Page_theree,
            },
        ]
    },
];

export default routes;