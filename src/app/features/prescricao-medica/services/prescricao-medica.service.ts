import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { CreatePrescricaoMedicaDTO } from '../dtos/CreatePrescricaoMedicaDTO';
import { ResponsePrescricaoMedicaDTO } from '../dtos/ResponsePrescricaoMedicaDTO';
import { UpdatePrescricaoMedicaDTO } from '../dtos/UpdatePrescricaoMedicaDTO';

@Injectable({
    providedIn: 'root'
})
export class PrescricaoMedicaService extends BaseApiClient<ResponsePrescricaoMedicaDTO, CreatePrescricaoMedicaDTO, UpdatePrescricaoMedicaDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/prescricao-medica`);
    }
}
