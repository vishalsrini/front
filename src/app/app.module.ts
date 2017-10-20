import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EmailValidator } from '@angular/forms';

// ng2-bootstrap controls import
import { TabsModule } from 'ng2-bootstrap/tabs';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { PopoverModule } from 'ng2-bootstrap/popover';
import { ModalModule } from 'ng2-bootstrap/modal';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { TooltipModule } from 'ng2-bootstrap'; // Importing tooltip from ng2-bootstrap


// ng2-pagination module
import { Ng2PaginationModule } from 'ng2-pagination';

// ng-select module import
import { SelectModule } from 'angular2-select';

// ng2-order module
import { Ng2OrderModule } from 'ng2-order-pipe';

// Service declarations
import { UtilityService } from './service/utility-service.component';

// Utility Components declarations
import { AlertComponentU } from './utility/alert/alert.component';
import { PromptComponent } from './utility/prompt/prompt.component';
import { LoadingComponent } from './utility/loading/loading.component';
import { TableComponentU } from './utility/table/table.component';
import { PaginationComponent } from './utility/pagination/pagination.component';
import { TablePipe } from './utility/pipes/table-pipe.component';
import { FilterPipe } from './utility/pipes/filter.component';
import { TruncatePipe } from './utility/pipes/truncate-pipe.component';
import { PaginationPipePipe } from './utility/pipes/pagination-pipe.component';
import { GraphComponent } from './utility/graph/graph.component';
import { FixedGraphComponent } from './utility/fixed-graph/fixed-graph.component';

// pipes for project
import { SearchCollateralPipe } from './pipes/search-collateral-pipe.component';
import { SearchEligibleCriteriaPipe } from './utility/pipes/search-eligible-criteria.pipe';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';

import { customHttpProvider } from './auth/_helpers/custom-http';
import { AlertComponent } from './auth/_directives/alert.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { AlertService } from './auth/_services/alert.service';
import { AuthenticationService } from './auth/_services/authentication.service';
import { UserService } from './auth/_services/user.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RawOffers } from './raw/offers/raw-offer.component';
import { RawPost } from './raw/posting/raw-posting.component';
import { Requirements } from './dashboard/requirements/req.component';
import { ProcessedView } from './processed/view/processed-view.component';
import { ProcessedPost } from './processed/posting/processed-post.component';
import { ActivateComponent } from './auth/activate/activate.component';
import { ModalImage } from './modal-image/modal-image.component';


import { MainServiceComponent } from './service/main-service.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    RawOffers,
    RawPost,
    Requirements,
    ProcessedView,
    ProcessedPost,
    ActivateComponent,
    ModalImage,

    /** All Utility Components below this **/
    AlertComponentU, // displaying Alert Messages
    LoadingComponent, // For showing common loading screen
    PromptComponent, // For showing prompt messages like 'OK' or 'CANCEL'
    TableComponentU, // Common component used to load tables
    TablePipe, // Pipe to change heading of table
    FilterPipe, // Filter for table
    TruncatePipe, // To truncate last few lines and add ... to its end
    PaginationComponent, // nexan pagination component
    PaginationPipePipe,  
    SearchEligibleCriteriaPipe  // get the data as per the pagination
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'}),
    TabsModule.forRoot(), // For displaying tabs
    PaginationModule.forRoot(), // For pagination
    PopoverModule.forRoot(),
    ModalModule.forRoot(), // For showing modal in bootstrap
    SelectModule, // For multiselect and interactive select options
    Ng2PaginationModule,
    Ng2OrderModule, // For sorting purpose
    BsDropdownModule.forRoot(), // For dropdown
    TooltipModule.forRoot() // For tooltip

  ],
  providers: [
    EmailValidator,
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    MainServiceComponent,
    UtilityService,
    FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
