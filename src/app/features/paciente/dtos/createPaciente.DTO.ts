// src/features/paciente/dtos/create-paciente.dto.ts

import { EnderecoDTO } from '@/shared/models/endereco.DTO';

export class CreatePacienteDTO {
  prontuario!: string;
  nome!: string;
  nomeSocial?: string;
  nomeMae?: string;
  dataNascimento?: Date;
  cpf?: string;
  cartaoSus?: string;

  telefone?: string;
  telefoneResponsavel?: string;

  responsavel?: string;

  endereco?: EnderecoDTO;

  sexo?: string;
  etnia?: string;

  observacoes?: string;
}
