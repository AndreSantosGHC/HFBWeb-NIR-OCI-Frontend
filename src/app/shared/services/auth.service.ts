// src/app/services/auth.service.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

interface User {
  id: string;
  login: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenKey = 'auth_token';

    constructor(private messageService: MessageService) {}

    login(token: string) {
        localStorage.setItem(this.tokenKey, token);
        localStorage.removeItem('user');
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getCurrentUser(): User | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const decoded: any = jwtDecode(token);
            return {
                id: decoded.id,
                login: decoded.username || decoded.login,
                email: decoded.email
            };
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return null;
        }
    }

    logoutOnTokenExpired(): void {
        console.log('🔴 Token expirado - fazendo logout automático');

        this.logout();

        this.messageService.add({
            key: 'token-expired',
            severity: 'warn',
            summary: 'Sessão Expirada',
            detail: 'Sua sessão expirou. Por favor, faça login novamente.',
            sticky: true,
            life: 10000 // 10 segundos
        });
    }

    handleAuthError(error: HttpErrorResponse): void {
        const errorResponse = error.error;

        switch (errorResponse?.code) {
            case 'TOKEN_EXPIRED':
                this.logoutOnTokenExpired(); // ← Chama o método do AuthService
                break;

            case 'NO_TOKEN':
                this.logout(); // ← Limpa sem mostrar popup
                break;

            case 'INVALID_TOKEN':
            case 'MALFORMED_TOKEN':
                this.logout(); // ← Limpa sem mostrar popup
                break;

            default:
                this.logout(); // ← Limpa sem mostrar popup
        }
    }
}
