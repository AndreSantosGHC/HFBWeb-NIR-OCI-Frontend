import { BaseDTO } from '@/shared/models/baseModel.DTO';

export interface ResponseRiscoCirurgicoDTO extends BaseDTO {
    pacienteId: string;
    diagnosticoPreOperatorio?: string;
    cirurgiaProgramada?: string;
    tipoAnestesia?: string;

    historiaPatologica?: string;
    alergias?: string;
    interrogatorioDirigido?: string;
    disturbiosCoagulacao?: string;
    medicamentosEmUso?: string;

    pa?: string;
    fc?: string;
    temperatura?: string;
    peso?: string;
    acv?: string;
    aparelhoRespiratorio?: string;
    abdome?: string;
    membros?: string;
    outrosAchados?: string;

    hb?: string;
    hct?: string;
    glicose?: string;
    creatinina?: string;
    ptt?: string;
    outrosExames?: string;
    ecg?: string;
    raioXTorax?: string;

    riscoCirurgico?: string;
    recomendacoesEspeciais?: string;
}
