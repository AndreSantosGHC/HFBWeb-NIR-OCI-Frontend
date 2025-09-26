import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseSolicitacaoExamesDTO extends BaseDTO {
    pacienteId: string;
    pacienteNome: string;
    pacienteProntuario: string;
    pacienteCNS?: string;
    pacienteDataNascimento?: Date;
    exames?: string[];
}
