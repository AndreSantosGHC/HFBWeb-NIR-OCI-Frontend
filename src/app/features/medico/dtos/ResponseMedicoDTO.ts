import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseMedicoDTO extends BaseDTO {
    cns?: string;
    dataEntrada?: Date;
    cbo?: string;
    descricao?: string;
    SUS?: boolean;
    vinculacao?: string;
    tipo?: string;
    subtipo?: string;
    portaria134?: string;
    chOutro?: number;
    chAmb?: number;
    chHosp?: number;
    total?: number;
}
