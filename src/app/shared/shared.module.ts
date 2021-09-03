import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { API_BASE_URL, SEARCH_SERVICE } from './injection-tokens';
import { GitHubSearchService } from './github/search.service';


@NgModule({
  declarations: [],
  imports: [HttpClientModule]
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
