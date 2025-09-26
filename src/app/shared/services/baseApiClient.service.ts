// src/app/shared/base.api-client.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDTO } from '@/shared/models/baseModel.DTO';
import { ApiResponse } from '@/shared/models/apiResponse';

/**
 * Interface para a estrutura de dados genérica.
 * Pode ser estendida para incluir um ID.
 */

export abstract class BaseApiClient<T extends BaseDTO, CreateDTO = T, UpdateDTO = Partial<T>> {
    constructor(
        protected http: HttpClient,
        protected baseUrl: string
    ) {}

    getAll(limit?: number): Observable<ApiResponse<T[]>> {
        let params = new HttpParams();
        if (limit !== undefined) {
            params = params.set('limit', limit.toString());
        }

        return this.http.get<ApiResponse<T[]>>(this.baseUrl, { params });
    }

    getById(id: number | string): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<ApiResponse<T>>(url);
    }

    create(item: CreateDTO): Observable<ApiResponse<T>> {
        return this.http.post<ApiResponse<T>>(this.baseUrl, item);
    }

    update(id: string, item: UpdateDTO): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<ApiResponse<T>>(url, item);
    }

    patch(id: string, item: UpdateDTO): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.patch<ApiResponse<T>>(url, item);
    }

    delete(id: number | string): Observable<void> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
