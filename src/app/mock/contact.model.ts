export class CmContact {
  id: number;
  username: string;
  // password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address:string;
  gender?: string;
  company?:string;
  email?: string;
  friends?: number[] = [];
  birthday?: Date;
  favorite?: boolean;
  note?: string;
}

export class CmPagingContacts {
  total: number;
  contacts: CmContact[];
}
