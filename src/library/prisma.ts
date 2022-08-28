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
    const data_new_account = {
      username: login_username,
      addresses: login_address
        ? {
            create: [
              {
                network: login_network,
                address: login_address,
              },
            ],
          }
        : undefined,
    }
    console.log('create account ', JSON.stringify(data_new_account))
    account = await prisma.accounts.create({
      data: data_new_account,
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
