/* eslint-disable prettier/prettier */
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        (this.modelQuery = modelQuery);
        (this.query = query)
    }
    search(searchableFields: string[]) {
        const search = this?.query?.search
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                }) as FilterQuery<T>),
            });
        }
        return this;
    }

    filter() {
        // Filtering
        const queryObj = { ...this.query };
        const excludeFields = ['search', 'sortBy', 'sortOrder'];
        excludeFields.forEach((el) => delete queryObj[el]);
        if(queryObj.filter){
            this.modelQuery = this.modelQuery.find({ author: queryObj.filter as FilterQuery<T> });
        }
        return this
    }

    sortBy() {
         const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string)
        return this;
    }
    sortOrder() {
        const sortField = this.query.sort || '-createdAt';
        const sortOrder = this.query.sortOrder === 'asc' ? '' : '-';
        this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortField}`);
        return this;
    }
}
export default QueryBuilder;