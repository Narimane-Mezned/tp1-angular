import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
})
export class RainbowDirective {
  @HostBinding('style.color') color = '';
  @HostBinding('style.borderColor') borderColor = '';

  @HostListener('keyup')
  onKeyUp(): void {
    const randomColor = this.generateRandomColor();
    this.color = randomColor;
    this.borderColor = randomColor;
  }

  private generateRandomColor(): string {
    const MAX_COLOR = 0xffffff + 1;
    const randomValue = Math.floor(Math.random() * MAX_COLOR);
    return '#' + randomValue.toString(16).padStart(6, '0');
  }
}
