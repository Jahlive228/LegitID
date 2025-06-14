import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function SaveCard(img: string, doc: string) {
  await prisma.contract.create({
    data: {
      imageHash: img,
      documentHash: doc,

    },
  })

}

export async function SaveUser(addressU: string, roleU: string) {
  await prisma.user.create({
    data: {
      address: addressU,
      role: roleU,

    },
  })
}
export async function DeleteUser(addressU: string,) {
  await prisma.user.delete({
    where: {
      address: addressU,
    }})

    }
  
    export async function Count(roleU: string,) {
      const result = await prisma.user.count({
        where: {
          role: {
            equals: roleU,
          },
        },
      
      })
      return result
    }

async function getContracts() {
  const allContracts = await prisma.contract.findMany()
  console.log(allContracts)
  return allContracts;
}
export  { getContracts};


export async function countContract(){
  const allContractCount=prisma.contract.count()
  return allContractCount;
}

export async function verifyDocumentByHash(hash: string) {
  try {
    console.log("Début de la vérification du document avec le hash:", hash);
    const document = await prisma.contract.findFirst({
      where: {
        OR: [
          { imageHash: hash },
          { documentHash: hash }
        ]
      }
    });
    console.log("Résultat de la vérification:", document);
    return document;
  } catch (error) {
    console.error("Erreur lors de la vérification du document:", error);
    throw error;
  }
}

