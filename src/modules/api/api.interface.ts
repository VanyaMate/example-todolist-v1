export interface ISearchOptions<T> {
    limit?: number;
    offset?: number;
    order?: [keyof T, 'ask' | 'desk'][]
}

export interface IMultiplyResponse<T> {
    list: T[],
    options: ISearchOptions<T>,
    count: number,
}