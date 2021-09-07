import { Inject, Injectable } from "@angular/core";
import { map, mergeMap } from "rxjs/operators";
import { API_SERVICE, ApiService } from "../../shared";
import { IssuesSearchResponse } from "../../shared/api-response-objects/issue-search.response";
import { Item, RepositoryResponse } from "../../shared/api-response-objects/repository-search.response";
import { Repository } from "../interfaces";

@Injectable()
export class RepositoryService {
    constructor(@Inject(API_SERVICE) private readonly searchService: ApiService) { }

    public search(searchText: string, page: number) {
        // call services here
       /*  return this.searchService.searchIssues(searchText)
            .pipe(mergeMap((issues) => {
                const repos = mapIssueResponse(issues);
                repos.push(searchText);
                const uniqueRepos = new Set(repos);

                const _searchText = [...uniqueRepos].join('+');
                console.log(_searchText);
                
            })); */
        return this.searchService.searchRepositories(searchText, page)
            .pipe(map((res) => ({
                count: res.total_count,
                items: res.items.map(mapRepositoryResponse)
            })));
    }
}

function mapIssueResponse(response: IssuesSearchResponse) {
    return response.items.map((i) => {
        return getRepoFullNameFromUrl(i.repository_url)
    });
}

function getRepoFullNameFromUrl(repoUrl: string) {
    const splitted = repoUrl.split('/');
    const owner = splitted[splitted.length - 1];
    const repo = splitted[splitted.length - 2];

    return `${owner}/${repo}`;
}

function mapRepositoryResponse(i: Item) {
    return {
        name: i.full_name,
        avatarUrl: i.owner.avatar_url,
        createdAt: i.created_at,
        language: i.language,
        stars: i.stargazers_count
    } as Repository;
}

