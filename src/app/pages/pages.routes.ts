// import { Routes } from '@angular/router';
// import { Documentation } from './documentation/documentation';
// import { Crud } from './crud/crud';
// import { Empty } from './empty/empty';

// export default [
//     { path: 'documentation', component: Documentation },
//     { path: 'crud', component: Crud },
//     { path: 'empty', component: Empty },
//     { path: '**', redirectTo: '/notfound' }
// ] as Routes;

import { Routes } from '@angular/router';

import { ListagemPacienteComponent } from '@/features/paciente/components/list-paciente/list-paciente';
import { CadastroPacienteComponent } from '@/features/paciente/components/create-paciente/create-paciente';

import { ListagemUsuarioComponent } from '@/features/usuario/components/list-usuario/list-usuario';
import { CadastroUsuarioComponent } from '@/features/usuario/components/create-usuario/create-usuario';

import { ListExameComponent } from '@/features/exame/components/list-exame/list-exame';
import { CreateExameComponent } from '@/features/exame/components/create-exame/create-exame';

import { ListSolicitacaoExamesComponent } from '@/features/solicitacao-exames/components/list-solicitacao-exames/list-solicitacao-exames';
import { CreateSolicitacaoExamesComponent } from '@/features/solicitacao-exames/components/create-solicitacao-exames/create-solicitacao-exames';

import { ListFilaCirurgicaUnificadaComponent } from '@/features/fila-cirurgica-unificada/components/list-fila-cirurgica-unificada/list-fila-cirurgica-unificada';
import { CreateFilaCirurgicaUnificadaComponent } from '@/features/fila-cirurgica-unificada/components/create-fila-cirurgica-unificada/create-fila-cirurgica-unificada';

import { ListagemMedicoComponent } from '@/features/medico/components/list-medico/list-medico';
import { CadastroMedicoComponent } from '@/features/medico/components/create-medico/create-medico';
import { ListagemCidComponent } from '@/features/cid/components/list-cid/list-cid';
import { CadastroCidComponent } from '@/features/cid/components/create-cid/create-cid';
import { ListagemProcedimentoComponent } from '@/features/procedimento/components/list-procedimento/list-procedimento';
import { CadastroProcedimentoComponent } from '@/features/procedimento/components/create-procedimento/create-procedimento';
import { ListagemDoencaComponent } from '@/features/doencas/components/list-doencas/list-doencas';
import { CadastroDoencaComponent } from '@/features/doencas/components/create-doencas/create-doencas';
import { ListRiscoCirurgicoComponent } from '@/features/risco-cirurgico/components/list-risco-cirurgico/list-risco-cirurgico';
import { CreateRiscoCirurgicoComponent } from '@/features/risco-cirurgico/components/create-risco-cirurgico/create-risco-cirurgico';
import { ListSolicitacaoInternacaoHospitalarComponent } from '@/features/solicitacao-internacao-hospitalar/components/list-solicitacao-internacao-hospitalar/list-solicitacao-internacao-hospitalar';
import { CreateSolicitacaoInternacaoHospitalarComponent } from '@/features/solicitacao-internacao-hospitalar/components/create-solicitacao-internacao-hospitalar/create-solicitacao-internacao-hospitalar';
import { ListPrescricaoMedicaComponent } from '@/features/prescricao-medica/components/list-prescricao-medica/list-prescricao-medica';
import { CreatePrescricaoMedicaComponent } from '@/features/prescricao-medica/components/create-prescricao-medica/create-prescricao-medica';
import { ListEvolucaoMultidisciplinarComponent } from '@/features/evolucao-multidisciplinar/components/list-evolucao-multidisciplinar/list-evolucao-multidisciplinar';
import { CreateEvolucaoMultidisciplinarComponent } from '@/features/evolucao-multidisciplinar/components/create-evolucao-multidisciplinar/create-evolucao-multidisciplinar';

export default [
    { path: 'list-paciente', component: ListagemPacienteComponent },
    { path: 'create-paciente', component: CadastroPacienteComponent },
    { path: 'create-paciente/:id', component: CadastroPacienteComponent },

    { path: 'list-usuario', component: ListagemUsuarioComponent },
    { path: 'create-usuario', component: CadastroUsuarioComponent },
    { path: 'create-usuario/:id', component: CadastroUsuarioComponent },

    { path: 'list-exame', component: ListExameComponent },
    { path: 'create-exame', component: CreateExameComponent },
    { path: 'create-exame/:id', component: CreateExameComponent },

    { path: 'list-medico', component: ListagemMedicoComponent },
    { path: 'create-medico', component: CadastroMedicoComponent },
    { path: 'create-medico/:id', component: CadastroMedicoComponent },

    { path: 'list-cid', component: ListagemCidComponent },
    { path: 'create-cid', component: CadastroCidComponent },
    { path: 'create-cid/:id', component: CadastroCidComponent },

    { path: 'list-procedimento', component: ListagemProcedimentoComponent },
    { path: 'create-procedimento', component: CadastroProcedimentoComponent },
    { path: 'create-procedimento/:id', component: CadastroProcedimentoComponent },

    { path: 'list-doenca', component: ListagemDoencaComponent },
    { path: 'create-doenca', component: CadastroDoencaComponent },
    { path: 'create-doenca/:id', component: CadastroDoencaComponent },

    { path: 'list-solicitacao-exames', component: ListSolicitacaoExamesComponent },
    { path: 'create-solicitacao-exames', component: CreateSolicitacaoExamesComponent },
    { path: 'create-solicitacao-exames/:id', component: CreateSolicitacaoExamesComponent },

    { path: 'list-fila-cirurgica-unificada', component: ListFilaCirurgicaUnificadaComponent },
    { path: 'create-fila-cirurgica-unificada', component: CreateFilaCirurgicaUnificadaComponent },
    { path: 'create-fila-cirurgica-unificada/:id', component: CreateFilaCirurgicaUnificadaComponent },

    { path: 'list-risco-cirurgico', component: ListRiscoCirurgicoComponent },
    { path: 'create-risco-cirurgico', component: CreateRiscoCirurgicoComponent },
    { path: 'create-risco-cirurgico/:id', component: CreateRiscoCirurgicoComponent },

    { path: 'list-solicitacao-internacao-hospitalar', component: ListSolicitacaoInternacaoHospitalarComponent },
    { path: 'create-solicitacao-internacao-hospitalar', component: CreateSolicitacaoInternacaoHospitalarComponent },
    { path: 'create-solicitacao-internacao-hospitalar/:id', component: CreateSolicitacaoInternacaoHospitalarComponent },

    { path: 'list-prescricao-medica', component: ListPrescricaoMedicaComponent },
    { path: 'create-prescricao-medica', component: CreatePrescricaoMedicaComponent },
    { path: 'create-prescricao-medica/:id', component: CreatePrescricaoMedicaComponent },

    { path: 'list-evolucao-multidisciplinar', component: ListEvolucaoMultidisciplinarComponent },
    { path: 'create-evolucao-multidisciplinar', component: CreateEvolucaoMultidisciplinarComponent },
    { path: 'create-evolucao-multidisciplinar/:id', component: CreateEvolucaoMultidisciplinarComponent },

    { path: '**', redirectTo: '/notfound' }
] as Routes;
