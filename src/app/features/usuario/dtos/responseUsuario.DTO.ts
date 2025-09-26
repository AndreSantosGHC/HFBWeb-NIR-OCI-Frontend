// src/features/usuario/dtos/response-usuario.dto.ts
import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseUsuarioDTO extends BaseDTO {
  email?: string;
  usuario?: string;
//   status?: string;
}
