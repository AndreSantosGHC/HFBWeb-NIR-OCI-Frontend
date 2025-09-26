import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseCidDTO extends BaseDTO {
    codigo: string;
    nome: string;
}
