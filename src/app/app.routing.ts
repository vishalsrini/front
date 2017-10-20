import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RawOffers } from './raw/offers/raw-offer.component';
import { ProcessedView } from './processed/view/processed-view.component';
import { ActivateComponent } from './auth/activate/activate.component';


import { AuthGuard } from './auth/_guards/auth.guard';


export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent, 
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        component: UserComponent, 
        canActivate: [AuthGuard]
    },
    {
        path: 'raw',
        component: RawOffers, 
        canActivate: [AuthGuard]
    },
    {
        path: 'processed',
        component: ProcessedView, 
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'icons',
    //     component: IconsComponent, 
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'maps',
    //     component: MapsComponent, 
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'notifications',
    //     component: NotificationsComponent, 
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'upgrade',
    //     component: UpgradeComponent, 
    //     canActivate: [AuthGuard]
    // },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'register', 
        component: RegisterComponent 
    },
    {
        path: 'activate/:id',
        component: ActivateComponent
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
]
