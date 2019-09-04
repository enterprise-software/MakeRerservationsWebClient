import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [{path: 'hotellist', component: HotelListComponent},
                        {path: 'search', component: SearchComponent},
                        {path: 'admin', component: AdminComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
