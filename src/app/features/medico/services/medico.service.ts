import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { ResponseMedicoDTO } from '../dtos/ResponseMedicoDTO';
import { CreateMedicoDTO } from '../dtos/CreateMedicoDTO';
import { UpdateMedicoDTO } from '../dtos/UpdateMedicoDTO';

@Injectable({
    providedIn: 'root'
})
export class MedicoService extends BaseApiClient<ResponseMedicoDTO, CreateMedicoDTO, UpdateMedicoDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/medico`);
    }
}
