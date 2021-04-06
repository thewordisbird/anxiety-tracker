import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleNav = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onToggleNav = () => {
    this.toggleNav.emit()
  }

  onLogout = () => {
    this.authService.signOut()
  }
}
