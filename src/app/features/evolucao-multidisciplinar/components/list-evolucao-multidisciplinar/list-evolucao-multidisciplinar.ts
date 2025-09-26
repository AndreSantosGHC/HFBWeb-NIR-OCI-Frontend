import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { EvolucaoMultidisciplinarService } from '../../services/evolucao-multidisciplinar.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-evolucao-multidisciplinar',
    templateUrl: './list-evolucao-multidisciplinar.html',
    standalone: true,
    imports: [CommonModule, UniversalDatatableComponent, ToastModule, ConfirmDialogModule, CardModule, SelectModule],
    providers: [ConfirmationService]
})
export class ListEvolucaoMultidisciplinarComponent implements OnInit {
    columns = [
        { field: 'pacienteNome', header: 'Paciente' },
        { field: 'pacienteProntuario', header: 'Prontuário' },
        { field: 'tipo', header: 'Tipo' },
        { field: 'evolucao', header: 'Evolução' },
        { field: 'dataEvolucao', header: 'Data' },
        { field: 'horaEvolucao', header: 'Hora' }
    ];

    constructor(
        private service: EvolucaoMultidisciplinarService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    redirectToCreate(): void {
        this.router.navigate(['/pages/create-evolucao-multidisciplinar']);
    }

    editarEvolucao(event: any): void {
        this.router.navigate(['/pages/create-evolucao-multidisciplinar', event.id]);
    }

    excluirEvolucao(event: any): void {
        if (confirm('Deseja realmente excluir esta evolução?')) {
            this.service.delete(event.id).subscribe(() => window.location.reload());
        }
    }

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((o, i) => (o ? o[i] : null), obj);
    }
}
