import {Route} from "@angular/router";
import {SurahListComponent} from "./surah-list/surah-list.component";
import {ContemplationListComponent} from "./contemplation-list/contemplation-list.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./services/auth-guard.service";

export const routerConfig: Route[] =
  [
    {
      path: '',
      redirectTo : 'surahs',
      pathMatch : 'full'
    },

    {
        path: 'surahs',
        component: SurahListComponent,
        canActivate : [AuthGuard]
    },
    {
      path: 'contemplations',
      children: [
        {
          path: ':id',
          component: ContemplationListComponent,
          canActivate : [AuthGuard]
        },
        {
          path : '',
          component : SurahListComponent,
          canActivate : [AuthGuard]
        }
      ]
    },
    {
      path: 'login',
      component : LoginComponent
    }

  ];
