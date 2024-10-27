import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { CursorRefComponent } from './components/cursor-ref/cursor-ref.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MetaDataComponent } from './components/meta-data/meta-data.component';
import { ManageMetaDataComponent } from './components/meta-data/manage-meta-data/manage-meta-data.component';
import { AlignmentRefComponent } from './components/alignment-ref/alignment-ref.component';
import { DragDirective } from './directives/drag.directive';
import { KeyPressActionComponent } from './components/key-press-action/key-press-action.component';
import { ExportImportJsonComponent } from './components/control-panel/export-import-json/export-import-json.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { EditMetaDataComponent } from './components/meta-data/manage-meta-data/edit-meta-data/edit-meta-data.component';
import { CaptureScreenComponent } from './components/control-panel/capture-screen/capture-screen.component';
import { GenerateCodeComponent } from './components/control-panel/generate-code/generate-code.component';
import { ThemeConfigComponent } from './components/control-panel/theme-config/theme-config.component';


@NgModule({
  declarations: [
    AppComponent,
    CursorRefComponent,
    ContextMenuComponent,
    MetaDataComponent,
    ManageMetaDataComponent,
    AlignmentRefComponent,
    DragDirective,
    KeyPressActionComponent,
    ExportImportJsonComponent,
    ControlPanelComponent,
    EditMetaDataComponent,
    CaptureScreenComponent,
    GenerateCodeComponent,
    ThemeConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
