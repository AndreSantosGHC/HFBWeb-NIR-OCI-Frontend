import { BaseDTO } from '@/shared/models/baseModel.DTO';

export class CreateEvolucaoMultidisciplinarDTO {
    pacienteId!: string; // referencia ao paciente
    tipo!: string; // Tipo da evolução (enfermagem, médico, fisioterapia...)
    evolucao!: string; // Texto da evolução
    dataEvolucao!: Date;
    horaEvolucao!: string; // hh:mm
    enfermaria?: string;
    leito?: string;
}
