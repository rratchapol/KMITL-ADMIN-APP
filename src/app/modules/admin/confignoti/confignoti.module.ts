import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { ConfignotiComponent } from './confignoti.component';
import { FormsModule } from '@angular/forms';
import { ConfignotiRoute } from './confignoti.routes';

// import moment from 'moment';

@NgModule({
    declarations: [
        ConfignotiComponent,
    ],
    imports: [
        RouterModule.forChild(ConfignotiRoute),
        ShareModule,
        FormsModule,
        NgxDropzoneModule,
    ],
})
export class ConfignotiModule {}
