import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponsePrescricaoMedicaDTO extends BaseDTO {
    pacienteId: string;
    medicamento: string;
    dose: string;
    dataInicio: Date;
    horario: string;
    observacoes?: string;

    // Dados de paciente para exibição na lista
    pacienteNome: string;
    pacienteProntuario: string;

    // Campos de Procedimentos
    tipoProcedimento?: 'EXAME' | 'IMAGEM' | 'PROCEDIMENTO';
    dataSolicitacaoProcedimento?: Date;
    horaSolicitacaoProcedimento?: string;
    justificativaProcedimento?: string;

    // Campos de Antimicrobianos
    indicacaoClinica?: string;
    terapeuticaEmpirica?: boolean;
    profilatica?: boolean;
    terapeuticaGermeIsolado?: boolean;
    infeccaoHospitalar?: boolean;
    infeccaoPosCirurgica?: boolean;
    microrganismo?: string;
    materialClinico?: string;
    tempoProvavelUso?: number;
    assinaturaCarimbo?: string;
}
