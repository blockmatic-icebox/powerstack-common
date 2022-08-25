import { PrismaClient } from '@prisma/client'
import { AuthInfo } from '~/types'

export const prisma = new PrismaClient()

export const getOrCreateAccount = async ({
  login_address,
  login_network,
  login_username,
  login_method,
}: AuthInfo) => {
  const account = await prisma.accounts.findFirst({
    where: {
      addresses: {
        some: {
          address: login_address,
          network: login_network,
        },
      },
    },
    include: {
      addresses: true,
    },
  })
  return account
}
