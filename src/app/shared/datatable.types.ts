export interface DataTablesResponse {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
        sortBy: [];
        filter: {};
    };
}
