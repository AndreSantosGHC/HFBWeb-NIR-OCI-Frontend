// universal-datatable.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag'; // Se estiver usando tags
import { InputTextModule } from 'primeng/inputtext'; // Para filtros
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

import { environments } from 'src/environments/environments';

import { MenuItem } from 'primeng/api';
import { UniversalTableService, TableRequest, TableResponse } from '@/shared/services/universalTable.service';
import { ExportTableDataService } from '@/shared/services/ExportTableData.service';
import { ExportType } from '@/shared/services/ExportTableData.service';
import { SplitButtonModule } from 'primeng/splitbutton';

import { CUSTOM_FILTER_MATCH_MODES } from '@/shared/helpers/table-custom-filters';

type FilterType = 'text' | 'numeric' | 'date' | 'boolean';

export interface CustomActionButton {
    icon: string;
    tooltip?: string;
    classes?: string;
    onClick: (rowData: any) => void;
}

@Component({
    selector: 'app-universal-datatable',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, MenuModule, TagModule, InputTextModule, SplitButtonModule, DatePickerModule, SelectModule, TooltipModule],
    templateUrl: './universal-table.html',
    styleUrls: ['./universal-table.scss']
})
export class UniversalDatatableComponent implements OnInit {
    @ViewChild('table') table!: Table;
    // @ContentChild('bodyTemplate') bodyTemplate!: TemplateRef<any>;
    @ContentChild('bodyTemplate', { static: true }) bodyTemplate?: TemplateRef<any>;

    @Input() showEditAction: boolean = true;
    @Input() showDeleteAction: boolean = true;
    @Input() customActionButtons: CustomActionButton[] = [];

    @Input() CreateLabel: string = 'Novo';
    @Input() entity!: string;
    @Input() title: string = '';
    @Input() rows: number = 10;
    @Input() showToolbar: boolean = true;
    @Input() showExport: boolean = true;
    @Input() selectionMode: 'single' | 'multiple' | null = null;
    @Input() columns: any[] = [];
    @Input() expands: string[] = [];
    @Input() includeInactive: boolean = false;

    @Output() rowClick = new EventEmitter<any>();
    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onCreate = new EventEmitter<void>();
    @Output() onExport = new EventEmitter<{ type: ExportType; filters: any }>();

    data: any[] = [];
    totalRecords: number = 0;
    loading: boolean = false;
    exportItems: MenuItem[] = [];
    currentFilters: any = {};
    globalFilterFields: string[] = [];

    CUSTOM_FILTER_MATCH_MODES = CUSTOM_FILTER_MATCH_MODES;

    constructor(
        private tableService: UniversalTableService,
        private exportService: ExportTableDataService
    ) {}

    ngOnInit() {
        this.initExportMenu();
        this.setGlobalFilterFields();
        this.loadData({ first: 0, rows: this.rows });
    }

    private setGlobalFilterFields(): void {
        this.globalFilterFields = this.columns.filter((col) => col.filterable !== false).map((col) => col.field);
    }

    private initExportMenu() {
        this.exportItems = [
            {
                label: 'CSV',
                icon: 'pi pi-file',
                command: () => this.export('csv')
            },
            {
                label: 'Excel',
                icon: 'pi pi-file-excel',
                command: () => this.export('excel')
            },
            {
                label: 'PDF',
                icon: 'pi pi-file-pdf',
                command: () => this.export('pdf')
            }
        ];
    }

    // getColumnMatchModes(col: { filterType: FilterType }) {
    //     return extendedMatchModes[col.filterType] || extendedMatchModes.text;
    // }

    loadData(event: TableLazyLoadEvent): void {
        this.loading = true;
        this.currentFilters = event.filters || {};

        const rows = event.rows ?? this.rows;
        const first = event.first ?? 0;

        let sortOrder: 1 | -1 | null | undefined;
        if (event.sortOrder === 1 || event.sortOrder === -1) {
            sortOrder = event.sortOrder;
        }

        const request: TableRequest = {
            entity: this.entity,
            page: Math.floor(first / rows),
            size: rows,
            sortField: event.sortField as string,
            sortOrder: sortOrder,
            multiSortMeta: event.multiSortMeta as any,
            filters: this.tableService.parseFilters(event.filters),
            expands: this.expands,
            includeInactive: this.includeInactive
        };

        this.tableService.getCustomData(request).subscribe({
            next: (response: TableResponse<any>) => {
                this.data = response.content;
                this.totalRecords = response.totalElements;
                this.loading = false;
            },
            error: (error) => {
                console.error('Erro ao carregar dados:', error);
                this.loading = false;
            }
        });
    }

    onRowSelect(event: any): void {
        if (this.selectionMode) {
            this.rowClick.emit(event.data);
        }
    }

    export(type: ExportType): void {
        this.loading = true;

        const request: TableRequest = {
            entity: this.entity,
            page: 0,
            size: 10000, // Para exportar todos os registros
            sortField: this.table.sortField as string,
            sortOrder: this.table.sortOrder as 1 | -1,
            multiSortMeta: this.table.multiSortMeta as any,
            filters: this.currentFilters,
            expands: this.expands,
            includeInactive: this.includeInactive
        };

        this.exportService
            .exportTable(
                type,
                `${environments.apiUrl}/dynamic-table`, // ← URL da sua API de exportação
                request,
                this.columns,
                `${this.entity}_export_${new Date().toISOString().split('T')[0]}`
            )
            .then(() => {
                this.loading = false;
            })
            .catch((error) => {
                console.error('Erro na exportação:', error);
                this.loading = false;
            });
    }

    clearFilters(): void {
        if (this.table) {
            this.table.reset();
            this.currentFilters = {};
            this.loadData({ first: 0, rows: this.rows });
        }
    }

    refresh(): void {
        this.loadData({ first: 0, rows: this.rows });
    }

    handleEdit(item: any): void {
        this.onEdit.emit(item);
    }

    handleDelete(item: any): void {
        this.onDelete.emit({
            item,
            onComplete: (success: boolean = true) => {
                if (success) this.refresh();
            }
        });
        this.refresh();
    }

    handleCreate(): void {
        this.onCreate.emit();
    }

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    formatValue(value: any, field: string): string {
        if (value === null || value === undefined) return '';

        // Se for array de objetos (como antimicrobianos)
        if (Array.isArray(value)) {
            return value
                .map((item) => {
                    if (typeof item === 'object') {
                        return item.nome || item.name || item.descricao || this.stringifyObject(item);
                    }
                    return String(item);
                })
                .join(', ');
        }

        if (typeof value === 'boolean') {
            return value === true ? 'Sim' : 'Não';
        }

        // Se for objeto único
        if (typeof value === 'object' && !(value instanceof Date)) {
            return value.nome || value.name || value.descricao || this.stringifyObject(value);
        }

        // Se for data
        if (field.includes('data') || field.includes('Data') || field.includes('date')) {
            return this.formatDate(value);
        }

        // return String(value);
        return value;
    }

    private stringifyObject(obj: any): string {
        try {
            // Tenta pegar propriedades úteis antes de stringificar
            if (obj.id && obj.nome) return `${obj.nome}`;
            if (obj.id && obj.name) return `${obj.name}`;
            if (obj.nome) return obj.nome;
            if (obj.name) return obj.name;
            if (obj.descricao) return obj.descricao;

            // Último recurso: JSON stringify
            return JSON.stringify(obj);
        } catch {
            return 'Objeto inválido';
        }
    }

    private formatDate(value: any): string {
        if (!value) return '';

        const date = new Date(value);
        if (isNaN(date.getTime())) return String(value);

        return date.toLocaleDateString('pt-BR');
    }
}
