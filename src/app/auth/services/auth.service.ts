import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ConnectedUser } from '../model/connected-user';
import { API } from '../../../config/api.config';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly #user = signal<ConnectedUser | null>(this.restoreUser());
  readonly user = this.#user.asReadonly();
  readonly isAuthenticated = computed(() => this.#user() !== null);

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) =>
        this.saveUser({
          id: response.userId,
          email: credentials.email,
          token: response.id,
        }),
      ),
    );
  }

  logout(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#user.set(null);
  }

  private saveUser(user: ConnectedUser): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    this.#user.set(user);
  }

  private restoreUser(): ConnectedUser | null {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) {
      return null;
    }
    try {
      return JSON.parse(storedUser) as ConnectedUser;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  }
}
