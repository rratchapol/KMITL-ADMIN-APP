import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { NewChatComponent } from './modules/admin/chat/chat.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: 'admin/farmmer/list' },

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'admin/farmmer/list',
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.routes'
                    ),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.routes'
                    ),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.routes'
                    ),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.routes'),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.routes'),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.routes'),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.routes'
                    ),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.routes'),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            // Dashboards
            {
                path: 'profile',
                children: [
                    {
                        path: 'page',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/project/project.routes'
                            ),
                    },
                    {
                        path: 'analytics',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/analytics/analytics.routes'
                            ),
                    },
                    {
                        path: 'finance',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/finance/finance.routes'
                            ),
                    },
                    {
                        path: 'crypto',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/crypto/crypto.routes'
                            ),
                    },
                ],
            },

            // 404 & Catch all
            // { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes') },
            { path: '**', redirectTo: '404-not-found' },
            //Sales
            {
                path: 'admin',
                children: [
                    {
                        path: 'farmmer',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/farmmer/farmmer.module'
                                    ).then((m) => m.FarmmerModule),
                            },
                        ],
                    },
                    { path: 'activities', loadChildren: () => import('app/modules/admin/pages/activities/activities.routes') },
                    {
                        path: 'news',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/news/news.module'
                                    ).then((m) => m.NewsModule),
                            },
                        ],
                    },
                    {
                        path: 'journal',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/journal/journal.module'
                                    ).then((m) => m.JournalModule),
                            },
                        ],
                    },
                    {
                        path: 'contractor',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/contractor/contractor.module'
                                    ).then((m) => m.ContractorModule),
                            },
                        ],
                    },
                    {
                        path: 'contractor-type',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/contractor-type/contractor-type.module'
                                    ).then((m) => m.ContractorTypeModule),
                            },
                        ],
                    },

                    {
                        path: 'employee',
                        loadChildren: () =>
                            import('app/modules/admin/employee/page.routes'),
                    },
                    {
                        path: 'chat',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/chat/chat.module'
                                    ).then((m) => m.NewchatModule),
                            },
                        ],
                    },
                    {
                        path: 'confignoti',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/confignoti/confignoti.module'
                                    ).then((m) => m.ConfignotiModule),
                            },
                        ],
                    },
                    {
                        path: 'company',
                        canActivate: [],
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/company/company.module'
                                    ).then((m) => m.CompanyModule),
                            },
                        ],
                    },
                    {
                        path: 'permission',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/permission/permission.module'
                                    ).then((m) => m.PermissionModule),
                            },
                        ],
                    },
                    {
                        path: 'permission',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/permission/permission.module'
                                    ).then((m) => m.PermissionModule),
                            },
                        ],
                    },
                    {
                        path: 'supplier',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/supplier/supplier.module'
                                    ).then((m) => m.SupplierModule),
                            },
                        ],
                    },


                    // Apps
                    {
                        path: 'apps',
                        children: [
                            {
                                path: 'chat',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/apps/chat/chat.routes'
                                    ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
