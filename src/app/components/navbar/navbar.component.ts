import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';
import { APP_ROUTES } from '../../../config/routes.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLinkActive, RouterLink],
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly user = this.authService.user;

  protected logout(): void {
    this.authService.logout();
    this.router.navigate([APP_ROUTES.login]);
    this.toastr.warning(`Au plaisir de vous revoir :(`);
  }
}
