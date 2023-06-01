class APIFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }

   cartId() {
      const user_id = this.queryStr.userid;
      this.query = this.queryStr.find({ ...user_id });
   }

   search() {
      const name = this.queryStr.name
         ? {
              name: {
                 $regex: this.queryStr.name,
                 $options: "i",
              },
           }
         : {};
      this.query = this.query.find({ ...name });

      return this;
   }

   filterByPrice() {
      const { minPrice, maxPrice } = this.queryStr;

      const priceFilter = {};
      if (minPrice !== undefined) {
         priceFilter.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined) {
         priceFilter.$lte = Number(maxPrice);
      }

      if (Object.keys(priceFilter).length > 0) {
         this.query = this.query.find({ price: priceFilter });
      }

      return this;
   }

   pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resultPerPage * (currentPage - 1);

      this.query = this.query.limit(resultPerPage).skip(skip);

      return this;
   }
}

module.exports = APIFeatures;
