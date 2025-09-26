import { CreatePrescricaoMedicaDTO } from './CreatePrescricaoMedicaDTO';

export class UpdatePrescricaoMedicaDTO extends CreatePrescricaoMedicaDTO {
    constructor(init?: Partial<UpdatePrescricaoMedicaDTO>) {
        super(init);
    }
}
