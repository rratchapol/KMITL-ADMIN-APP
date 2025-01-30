import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { NewsRoute } from './news-routing';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { ShareModule } from 'app/modules/share.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill'; // Updated import statement
import { C } from '@fullcalendar/core/internal-common';
import { CheckproductComponent } from './checkproduct/list.component';

@NgModule({
    declarations: [
        ListComponent,
        FormComponent,
        EditComponent,
        EditDialogComponent,
        FormDialogComponent,
        CheckproductComponent
    ],
    imports: [
        RouterModule.forChild(NewsRoute),
        ShareModule,
        NgxDropzoneModule,
        QuillModule.forRoot({
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                    [{ direction: 'rtl' }], // text direction

                    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ['clean'], // remove formatting button

                    ['link', 'image', 'video'], // link and image, video
                ],
            },
        }),
    ],
})
export class NewsModule {}
