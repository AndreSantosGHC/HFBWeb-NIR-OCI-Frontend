import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { ResponseDoencaDTO } from '../dtos/ResponseDoencasDTO';
import { CreateDoencaDTO } from '../dtos/CreateDoencasDTO';
import { UpdateDoencaDTO } from '../dtos/UpdateDoencasDTO';

@Injectable({
  providedIn: 'root'
})
export class DoencaService extends BaseApiClient<ResponseDoencaDTO, CreateDoencaDTO, UpdateDoencaDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/doenca`);
    }
}
