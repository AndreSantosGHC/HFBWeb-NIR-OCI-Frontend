// src/app/core/services/clinica.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiClient } from '../../../shared/services/baseApiClient.service';
import { environments } from 'src/environments/environments';

import { ResponseUsuarioDTO } from '../dtos/responseUsuario.DTO';
import { CreateUsuarioDTO } from '../dtos/createUsuario.DTO';
import { UpdateUsuarioDTO } from '../dtos/updateUsuario.DTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseApiClient<ResponseUsuarioDTO, CreateUsuarioDTO, UpdateUsuarioDTO> {

  // O construtor passa o HttpClient e a URL base para o construtor da classe pai
  constructor(http: HttpClient) {
    super(http, `${environments.apiUrl}/usuario`);
  }
}
