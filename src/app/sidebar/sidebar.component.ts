import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    { path: 'user', title: 'User Profile',  icon:'ti-user', class: '' },
    { path: 'table', title: 'Raw Cashew',  icon:'ti-view-list-alt', class: '' },
    { path: 'typography', title: 'Processed Cashew',  icon:'ti-text', class: '' },
    // { path: 'icons', title: 'Contact',  icon:'ti-pencil-alt2', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    smallSidebar: Boolean;
    @Output() event : EventEmitter<Boolean> = new EventEmitter<Boolean>();

    constructor(private router: Router) {
        
    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    logout() {
        this.router.navigate(['/login']);
    }

    minimizeSidebar() {
        if(!this.isNotMobileMenu()) {
            this.smallSidebar = !this.smallSidebar;
            this.event.emit(this.smallSidebar);
        }
    }
}
