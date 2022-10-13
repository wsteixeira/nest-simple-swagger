import { Like } from 'typeorm';

// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
export const HttpMessage = {
  BAD_REQUEST: {
    code: '400',
    message: 'Bad request',
    detailedMessage:
      'The server cannot or will not process the request due to an apparent client error.',
  },
  UNAUTHORIZED: {
    code: '401',
    message: 'Unauthorized',
    detailedMessage:
      'Authentication is required and has failed or has not yet been provided.',
  },
  NOT_FOUND: {
    code: '404',
    message: 'No data found',
    detailedMessage:
      'The requested resource could not be found but may be available in the future.',
  },
};

export abstract class Utils {
  static getSearch(query, columns: Array<any>) {
    const { search } = query;
    let searchColumns: Array<any>;

    if (search) {
      searchColumns = [];
      columns.forEach((item) => {
        if (item.type === String) {
          searchColumns.push({ [item.propertyName]: Like(`%${search}%`) });
        }
      });
    }
    return searchColumns;
  }

  static getTake(query) {
    return +query.pageSize || 20;
  }

  static getSkip(query) {
    const take = this.getTake(query);

    return +query.page ? (+query.page - 1) * take : 0;
  }

  static getOrder(query) {
    if (query.order) {
      if (query.order.indexOf('-') > -1) {
        return { [query.order.replace('-', '')]: 'DESC' };
      } else {
        return { [query.order]: 'ASC' };
      }
    }
    return {};
  }
}
