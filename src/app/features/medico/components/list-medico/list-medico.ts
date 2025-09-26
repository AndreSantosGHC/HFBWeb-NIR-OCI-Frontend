import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { MedicoService } from '../../services/medico.service';

@Component({
    selector: 'app-listagem-medico',
    templateUrl: './list-medico.html',
    styleUrls: ['./list-medico.scss'],
    standalone: true,
    imports: [CardModule, CommonModule, ConfirmDialogModule, ToastModule, TagModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListagemMedicoComponent implements OnInit {
    columns = [
        { field: 'nome', header: 'Nome', width: '20%', filterType: 'text', filterable: true },
        { field: 'cns', header: 'CNS', width: '15%', filterType: 'text', filterable: true },
        { field: 'cbo', header: 'CBO', width: '10%', filterType: 'text', filterable: true },
        { field: 'SUS', header: 'SUS', width: '10%', filterType: 'boolean' },
        { field: 'ativo', header: 'Ativo', width: '10%', filterType: 'boolean' },
        { field: 'actions', header: 'Ações', width: '15%' }
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private medicoService: MedicoService
    ) {}

    ngOnInit(): void {}

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => (current && current[key] !== undefined ? current[key] : null), obj);
    }

    redirectToCadastro(): void {
        this.router.navigate(['/pages/create-medico']);
    }

    editarMedico(medico: any): void {
        this.router.navigate(['/pages/create-medico', medico.id]);
    }

    excluirMedico(event: any): void {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmationService.confirm({
            message: `Deseja realmente excluir o médico "${this.getNestedValue(item, 'nome')}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.medicoService.delete(item.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Médico excluído com sucesso' });
                        onComplete(true);
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir médico' });
                        console.error(error);
                        onComplete(false);
                    }
                });
            },
            reject: () => onComplete(false)
        });
    }
}
