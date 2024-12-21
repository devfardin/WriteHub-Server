/* eslint-disable prettier/prettier */
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        (this.modelQuery = modelQuery);
        (this.query = query)
    }
    search(searchAbleFields: string[]) {
        const search = this?.query?.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((fields) => ({
                    [fields]: { $regex: search, $options: 'i' }
                }) as FilterQuery<T>)
            })
        }
        return this;
    }
    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((item) => delete queryObj[item]);
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>
        )
        return this;
    }
    sortBy() {
        const sortBy = (this.query.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sortBy as string)
        return this;
    }
    sortOrder() {
        const sortOrder = this.query.order === 'asc' ? '' : '-'; // Default to 'desc'
        this.modelQuery = this.modelQuery.sort(sortOrder);
        return this;
    }
}
export default QueryBuilder;