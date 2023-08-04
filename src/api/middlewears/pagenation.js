

function paginationMiddleware(req, res, next) {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size of 10 if not provided
    const skip = (page - 1) * pageSize;
  
    req.pagination = {
      page,
      pageSize,
      skip
    };
  
    next();
  }
  

  module.exports =paginationMiddleware;