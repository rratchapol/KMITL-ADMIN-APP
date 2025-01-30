import { Route, } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { C } from '@fullcalendar/core/internal-common';
import { CheckproductComponent } from './checkproduct/list.component';

export const NewsRoute: Route[] = [
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
        component: FormComponent
    },
    {
        path: 'check',
        component: CheckproductComponent
    },

];
