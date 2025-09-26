// src/features/usuario/dtos/update-usuario.dto.ts

export class UpdateUsuarioDTO {
  nome?: string;
  email?: string;
  usuario?: string;
  senha?: string;
//   status?: string;
  ativo?: boolean;
  codigo?: string;
  tags?: string[];
  descricao?: string;
}
