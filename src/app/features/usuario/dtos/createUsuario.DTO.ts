// src/features/usuario/dtos/create-usuario.dto.ts

export class CreateUsuarioDTO {
  nome!: string;
  email?: string;
  usuario?: string;
  senha?: string;
//   status?: string;
  codigo?: string;
  tags?: string[];
  descricao?: string;
}
