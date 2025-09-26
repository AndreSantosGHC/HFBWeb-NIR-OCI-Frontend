// src/features/paciente/dtos/update-paciente.dto.ts
export class UpdatePacienteDTO {
  prontuario?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: Date;
  cpf?: string;
  rg?: string;
  endereco?: string;
  observacoes?: string;
  status?: string;
  ativo?: boolean;
}
