export type Application = {
  allowedScopes: string[]
  clientId: string
  consentScreen: {
    appAddress: string
    decription: string | null
    developmentEmail: string
    logo: string | null
    message: string | null
    name: string
    title: string
  }
  createdAt: number
  id: string
  updatedAt: number
  isTrusted: boolean
  name: string
  origins: string[]
  redirectUris: string[]
  secret: string
  state: string
}

export type ClientId = {
  id: string
  name: string
  clientId: string
  createdAt: number
}
