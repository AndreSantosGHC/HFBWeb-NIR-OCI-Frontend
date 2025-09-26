// src/shared/models/baseModel.DTO.ts

export interface BaseDTO {
  id: string;
  nome: string;
  descricao?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
  excluidoEm?: Date;
  ativo?: boolean;
  versao?: number;
  criadoPor?: string;
  atualizadoPor?: string;
  excluidoPor?: string;
  codigo?: string;
  tags?: string[];
}
