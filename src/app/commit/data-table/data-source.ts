import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CommitService } from "../commit.service";
import { Commit } from "../interfaces";

@Injectable()
export class CommitTableDataSource implements DataSource<Commit> {
    constructor(private readonly commitService: CommitService) {
        
     }

    connect(collectionViewer: CollectionViewer): Observable<readonly Commit[]> {
        return this.data$.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.data$.complete();
    }

    searchCommits(repo: string, query: string) {
        return this.commitService.search(repo, query, 1)
            .pipe(tap((res) => this.data$.next(res)));
    }

    getCommits(repo: string) {
        return this.commitService.getCommits(repo, 1)
            .pipe(tap((res) => this.data$.next(res)));
    }

    private data$ = new BehaviorSubject<Commit[]>([]);

}