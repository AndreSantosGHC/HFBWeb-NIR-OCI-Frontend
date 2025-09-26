import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { ResponseCidDTO } from '../dtos/ResponseCidDTO';
import { CreateCidDTO } from '../dtos/CreateCidDTO';
import { UpdateCidDTO } from '../dtos/UpdateCidDTO';

@Injectable({
    providedIn: 'root'
})
export class CidService extends BaseApiClient<ResponseCidDTO, CreateCidDTO, UpdateCidDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/cid`);
    }
}
