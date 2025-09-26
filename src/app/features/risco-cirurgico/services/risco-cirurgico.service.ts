import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { CreateRiscoCirurgicoDTO } from '../dtos/CreateRiscoCirurgicoDTO';
import { ResponseRiscoCirurgicoDTO } from '../dtos/ResponseRiscoCirurgicoDTO';
import { UpdateRiscoCirurgicoDTO } from '../dtos/UpdateRiscoCirurgicoDTO';

@Injectable({
    providedIn: 'root'
})
export class RiscoCirurgicoService extends BaseApiClient<ResponseRiscoCirurgicoDTO, CreateRiscoCirurgicoDTO, UpdateRiscoCirurgicoDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/risco-cirurgico`);
    }
}
