export interface IPaginationModel<T> {
    limit: number,
    offset: number,
    tag: string,
    search: string,
    data: T[],
    total: number
}