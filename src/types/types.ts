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

export type UpdatedAppDetails = {
  name?: string
  redirectUri?: string
  origins?: string[]
  consentScreen?: Partial<ConsentScreen>
}

export type updatedConsentDetails = {
  name?: string
  title?: string
  message?: string | null
  logo?: string | null
  developerEmail?: string
  appAddress?: string
  decription?: string | null
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

export type NewAppInfo = {
  name: string
  redirectUri: string[]
  origins: string[]
  title: string
  logo: string | null
  developerEmail: string
  appAddress: string
  message: string | null
}
