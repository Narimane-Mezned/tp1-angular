import { Injectable, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  readonly #embauchees = signal<Cv[]>([]);
  readonly embauchees = this.#embauchees.asReadonly();

  embauche(cv: Cv): boolean {
    if (this.#embauchees().some((embauchee) => embauchee.id === cv.id)) {
      return false;
    }
    this.#embauchees.update((embauchees) => [...embauchees, cv]);
    return true;
  }
}
