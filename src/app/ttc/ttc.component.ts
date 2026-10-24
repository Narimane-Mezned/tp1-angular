import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

const DISCOUNTS = [
  { minQuantity: 16, rate: 0.3 },
  { minQuantity: 11, rate: 0.2 },
];

@Component({
  selector: 'app-ttc',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TtcComponent {
  protected readonly price = signal(0);
  protected readonly quantity = signal(1);
  protected readonly tva = signal(18);

  protected readonly unitPriceTtc = computed(
    () => this.price() * (1 + this.tva() / 100),
  );

  protected readonly discountRate = computed(
    () =>
      DISCOUNTS.find((discount) => this.quantity() >= discount.minQuantity)
        ?.rate ?? 0,
  );

  protected readonly totalBeforeDiscount = computed(
    () => this.unitPriceTtc() * this.quantity(),
  );

  protected readonly discount = computed(
    () => this.totalBeforeDiscount() * this.discountRate(),
  );

  protected readonly totalTtc = computed(
    () => this.totalBeforeDiscount() - this.discount(),
  );
}
