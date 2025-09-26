// universal-table.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterMetadata } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { environments } from 'src/environments/environments';

export interface PrimeNgFilters {
  [field: string]: FilterMetadata | FilterMetadata[];
}

export interface TableRequest {
  entity: string;
  page: number;
  size: number;
  sortField?: string;
  sortOrder?: 1 | -1 | null;
  multiSortMeta?: { field: string; order: 1 | -1 }[];
  filters?: PrimeNgFilters;
  expands?: string[];
  includeInactive?: boolean;
}

export interface TableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface ColumnMetadata {
  field: string;
  header: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select';
  sortable?: boolean;
  filterable?: boolean;
  options?: any[];
  width?: string;
}

export interface TableMetadata {
  entity: string;
  columns: ColumnMetadata[];
  defaultSortField?: string;
  defaultSortOrder?: 'asc' | 'desc';
}

@Injectable({
    providedIn: 'root'
})
export class UniversalTableService {
    private apiUrl = `${environments.apiUrl}/dynamic-table`;

    constructor(private http: HttpClient) {}

    /**
     * Método principal - converte TableLazyLoadEvent para TableRequest automaticamente
     */
    getTableData<T>(entity: string, event: TableLazyLoadEvent): Observable<TableResponse<T>> {
        const request = this.buildRequestFromLazyLoadEvent(entity, event);
        return this.http.post<TableResponse<T>>(this.apiUrl, request);
    }

    /**
     * Método alternativo para casos mais customizados
     */
    getCustomData<T>(request: TableRequest): Observable<TableResponse<T>> {
        return this.http.post<TableResponse<T>>(this.apiUrl, request);
    }

    getMetadata(entity: string): Observable<TableMetadata> {
        return this.http.get<TableMetadata>(`${this.apiUrl}/metadata/${entity}`);
    }

    /**
     * Converte TableLazyLoadEvent do PrimeNG para TableRequest
     */
    private buildRequestFromLazyLoadEvent(entity: string, event: TableLazyLoadEvent, includeInactive: boolean = false): TableRequest {
        let sortField: string | undefined;
        let sortOrder: 1 | -1 | null | undefined;
        let multiSortMeta: { field: string; order: 1 | -1 }[] | undefined;

        // Prioridade para multiSortMeta (ordenação múltipla)
        if (event.multiSortMeta && event.multiSortMeta.length > 0) {
            multiSortMeta = event.multiSortMeta.map((sort) => ({
                field: sort.field as string,
                order: sort.order === 1 || sort.order === -1 ? sort.order : 1
            }));
        }
        // Fallback para ordenação simples
        else if (event.sortField) {
            sortField = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField;
            sortOrder = event.sortOrder === 1 || event.sortOrder === -1 ? (event.sortOrder as 1 | -1) : 1; // Default para ASC
        }

        return {
            entity: entity,
            page: Math.floor((event.first || 0) / (event.rows || 10)),
            size: event.rows || 10,
            sortField: sortField,
            sortOrder: sortOrder,
            multiSortMeta: multiSortMeta,
            filters: this.parseFilters(event.filters),
            includeInactive: includeInactive
        };
    }

    /**
     * Parse dos filtros do PrimeNG
     */
    parseFilters(filters: { [key: string]: FilterMetadata | FilterMetadata[] | undefined } | undefined): any {
        const parsedFilters: any = {};

        if (!filters) return parsedFilters;

        Object.keys(filters).forEach((key) => {
            const filter = filters[key];

            if (Array.isArray(filter)) {
                // Múltiplos filtros para o mesmo campo
                const validFilters = filter.filter((f) =>
                    f.matchMode === 'isEmpty' ||
                    f.matchMode === 'isNotEmpty' ||
                    (f.value !== null && f.value !== undefined && f.value !== '')
                );

                if (validFilters.length > 0) {
                    parsedFilters[key] = validFilters.map((f) => ({
                        value: f.value,
                        matchMode: f.matchMode || 'contains',
                        operator: f.operator || 'and'
                    }));
                }
            } else if (filter && filter.value !== null && filter.value !== undefined && filter.value !== '') {
                // Filtro único
                parsedFilters[key] = {
                    value: filter.value,
                    matchMode: filter.matchMode || 'contains',
                    operator: filter.operator || 'and'
                };
            }
        });

        return parsedFilters;
    }

    /**
     * Método utilitário para criar requests manuais
     */
    createRequest(entity: string, page: number = 0, size: number = 10, includeInactive: boolean = false): TableRequest {
        return {
            entity: entity,
            page: page,
            size: size,
            includeInactive: includeInactive
        };
    }
}
