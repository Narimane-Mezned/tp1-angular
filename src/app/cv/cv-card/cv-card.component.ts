import { Component, inject, input } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../services/embauche.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-cv-card',
  templateUrl: './cv-card.component.html',
  styleUrls: ['./cv-card.component.css'],
  imports: [RouterLink, DefaultImagePipe],
})
export class CvCardComponent {
  private readonly embaucheService = inject(EmbaucheService);
  private readonly toastr = inject(ToastrService);

  readonly cv = input<Cv | null>(null);

  embaucher(): void {
    const cv = this.cv();
    if (!cv) {
      return;
    }
    const fullName = `${cv.firstname} ${cv.name}`;
    if (this.embaucheService.embauche(cv)) {
      this.toastr.success(`${fullName} a été pré embauché`);
    } else {
      this.toastr.warning(`${fullName} est déjà pré embauché`);
    }
  }
}
