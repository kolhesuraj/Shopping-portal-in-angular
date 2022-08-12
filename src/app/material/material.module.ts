import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'

const module = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  ReactiveFormsModule,
  FormsModule,
  MatDialogModule,
];

@NgModule({
  imports: [module],
  exports: [module],
})
export class MaterialModule {}
