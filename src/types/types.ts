export type Application = {
  allowedScopes: string[]
  clientId: string
  consentScreen: ConsentScreen
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

export type ConsentScreen = {
  appAddress: string
  decription: string | null
  developerEmail: string
  logo: string | null
  message: string | null
  name: string
  title: string
}

export type ClientId = {
  id: string
  name: string
  clientId: string
  createdAt: number
}
