import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseSolicitacaoInternacaoHospitalarDTO extends BaseDTO {
    // Identificação do Estabelecimento
    estabelecimentoSolicitante: string;
    cnesSolicitante: string;
    estabelecimentoExecutante: string;
    cnesExecutante: string;

    // Identificação do Paciente
    pacienteId: string;
    pacienteNome: string;
    pacienteProntuario: string;
    pacienteCns: string;
    pacienteDataNascimento: Date;
    pacienteSexo: string;
    pacienteRacaCor: string;
    pacienteNomeMae: string;
    pacienteTelefone: string;
    pacienteResponsavel: string;
    pacienteTelefoneContato: string;
    pacienteEndereco: string;
    pacienteCidadeResidencia: string;
    pacienteCodigoIbgeMunicipio: string;
    pacienteUf: string;
    pacienteCep: string;

    // Justificativa da Internação
    sinaisSintomas: string;
    condicoesInternacao: string;
    resultadosExames: string;
    diagnosticoInicial: string;
    hdPrincipal: string;
    hdSecundario?: string;
    hdCausasAssociadas?: string;

    // Procedimento Solicitado
    descricaoProcedimento: string;
    codigoProcedimento: string;
    clinica: string;
    caracterInternacao: string;
    docs: string;
    docsProfissional: string;
    nomeProfissional: string;
    dataSolicitacao: Date;
    assinaturaCarimbo: string;

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
}
