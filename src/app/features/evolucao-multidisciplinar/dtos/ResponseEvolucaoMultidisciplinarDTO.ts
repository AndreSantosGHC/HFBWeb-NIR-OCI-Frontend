import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseEvolucaoMultidisciplinarDTO extends BaseDTO {
    pacienteId: string;
    tipo: string;
    evolucao: string;
    dataEvolucao: Date;
    horaEvolucao: string;
    enfermaria?: string;
    leito?: string;
    pacienteNome?: string; // opcional para exibir na listagem
    pacienteProntuario?: string;
}
