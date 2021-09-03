import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { API_BASE_URL, SEARCH_SERVICE } from './injection-tokens';
import { GitHubSearchService } from './services/search.service';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule
  ],
  exports: [SearchComponent]
})
export class SharedModule {
  public static forRoot(apiBaseUrl: string): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        { 
          provide: SEARCH_SERVICE,
          useClass: GitHubSearchService
        },
        { 
          provide: API_BASE_URL,
          useValue: apiBaseUrl
        }
      ]
    }
  }
}
