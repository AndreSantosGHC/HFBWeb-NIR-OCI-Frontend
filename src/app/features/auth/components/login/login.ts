import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';

import { environments } from 'src/environments/environments';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule, AppFloatingConfigurator],
    providers: [MessageService],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {
    login: string = '';
    senha: string = '';
    checked: boolean = false;

    constructor(
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService
    ) {}

    //TODO: Melhorar esse processamento de resposta de erro, incluindo no servidor padronziar as mensagens
    async entrar() {
        try {
            const res: any = await this.http.post(`${environments.apiUrl}/auth/login`, { username: this.login, password: this.senha }).toPromise();
            localStorage.setItem('auth_token', res.token);
            this.router.navigate(['/']);
        } catch (err) {

            const result = err as HttpErrorResponse;

            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao fazer login: ' + result.error.message
            });

            console.error('Login falhou', err);
        }
    }
}
