import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { SideBarComponent } from './side-bar/side-bar.component'
import { UserListComponent } from './user-list/user-list.component'
import { AgendaComponent } from './agenda/agenda.component'
import { UserService } from './user.service'
import { NavComponent } from './nav/nav.component'
import { ChatComponent } from './chat/chat.component'
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LibraryComponent } from './library/library.component'
import { LibraryService } from './library.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookComponent } from './book/book.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'library', component: LibraryComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    UserListComponent,
    AgendaComponent,
    NavComponent,
    ChatComponent,
    UsersComponent,
    NotFoundComponent,
    HomeComponent,
    UserDetailsComponent,
    LibraryComponent,
    BookDetailsComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { 
        // enableTracing: true, // <-- debugging purposes only
        // useHash: true
      }
    )
  ],
  providers: [UserService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
