import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseExameDTO extends BaseDTO {
    nome: string;
    descricao?: string;
}
