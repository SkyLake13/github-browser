import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Repository } from "../interfaces";
import { RepositoryService } from "../repository.service";

@Injectable()
export class RepositoryTableDataSource implements DataSource<Repository> {
    constructor(private readonly repositoryService: RepositoryService) {
        
     }

    connect(collectionViewer: CollectionViewer): Observable<readonly Repository[]> {
        return this.data$.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.data$.complete();
    }

    search(query: string) {
        return this.repositoryService.search(query, 1)
        .pipe(tap((res) => this.data$.next(res)));
    }

    private data$ = new BehaviorSubject<Repository[]>([]);

}