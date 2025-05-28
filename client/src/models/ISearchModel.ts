export interface ISearchModel {
    search?: string | undefined,
    tag?: string | undefined,
    offset?: number | undefined,
    limit?: number | undefined,
    yearStart?: number | null,
    yearEnd?: number | null
}