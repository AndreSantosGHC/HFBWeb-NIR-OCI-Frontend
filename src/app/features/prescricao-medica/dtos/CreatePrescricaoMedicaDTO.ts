export class CreatePrescricaoMedicaDTO {
    pacienteId!: string;
    medicamento!: string;
    dose!: string;
    dataInicio!: Date;
    horario!: string;
    observacoes?: string;

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

    constructor(init?: Partial<CreatePrescricaoMedicaDTO>) {
        Object.assign(this, init);
    }
}
