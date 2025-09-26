export class CreateSolicitacaoInternacaoHospitalarDTO {
    // Identificação do Estabelecimento
    estabelecimentoSolicitante!: string;
    cnesSolicitante!: string;
    estabelecimentoExecutante!: string;
    cnesExecutante!: string;

    // Identificação do Paciente
    pacienteId!: string;
    codigoIbgeMunicipio!: string;

    // Justificativa da Internação
    sinaisSintomas!: string;
    condicoesInternacao!: string;
    resultadosExames!: string;
    diagnosticoInicial!: string;
    hdPrincipal!: string;
    hdSecundario?: string;
    hdCausasAssociadas?: string;

    // Procedimento Solicitado
    descricaoProcedimento!: string;
    codigoProcedimento!: string;
    clinica!: string;
    caracterInternacao!: string;
    docs!: string;
    docsProfissional!: string;
    nomeProfissional!: string;
    dataSolicitacao!: Date;
    assinaturaCarimbo!: string;

    // Causas Externas
    acidenteTransito?: boolean;
    acidenteTrabalhoTipico?: boolean;
    acidenteTrabalhoTrajeto?: boolean;
    cnpjSeguradora?: string;
    numeroBilhete?: string;
    serie?: string;
    cnpjEmpresa?: string;
    cnaeEmpresa?: string;
    cbor?: string;
    vinculo?: string;

    constructor(init?: Partial<CreateSolicitacaoInternacaoHospitalarDTO>) {
        Object.assign(this, init);
    }
}
