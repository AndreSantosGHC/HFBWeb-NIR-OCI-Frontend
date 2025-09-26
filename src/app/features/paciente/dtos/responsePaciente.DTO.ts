// src/features/usuario/dtos/response-usuario.dto.ts
import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponsePacienteDTO  extends BaseDTO {
  prontuario: string;
  email?: string;
  telefone?: string;
  dataNascimento?: Date;
  cpf?: string;
  cns?: string;
  rg?: string;
  endereco?: string;
  observacoes?: string;
  status?: string;
}
