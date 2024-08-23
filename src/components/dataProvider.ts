import {
  CreateParams,
  CreateResult,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  SortPayload,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';
import { stringify } from 'query-string';
import { PageRange, QueryResult } from './../data/types';

const apiUrl = '/api';
const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  // get a list of records based on sort, filter, and pagination
  getList: async (resource: string, params: GetListParams): Promise<GetListResult> => {
    const { page, perPage } = params.pagination;

    const range = {
      from: (page - 1) * perPage,
      to: page * perPage - 1,
    };

    const query: QueryResult = {
      sort: JSON.stringify(params.sort),
      range: JSON.stringify(range as PageRange),
      filter: JSON.stringify(params.filter as string),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json, headers } = await httpClient(url);
    return {
      data: json.data,
      total: json.total,
    };
  },
  // get a single record by id
  getOne: async (resource: string, params: GetOneParams) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return json;
  },
  // get a list of records based on an array of ids
  getMany: async (resource: string, params: GetManyParams): Promise<GetManyResult> => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
  },
  // get the records referenced to another record, e.g. comments for a post
  getManyReference: async (resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult> => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json, headers } = await httpClient(url);
    return {
      data: json,
      // total: parseInt(headers.get('content-range').split('/').pop(), 10),
    };
  },
  // create a record
  create: async (resource: string, params: CreateParams): Promise<CreateResult> => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },
  // update a record based on a patch
  update: async (resource: string, params: UpdateParams): Promise<UpdateResult> => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return json;
  },
  // update a list of records based on an array of ids and a common patch
  updateMany: async (resource: string, params: UpdateManyParams): Promise<UpdateManyResult> => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },
  // delete a record by id
  delete: async (resource: string, params: DeleteParams): Promise<DeleteResult> => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: 'DELETE',
    });
    return { data: json };
  },
  // delete a list of records based on an array of ids
  deleteMany: async (resource: string, params: DeleteManyParams): Promise<DeleteManyResult> => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      method: 'DELETE',
      body: JSON.stringify(params.ids),
    });
    return { data: json };
  },
};
