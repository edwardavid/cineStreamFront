import { Routes } from '@angular/router';

// Importación de componentes
import { HomeComponent } from './pages/home/home.component';
import { HomeCatalogueComponent } from './pages/home/home-catalogue/home-catalogue.component';
import { RentComponent } from './pages/rent/rent.component';
import { MeComponent } from './pages/me/me.component';
import { MyBookingsComponent } from './pages/me/my-bookings/my-bookings.component';
import { MyInfoComponent } from './pages/me/my-info/my-info.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BookingsComponent } from './pages/admin/bookings/bookings.component';
import { CatalogueComponent } from './pages/admin/catalogue/catalogue.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

// Importación de guardas
import { isLoggedInGuard } from './guards/is-logged.guard';
import { isNotLoggedInGuard } from './guards/is-not-logged.guard';

// Importación de nuevos componentes
import { MoviesComponent } from './pages/movie/movie.component';
import { SeriesComponent } from './pages/series/series.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "my-home",
        component: HomeCatalogueComponent,
        canActivate: [isLoggedInGuard],
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [isNotLoggedInGuard]
    },
    {
        path: "signup",
        component: SignupComponent,
        canActivate: [isNotLoggedInGuard]
    },
    { 
        path: "rent/:id",
        component: RentComponent,
        canActivate: [isLoggedInGuard],
    },
    {
        path: "me",
        component: MeComponent,
        canActivate: [isLoggedInGuard],
        children:[
            {
                path: "my-bookings",
                component: MyBookingsComponent
            },
            {
                path: "my-info",
                component: MyInfoComponent
            }
        ]
    },
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [isLoggedInGuard],
        children:[
            {
                path: "bookings",
                component: BookingsComponent
            },
            {
                path: "catalogue",
                component: CatalogueComponent
            },
            {
                path: "users",
                component: UsersComponent
            },
        ]
    },
    {
        path: "catalogue",
        children: [
            {
                path: "movies",
                component: MoviesComponent
            },
            {
                path: "series",
                component: SeriesComponent
            }
        ]
    }
];