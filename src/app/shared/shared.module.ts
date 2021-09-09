import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SearchComponent } from './components/search/search.component';
import { CommonModule } from '@angular/common';
import { UiContainerComponent } from './components/ui-container/ui-container.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    SearchComponent,
    UiContainerComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [SearchComponent, UiContainerComponent, NavigationComponent]
})
export class SharedModule {
  
}
