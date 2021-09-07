import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { API_BASE_URL, API_SERVICE } from './injection-tokens';
import { GitHubService } from './services/github.service';
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
  public static forRoot(apiBaseUrl: string): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        { 
          provide: API_SERVICE,
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
