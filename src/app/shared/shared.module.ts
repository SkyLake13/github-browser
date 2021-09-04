import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { API_BASE_URL, SEARCH_SERVICE } from './injection-tokens';
import { GitHubService } from './services/github.service';
import { SearchComponent } from './components/search/search.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SearchComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule
  ],
  exports: [SearchComponent, DataTableComponent]
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
