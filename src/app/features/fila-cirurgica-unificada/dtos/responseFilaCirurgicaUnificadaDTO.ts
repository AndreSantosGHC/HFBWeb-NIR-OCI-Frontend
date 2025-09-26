import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseFilaCirurgicaUnificadaDTO extends BaseDTO {
    pacienteId: string;
    prontuario?: string;
    nomePaciente: string;
    cns?: string;
    dataNascimento?: string;
    telefoneFixo?: string;
    celular?: string;
    outroContato?: string;
    cep?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;

    cnsMedico?: string;
    nomeMedico: string;
    dataEntradaFila?: string;
    especialidade: string;
    cirurgiaSequencial?: boolean;
    sequencia?: string;
    codigoProcedimento: string;
    descricaoProcedimento?: string;
    prioridade: string;
    lateralidade: string;
    cid: string;
    dataRiscoCirurgico?: string;
    riscoCirurgico: string;
    doencasAssociadas: string;
    cadastroRegulacao?: string;
    sisregNumero?: string;
    serNumero?: string;

    assinaturaMedico: string;
    dataSolicitacao: string;
}
