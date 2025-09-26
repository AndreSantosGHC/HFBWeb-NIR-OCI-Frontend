import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '@/shared/models/apiResponse';

import { ResponseEvolucaoMultidisciplinarDTO } from '../dtos/ResponseEvolucaoMultidisciplinarDTO';
import { CreateEvolucaoMultidisciplinarDTO } from '../dtos/CreateEvolucaoMultidisciplinarDTO';
import { UpdateEvolucaoMultidisciplinarDTO } from '../dtos/UpdateEvolucaoMultidisciplinarDTO';

@Injectable({
    providedIn: 'root'
})
export class EvolucaoMultidisciplinarService extends BaseApiClient<ResponseEvolucaoMultidisciplinarDTO, CreateEvolucaoMultidisciplinarDTO, UpdateEvolucaoMultidisciplinarDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/evolucao-multidisciplinar`);
    }

    getByPacienteId(pacienteId: string): Observable<ApiResponse<ResponseEvolucaoMultidisciplinarDTO[]>> {
        return this.http.get<ApiResponse<ResponseEvolucaoMultidisciplinarDTO[]>>(`${this.baseUrl}/paciente/${pacienteId}`);
    }
}
