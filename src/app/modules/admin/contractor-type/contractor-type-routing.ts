import { Route, } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';

export const ContractorTypeRoute: Route[] = [
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'form',
        component: FormComponent
    },
    {
        path: 'edit/:id',
        component: EditComponent
    },

];
