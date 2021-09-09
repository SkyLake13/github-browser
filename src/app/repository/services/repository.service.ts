import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { API_SERVICE, RepositoryItem, ApiService } from "../../github-client";
import { Repository } from "../interfaces";

@Injectable()
export class RepositoryService {
    constructor(@Inject(API_SERVICE) private readonly apiService: ApiService) { }

    public search(searchText: string, page: number) {
        return this.apiService.searchRepositories(searchText, page)
            .pipe(map((res) => ({
                count: res.total_count,
                items: res.items.map(mapRepositoryResponse)
            })));
    }
}

function mapRepositoryResponse(i: RepositoryItem) {
    return {
        name: i.full_name,
        avatarUrl: i.owner.avatar_url,
        createdAt: i.created_at,
        language: i.language,
        stars: i.stargazers_count
    } as Repository;
}

