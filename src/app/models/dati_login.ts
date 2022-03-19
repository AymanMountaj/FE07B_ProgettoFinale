export interface DatiLogin {
  id?: number,
  username: string,
  email: string
  roles?: Array<string>
  accessToken?: string,
  tokenType?: string
}
