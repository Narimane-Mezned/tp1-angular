import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, switchMap } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
  imports: [DefaultImagePipe],
})
export class DetailsCvComponent {
  private readonly cvService = inject(CvService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  readonly authService = inject(AuthService);

  protected readonly cv = toSignal(
    this.activatedRoute.params.pipe(
      switchMap((params) =>
        this.cvService.getCvById(+params['id']).pipe(
          catchError(() => {
            this.router.navigate([APP_ROUTES.cv]);
            return EMPTY;
          }),
        ),
      ),
    ),
    { initialValue: null },
  );

  deleteCv(cv: Cv): void {
    this.cvService
      .deleteCvById(cv.id)
      .pipe(
        catchError(() => {
          this.toastr.error(
            `Problème avec le serveur veuillez contacter l'admin`,
          );
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      });
  }
}
