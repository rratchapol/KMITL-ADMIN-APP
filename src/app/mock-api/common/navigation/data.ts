/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     id: 'admin.farmmer',
    //     title: 'เกษตรกร',
    //     type: 'basic',
    //     icon: 'heroicons_outline:sun',
    //     link: '/admin/farmmer/list',
    // },
    {
        id: 'admin.faq',
        title: 'ผู้ใช้งาน',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/admin/faq/list',
    },
    // {
    //     id: 'admin.journal',
    //     title: 'หมวดหมู่',
    //     type: 'basic',
    //     icon: 'heroicons_outline:clipboard-document-list',
    //     link: '/admin/journal/list',
    // },
    {
        id: 'admin.news',
        title: 'สินค้า',
        type: 'collapsable',
        icon: 'heroicons_outline:newspaper',
        // link: '/admin/news/list',
        children: [
            {
                id: 'admin.contractor',
                title: 'รายการสินค้า',
                type: 'basic',
                // icon: 'heroicons_outline:newspaper',
                link: '/admin/news/list',
            },
            {
                id: 'admin.contractor-type',
                title: 'รายการสินค้าที่รอตรวจสอบ',
                type: 'basic',
                // icon: 'heroicons_outline:newspaper',
                link: '/admin/news/check',
            },
        ],
    },
    {
        id: 'admin.user',
        title: 'โพสต์',
        type: 'collapsable',
        icon: 'heroicons_outline:pencil-square',
        children: [
            {
                id: 'admin.contractor',
                title: 'รายการโพสต์',
                type: 'basic',
                // icon: 'heroicons_outline:newspaper',
                link: '/admin/employee/list',
            },
            {
                id: 'admin.contractor-type',
                title: 'รายการโพสต์ที่รอตรวจสอบ',
                type: 'basic',
                // icon: 'heroicons_outline:newspaper',
                link: '/admin/employee/check',
            },
        ],
    },
    {
        id: 'admin.journal',
        title: 'admin',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/admin/journal/list',
    },
    {
        id: 'admin.chat',
        title: 'Tags',
        type: 'basic',
        icon: 'heroicons_outline:chat-bubble-left-right',
        link: '/admin/company/list',
    },
    {
        id: 'admin.chat',
        title: 'แบน',
        type: 'basic',
        icon: 'heroicons_outline:chat-bubble-left-right',
        link: '/admin/company/list',
    },
    {
        id: 'admin.chat',
        title: 'รีพอร์ต',
        type: 'basic',
        icon: 'heroicons_outline:chat-bubble-left-right',
        link: '/admin/company/list',
    },
    // {
    //     id: 'admin.chat',
    //     title: 'ตั้งค่าระบบ',
    //     icon: 'heroicons_outline:pencil-square',
    //     type: 'collapsable',
    //     children: [
    //         {
    //             id: 'admin.chat',
    //             title: 'แจ้งเตือน',
    //             type: 'basic',
    //             link: '/admin/confignoti',
    //         },
    //         {
    //             id: 'admin.chat',
    //             title: 'PDPA',
    //             type: 'basic',
    //             link: '/admin/pdpa/list',
    //         },
    //         {
    //             id: 'admin.contractor-type',
    //             title: 'จัดการข้อมูลโรงงาน',
    //             type: 'basic',
    //             link: '/admin/company/list',
    //         },
    //         {
    //             id: 'admin.contractor',
    //             title: 'จัดการข้อมูลบริษัท',
    //             type: 'basic',
    //             link: '/admin/company/detail',
    //         },
    //         {
    //             id: 'admin.user',
    //             title: 'จัดการผู้ใช้งาน',
    //             type: 'basic',
    //             link: '/admin/employee/list',
    //         },
    //     ],
    // },


    // {
    //     id: 'admin.user',
    //     title: 'ข้อมูลบริษัท',
    //     type: 'collapsable',
    //     icon: 'heroicons_outline:pencil-square',
    //     children: [

    //     ],
    // },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'heroicons_outline:qr-code',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        tooltip: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group',
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'แดชบอร์ด',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id: 'apps',
    //     title: 'Apps',
    //     type: 'group',
    //     icon: 'heroicons_outline:qr-code',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id: 'pages',
    //     title: 'Pages',
    //     type: 'group',
    //     icon: 'heroicons_outline:document-duplicate',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id: 'user-interface',
    //     title: 'UI',
    //     type: 'group',
    //     icon: 'heroicons_outline:rectangle-stack',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id: 'navigation-features',
    //     title: 'Misc',
    //     type: 'group',
    //     icon: 'heroicons_outline:bars-3',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id: 'purchase',
        title: 'ซื้อ',
        type: 'group',
        icon: 'heroicons_outline:inbox-arrow-down',
        children: [],
    },
    {
        id: 'sale',
        title: 'ขาย',
        type: 'group',
        icon: 'heroicons_outline:shopping-cart',
        children: [],
    },
    {
        id: 'inventory',
        title: 'คลังสินค้า',
        type: 'group',
        icon: 'heroicons_outline:cube',
        children: [],
    },
    {
        id: 'accounting',
        title: 'บัญชี/การเงิน',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [],
    },
    {
        id: 'delivery-workers',
        title: 'คนส่งของ',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [],
    },
    {
        id: 'admin',
        title: 'จัดการพนักงาน',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [],
    },
    {
        id: 'reports',
        title: 'รายงาน',
        type: 'group',
        icon: 'heroicons_outline:clipboard-document-list',
        children: [],
    },
];
