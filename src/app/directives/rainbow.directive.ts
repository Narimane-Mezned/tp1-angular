import { Directive, signal } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  host: {
    '[style.color]': 'color()',
    '[style.borderColor]': 'color()',
    '(keyup)': 'changeColor()',
  },
})
export class RainbowDirective {
  protected readonly color = signal('');

  protected changeColor(): void {
    this.color.set(this.generateRandomColor());
  }

  private generateRandomColor(): string {
    const MAX_COLOR = 0xffffff + 1;
    const randomValue = Math.floor(Math.random() * MAX_COLOR);
    return '#' + randomValue.toString(16).padStart(6, '0');
  }
}
