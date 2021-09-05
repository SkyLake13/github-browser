import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Repository } from "../interfaces";
import { RepositoryService } from "../repository.service";

@Injectable()
export class RepositoryTableDataSource implements DataSource<Repository> {
    public get languages$() {
        return this.data$.pipe(map((repos) => [...new Set(repos.map((r) => r.language))]));
    }

    public get stars$() {
        return this.data$.pipe(map((repos) => repos.map((r) => r.stars)));
    }

    constructor(private readonly repositoryService: RepositoryService) { }

    public connect(collectionViewer: CollectionViewer): Observable<readonly Repository[]> {
        return this.data$.asObservable();
    }

    public disconnect(): void {
        this.data$.complete();
    }

    public search(query: string) {
        return this.repositoryService.search(query, 1)
        .pipe(tap((res) => this.data$.next(res)));
    }

    public filterByLangauges(langauges: string[]) {
        this.data$.next(this.data$.value.filter((r) => langauges.includes(r.language)));
    }

    public filterByMinStarsCount(minStar: number | null) {
        if(minStar){
            this.data$.next(this.data$.value.filter((r) => r.stars >= minStar));
        }
    }

    private data$ = new BehaviorSubject<Repository[]>([]);
}