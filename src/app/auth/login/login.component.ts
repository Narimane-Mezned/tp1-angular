import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { APP_ROUTES } from '../../../config/routes.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  login(credentials: CredentialsDto): void {
    this.authService.login(credentials).subscribe({
      next: () => {
        this.toastr.success(`Bienvenu chez vous :)`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error('Veuillez vérifier vos credentials');
      },
    });
  }
}
