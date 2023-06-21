export interface ISearchOptions<T> {
    limit?: number;
    offset?: number;
    order?: [keyof T, 'asc' | 'desc'][]
}

export interface IMultiplyResponse<T> {
    list: T[],
    options: ISearchOptions<T>,
    count: number,
}