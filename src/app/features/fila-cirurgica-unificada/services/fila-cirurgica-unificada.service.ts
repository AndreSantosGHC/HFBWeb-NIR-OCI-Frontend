import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { CreateFilaCirurgicaUnificadaDTO } from '../dtos/createFilaCirurgicaUnificadaDTO';
import { ResponseFilaCirurgicaUnificadaDTO } from '../dtos/responseFilaCirurgicaUnificadaDTO';
import { UpdateFilaCirurgicaUnificadaDTO } from '../dtos/updateFilaCirurgicaUnificadaDTO';

@Injectable({
    providedIn: 'root'
})
export class FilaCirurgicaUnificadaService extends BaseApiClient<ResponseFilaCirurgicaUnificadaDTO, CreateFilaCirurgicaUnificadaDTO, UpdateFilaCirurgicaUnificadaDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/fila-cirurgica-unificada`);
    }
}
