import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

import { API_BASE_URL, SEARCH_SERVICE } from './injection-tokens';
import { GitHubService } from './services/github.service';
import { SearchComponent } from './components/search/search.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    SearchComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule,
    MatSelectModule,
    MatSliderModule
  ],
  exports: [SearchComponent, FilterComponent]
})
export class SharedModule {
  public static forRoot(apiBaseUrl: string): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        { 
          provide: SEARCH_SERVICE,
          useClass: GitHubService
        },
        { 
          provide: API_BASE_URL,
          useValue: apiBaseUrl
        }
      ]
    }
  }
}
