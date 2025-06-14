import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { hash } = await request.json();
    
    if (!hash) {
      return NextResponse.json(
        { error: 'Hash manquant' },
        { status: 400 }
      );
    }

    console.log('Tentative de vérification avec le hash:', hash);

    // Vérifier la connexion à la base de données
    try {
      await prisma.$connect();
      console.log('Connexion à la base de données réussie');
    } catch (dbError) {
      console.error('Erreur de connexion à la base de données:', dbError);
      throw new Error('Erreur de connexion à la base de données');
    }

    try {
      const document = await prisma.contract.findFirst({
        select: {
          id: true,
          imageHash: true,
          documentHash: true
        },
        where: {
          OR: [
            { imageHash: hash },
            { documentHash: hash }
          ]
        }
      });

      console.log('Résultat de la recherche:', document);

      if (!document) {
        return NextResponse.json(
          { error: 'Document non trouvé', document: null },
          { status: 404 }
        );
      }

      return NextResponse.json({ document });
    } catch (queryError) {
      console.error('Erreur lors de la requête:', queryError);
      throw new Error('Erreur lors de la recherche dans la base de données: ' + queryError.message);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la vérification du document' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 