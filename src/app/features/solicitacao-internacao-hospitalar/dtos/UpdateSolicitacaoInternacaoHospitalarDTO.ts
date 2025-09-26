import { CreateSolicitacaoInternacaoHospitalarDTO } from './CreateSolicitacaoInternacaoHospitalarDTO';

export class UpdateSolicitacaoInternacaoHospitalarDTO extends CreateSolicitacaoInternacaoHospitalarDTO {
    id!: string;

    constructor(init?: Partial<UpdateSolicitacaoInternacaoHospitalarDTO>) {
        super(init);
    }
}
