import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import PinataClient, { PinataPinOptions, PinataConfig } from "@pinata/sdk";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const data = Object.fromEntries(formData.entries());
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Créer le dossier images s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sauvegarder le fichier
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    const stream = fs.createReadStream(filePath);
    
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: data.firstname as string
      },
    };

    const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;
    
    if (!PINATA_API_KEY || !PINATA_API_SECRET) {
      return NextResponse.json(
        { error: "Pinata credentials not configured" },
        { status: 500 }
      );
    }

    const pinataConfig: PinataConfig = {
      pinataApiKey: PINATA_API_KEY,
      pinataSecretApiKey: PINATA_API_SECRET,
      pinataJWTKey: PINATA_JWT
    };

    const pinata = new PinataClient(pinataConfig);
    const result = await pinata.pinFileToIPFS(stream, options);

    const updatedRequestValue = {
      ...data,
      image: result.IpfsHash
    };

    const jsonpin = await pinata.pinJSONToIPFS(updatedRequestValue);
    
    // Nettoyer le fichier temporaire
    fs.unlinkSync(filePath);

    return NextResponse.json({
      image: result.IpfsHash,
      document: jsonpin.IpfsHash
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}