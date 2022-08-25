import { PrismaClient } from '@prisma/client'
import { AuthInfo } from '~/types'

export const prisma = new PrismaClient()

export const getOrCreateAccount = async ({
  login_address,
  login_network,
  login_username,
  login_method,
}: AuthInfo) => {
  let account = await prisma.accounts.findFirst({
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

  if (!account) {
    account = await prisma.accounts.create({
      data: {
        username: '',
        addresses: {
          create: [
            {
              network: login_network,
              address: login_address,
            },
          ],
        },
      },
      include: {
        addresses: true,
      },
    })
  }

  if (!account) {
    console.log('Error finding or creating account with login_address', {
      login_address,
      login_network,
    })
  }

  return account
}
