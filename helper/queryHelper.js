class QueryHelper {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        const queryObj = { ...this.queryStr };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        if (queryObj.startDate && queryObj.endDate) {
            queryObj.createdAt = { gte: new Date(queryObj["startDate"]), lte: new Date(queryObj["endDate"]) }
        } else if (queryObj.startDate) {
            queryObj.createdAt = { gte: new Date(queryObj["startDate"]) }
        } else if (queryObj.endDate) {
            queryObj.createdAt = { lte: new Date(queryObj["endDate"]) }
        }
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    paginate() {
        const page = parseInt(this.queryStr.page) || 1;
        const limit = parseInt(this.queryStr.limit) || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = QueryHelper;