// src/app/core/services/clinica.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '@/shared/models/apiResponse';

import { ResponsePacienteDTO } from '../dtos/responsePaciente.DTO';
import { CreatePacienteDTO } from '../dtos/createPaciente.DTO';
import { UpdatePacienteDTO } from '../dtos/updatePaciente.DTO';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends BaseApiClient<ResponsePacienteDTO, CreatePacienteDTO, UpdatePacienteDTO> {

    // O construtor passa o HttpClient e a URL base para o construtor da classe pai
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/paciente`);
    }

    getByName(name: string): Observable<ApiResponse<ResponsePacienteDTO[]>> {
        const encodedName = encodeURIComponent(name);
        return this.http.get<ApiResponse<ResponsePacienteDTO[]>>(`${this.baseUrl}/nome/${encodedName}`);
    }
}
