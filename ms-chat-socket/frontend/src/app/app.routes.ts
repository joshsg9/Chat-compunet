import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat';

export const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
];
