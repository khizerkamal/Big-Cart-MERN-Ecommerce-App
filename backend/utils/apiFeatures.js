class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryObj = { ...this.queryStr }; // Hard copy (Deep Copy) of req.query fields in queryOBJ
        //const queryObj = this.queryString ->  Shallow Copy -> holds reference
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        excludedFields.forEach((el) => delete queryObj[el]); // delete -> part of js
    
        // 1B) Advanced filtering
        //127.0.0.1: 8000 / api / v1 / tours ? difficulty = easy & duration[ gte ]=5 & page=2 & sort=2 & limit=5
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //{ difficulty: 'easy', duration: { '$gte': '5' } }
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
    }
    
    paginate() {
        // page=2&limit=10, 1-10 -> page 1, 11-20 -> page2, 21-30 -> page3
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 4;
        const skip = (page - 1) * limit;
    
        this.query = this.query.skip(skip).limit(limit);
    
        return this;
      }
}

module.exports = APIFeatures;