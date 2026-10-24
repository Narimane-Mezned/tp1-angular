import { Component, inject, input } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { NgStyle } from '@angular/common';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  imports: [NgStyle, DefaultImagePipe],
})
export class ItemComponent {
  private readonly cvService = inject(CvService);

  readonly cv = input.required<Cv>();
  readonly size = input(50);

  onSelectCv(): void {
    this.cvService.selectCv(this.cv());
  }
}
