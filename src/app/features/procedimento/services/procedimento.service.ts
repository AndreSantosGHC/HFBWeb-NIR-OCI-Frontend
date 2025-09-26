import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { ResponseProcedimentoDTO } from '../dtos/ResponseProcedimentoDTO';
import { CreateProcedimentoDTO } from '../dtos/CreateProcedimentoDTO';
import { UpdateProcedimentoDTO } from '../dtos/UpdateProcedimentoDTO';

@Injectable({
    providedIn: 'root'
})
export class ProcedimentoService extends BaseApiClient<ResponseProcedimentoDTO, CreateProcedimentoDTO, UpdateProcedimentoDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/procedimento`);
    }
}
