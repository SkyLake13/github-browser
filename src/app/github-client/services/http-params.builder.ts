import { HttpParams } from "@angular/common/http";

export class HttpParamsBuilder {
    private httpParams = new HttpParams();
    public setPage(page: number) {
        this.httpParams = this.httpParams.set('page', page);
        return this;
    }

    public setPerPage(count: number) {
        this.httpParams = this.httpParams.set('per_page', count);
        return this;
    }

    public setQuery(query: string) {
        this.httpParams = this.httpParams.set('q', query);
        return this;
    }

    public setOrder(order: 'desc' | 'asc' = 'desc') {
        this.httpParams = this.httpParams.set('order', order);
        return this;
    }

    public build() {
        return this.httpParams;
    }
}