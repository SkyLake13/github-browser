import { HttpParamsBuilder } from "./http-params.builder"

describe('HttpParamsBuilder', () => {
    let httpParamsBuilder: HttpParamsBuilder;

    beforeEach(() => {
        httpParamsBuilder = new HttpParamsBuilder();
    });

    it('should instantiate', () => {
        expect(httpParamsBuilder).toBeDefined();
    });

    it('should set page', () => {
        const page = 2;
        const httpParams = httpParamsBuilder
                            .setPage(page)
                            .build();
        expect(httpParams.get('page')).toEqual(String(page));
    });

    it('should set per page', () => {
        const perPage = 20;
        const httpParams = httpParamsBuilder
                            .setPerPage(perPage)
                            .build();
        expect(httpParams.get('per_page')).toEqual(String(perPage));
    });

    it('should set query', () => {
        const query = 'repo:abhi/github+test';

        const httpParams = httpParamsBuilder
                            .setQuery(query)
                            .build();
        expect(httpParams.get('q')).toEqual(query);
    });

    it('should set order', () => {
        const order = 'asc';

        const httpParams = httpParamsBuilder
                            .setOrder(order)
                            .build();
        expect(httpParams.get('order')).toEqual(order);
    });

    it('should set default order', () => {
        const defaultOrder = 'desc';

        const httpParams = httpParamsBuilder
                            .setOrder()
                            .build();
        expect(httpParams.get('order')).toEqual(defaultOrder);
    });

    it('should return HttpParams object', () => {
        const httpParams = httpParamsBuilder
                            .build();
        expect(httpParams).toBeDefined();
    });
})