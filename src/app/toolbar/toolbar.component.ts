import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() toggleNav = new EventEmitter();

  constructor(private authService: AuthService) { }

  user = this.authService.user;

  onToggleNav = () => {
    this.toggleNav.emit()
  }

  onLogout = () => {
    this.authService.signOut()
  }
}
