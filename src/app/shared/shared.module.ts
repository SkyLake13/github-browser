import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SearchComponent } from './components/search/search.component';
import { CommonModule } from '@angular/common';
import { UiContainerComponent } from './components/ui-container/ui-container.component';

@NgModule({
  declarations: [
    SearchComponent,
    UiContainerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [SearchComponent, UiContainerComponent]
})
export class SharedModule {
  
}
