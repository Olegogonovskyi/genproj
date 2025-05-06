export interface IPaginationModel<T> {
    page?: number,
    limit: number,
    offset: number,
    tag: string,
    search: string,
    data: T[],
    total: number,
}