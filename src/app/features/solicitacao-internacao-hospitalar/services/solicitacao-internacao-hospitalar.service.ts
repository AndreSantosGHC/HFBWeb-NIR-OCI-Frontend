import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { CreateSolicitacaoInternacaoHospitalarDTO } from '../dtos/CreateSolicitacaoInternacaoHospitalarDTO';
import { UpdateSolicitacaoInternacaoHospitalarDTO } from '../dtos/UpdateSolicitacaoInternacaoHospitalarDTO';
import { ResponseSolicitacaoInternacaoHospitalarDTO } from '../dtos/ResponseSolicitacaoInternacaoHospitalarDTO';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoInternacaoHospitalarService extends BaseApiClient<ResponseSolicitacaoInternacaoHospitalarDTO, CreateSolicitacaoInternacaoHospitalarDTO, UpdateSolicitacaoInternacaoHospitalarDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/internacoes`);
    }
}
