import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '@/shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { CreateSolicitacaoExamesDTO } from '../dtos/createSolicitacaoExames.DTO';
import { UpdateSolicitacaoExamesDTO } from '../dtos/updateSolicitacaoExames.DTO';
import { ResponseSolicitacaoExamesDTO } from '../dtos/responseSolicitacaoExames.DTO';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoExamesService extends BaseApiClient<ResponseSolicitacaoExamesDTO, UpdateSolicitacaoExamesDTO, CreateSolicitacaoExamesDTO> {
    constructor(http: HttpClient) {
        super(http, `${environments.apiUrl}/exames`);
    }

    gerarDocumento(payload: any): Observable<Blob> {
        return this.http.post(`${environments.apiUrl}/solicitacao-exame/gerar-doc`, payload, {
            responseType: 'blob'
        });
    }
}
