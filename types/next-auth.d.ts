import "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      accessToken?: string
    }
  }

  interface User {
    accessToken?: string
  }
}
