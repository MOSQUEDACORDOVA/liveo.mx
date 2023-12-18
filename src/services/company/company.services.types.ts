export interface CompanySendEmail {
  email: string;
  name: string;
  message: string;
}

export interface AddCompanyFavoriteRequest {
  companyId: number;
}

export interface RemoveCompanyFavoriteRequest
  extends AddCompanyFavoriteRequest {}
