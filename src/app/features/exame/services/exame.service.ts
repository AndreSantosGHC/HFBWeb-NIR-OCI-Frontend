import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '@/shared/models/apiResponse';

import { ResponseExameDTO } from '../dtos/responseExame.DTO';
import { CreateExameDTO } from '../dtos/createExame.DTO';
import { UpdateExameDTO } from '../dtos/updateExame.DTO';

@Injectable({
    providedIn: 'root'
})
export class ExameService extends BaseApiClient<ResponseExameDTO, CreateExameDTO, UpdateExameDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/exames`);
    }

    getByName(name: string): Observable<ApiResponse<ResponseExameDTO[]>> {
        const encodedName = encodeURIComponent(name);
        return this.http.get<ApiResponse<ResponseExameDTO[]>>(`${this.baseUrl}/nome/${encodedName}`);
    }
}
