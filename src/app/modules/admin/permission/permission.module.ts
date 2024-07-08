import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { PermissionRoute } from './permission-routing';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from 'app/share.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import moment from 'moment';

@NgModule({
    declarations: [ListComponent, FormComponent, EditComponent],
    imports: [
        RouterModule.forChild(PermissionRoute),
        ShareModule,
        NgxDropzoneModule,
        MatCheckboxModule,
    ],
})
export class PermissionModule {}
