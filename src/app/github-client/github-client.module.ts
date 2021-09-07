import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { API_BASE_URL, API_SERVICE } from "./injection-tokens";
import { GitHubService } from "./services/github.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: API_SERVICE,
            useClass: GitHubService
        }
    ]
})
export class GithubClientModule {
    public static forRoot(apiBaseUrl: string): ModuleWithProviders<GithubClientModule> {
        return {
            ngModule: GithubClientModule,
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