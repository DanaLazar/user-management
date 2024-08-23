export interface QueryResult {
  sort: string;
  range: string;
  filter: string;
}

export interface PageRange {
  from: number;
  to: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}


export interface GenericPageProps {
  params: {
    id: string;
  };
}