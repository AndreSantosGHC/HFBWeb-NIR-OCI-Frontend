import { FilterMatchMode } from 'primeng/api';
import { inject } from '@angular/core';
import { makeEnvironmentProviders } from '@angular/core';
import { FilterService } from 'primeng/api';
import { primeNGPtBR } from '../translation/primeNGPtBR';

export const customFilterProviders = makeEnvironmentProviders([
    {
        provide: 'CUSTOM_FILTERS_INIT',
        multi: true,
        useFactory: () => {
            const filterService = inject(FilterService);
            return registerCustomFilters(filterService)();
        }
    }
]);


export function registerCustomFilters(filterService: FilterService) {
    return () => {
        filterService.register('isEmpty', (value: any) => {
            if (value === null || value === undefined) return true;
            if (typeof value === 'string') return value.trim().length === 0;
            if (Array.isArray(value)) return value.length === 0;
            return false;
        });

        filterService.register('isNotEmpty', (value: any) => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') return value.trim().length > 0;
            if (Array.isArray(value)) return value.length > 0;
            return true;
        });
    };
}

function translateLabel(value: string, type: 'text' | 'numeric' | 'date' | 'array'): string {
    // Primeiro tenta pegar do primeNGPtBR
    switch (value) {
        case 'startsWith':
            return primeNGPtBR.startsWith;
        case 'contains':
            return primeNGPtBR.contains;
        case 'notContains':
            return primeNGPtBR.notContains;
        case 'endsWith':
            return primeNGPtBR.endsWith;
        case 'equals':
            return primeNGPtBR.equals;
        case 'notEquals':
            return primeNGPtBR.notEquals;
        case 'lt':
            return primeNGPtBR.lt;
        case 'lte':
            return primeNGPtBR.lte;
        case 'gt':
            return primeNGPtBR.gt;
        case 'gte':
            return primeNGPtBR.gte;
        case 'dateIs':
            return primeNGPtBR.dateIs;
        case 'dateIsNot':
            return primeNGPtBR.dateIsNot;
        case 'dateBefore':
            return primeNGPtBR.dateBefore;
        case 'dateAfter':
            return primeNGPtBR.dateAfter;
        default:
            return value; // Se não achar, usa valor mesmo
    }
}


export const CUSTOM_FILTER_MATCH_MODES = {
    text: [
        { label: translateLabel('startsWith', 'text'), value: FilterMatchMode.STARTS_WITH },
        { label: translateLabel('contains', 'text'), value: FilterMatchMode.CONTAINS },
        { label: translateLabel('notContains', 'text'), value: FilterMatchMode.NOT_CONTAINS },
        { label: translateLabel('endsWith', 'text'), value: FilterMatchMode.ENDS_WITH },
        { label: translateLabel('equals', 'text'), value: FilterMatchMode.EQUALS },
        { label: translateLabel('notEquals', 'text'), value: FilterMatchMode.NOT_EQUALS },
        { label: 'Está vazio', value: 'isEmpty' },
        { label: 'Não está vazio', value: 'isNotEmpty' }
    ],
    numeric: [
        { label: translateLabel('equals', 'numeric'), value: FilterMatchMode.EQUALS },
        { label: translateLabel('notEquals', 'numeric'), value: FilterMatchMode.NOT_EQUALS },
        { label: translateLabel('lt', 'numeric'), value: FilterMatchMode.LESS_THAN },
        { label: translateLabel('lte', 'numeric'), value: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
        { label: translateLabel('gt', 'numeric'), value: FilterMatchMode.GREATER_THAN },
        { label: translateLabel('gte', 'numeric'), value: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
        { label: translateLabel('between', 'numeric'), value: FilterMatchMode.BETWEEN },
        { label: 'Está vazio', value: 'isEmpty' },
        { label: 'Não está vazio', value: 'isNotEmpty' }
    ],
    date: [
        { label: translateLabel('dateIs', 'date'), value: FilterMatchMode.DATE_IS },
        { label: translateLabel('dateIsNot', 'date'), value: FilterMatchMode.DATE_IS_NOT },
        { label: translateLabel('dateBefore', 'date'), value: FilterMatchMode.DATE_BEFORE },
        { label: translateLabel('dateAfter', 'date'), value: FilterMatchMode.DATE_AFTER },
        { label: 'Está vazio', value: 'isEmpty' },
        { label: 'Não está vazio', value: 'isNotEmpty' }
    ],
    array: [
        { label: translateLabel('equals', 'array'), value: FilterMatchMode.EQUALS },
        { label: translateLabel('notEquals', 'array'), value: FilterMatchMode.NOT_EQUALS },
        { label: translateLabel('in', 'array'), value: FilterMatchMode.IN },
        { label: 'Está vazio', value: 'isEmpty' },
        { label: 'Não está vazio', value: 'isNotEmpty' }
    ]
};


