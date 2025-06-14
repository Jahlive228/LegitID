'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

const VERIFIER_ADDRESS = "0xB392856A6CE03bfBf66895532B9f6A5E595355F9";

// Fonction pour extraire le hash d'une URL IPFS
const extractHashFromUrl = (url: string): string => {
  // Si l'URL contient /ipfs/, prendre la partie après
  if (url.includes('/ipfs/')) {
    return url.split('/ipfs/')[1];
  }
  // Sinon retourner l'URL complète (au cas où c'est déjà juste le hash)
  return url;
};

export default function VerifyPage() {
  const [data, setData] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
    documentData?: any;
    error?: string;
  } | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setUserAddress(address);

        if (address.toLowerCase() !== VERIFIER_ADDRESS.toLowerCase()) {
          console.log("Unauthorized address:", address);
          router.push('/');
        }
      } else {
        console.log("MetaMask not installed");
        router.push('/');
      }
    } catch (error) {
      console.error("Erreur lors de la connexion au wallet:", error);
      router.push('/');
    }
  };

  const verifyDocument = async (hash: string) => {
    try {
      console.log("URL complète reçue:", hash);
      const extractedHash = extractHashFromUrl(hash);
      console.log("Hash extrait:", extractedHash);

      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash: extractedHash }),
      });

      const data = await response.json();
      console.log("Réponse de l'API:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la vérification');
      }

      return data.document;
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !data && userAddress) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      const success = async (decodedText: string) => {
        if (!isVerifying) {
          setIsVerifying(true);
          setData(decodedText);
          console.log("QR Code scanné:", decodedText);
          
          try {
            console.log("Début de la vérification du document");
            const document = await verifyDocument(decodedText);
            console.log("Résultat de la vérification:", document);
            
            if (document) {
            setVerificationResult({
              isValid: true,
                message: "Document vérifié avec succès ! Le document est authentique.",
                documentData: document
              });
            } else {
              setVerificationResult({
                isValid: false,
                message: "Document non authentique.",
                error: "Document non trouvé"
              });
            }
          } catch (error) {
            console.error("Erreur lors de la vérification:", error);
            setVerificationResult({
              isValid: false,
              message: "Erreur lors de la vérification du document.",
              error: error instanceof Error ? error.message : "Erreur inconnue"
            });
          } finally {
            setIsVerifying(false);
            scanner.clear();
          }
        }
      };

      const error = (err: any) => {
        console.error("Erreur du scanner:", err);
      };

      scanner.render(success, error);

      return () => {
        scanner.clear();
      };
    }
  }, [data, isVerifying, userAddress]);

  const resetScanner = () => {
    setData(null);
    setVerificationResult(null);
  };

  if (!userAddress) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <p>Connexion au wallet en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Vérification de Document</h2>
          
          <div className="space-y-4">
            {!data && !verificationResult && (
              <div className="aspect-square max-w-sm mx-auto">
                <div id="reader" className="w-full"></div>
                <p className="text-center mt-4 text-black">Placez le QR code devant la caméra</p>
              </div>
            )}

            {isVerifying && (
              <div className="text-center">
                <p className="text-black">Vérification en cours...</p>
              </div>
            )}

            {verificationResult && (
              <div className={`p-4 rounded-lg ${verificationResult.isValid ? 'bg-green-100' : 'bg-red-100'}`}>
                <h3 className="font-bold mb-2 text-black">
                  {verificationResult.isValid ? '✅ Document Authentique' : '❌ Vérification Échouée'}
                </h3>
                <p className="text-black">{verificationResult.message}</p>
                {verificationResult.error && (
                  <p className="text-red-600 mt-2">Détail de l&apos;erreur: {verificationResult.error}</p>
                )}
                {verificationResult.documentData && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-black">Détails du document :</h4>
                    <pre className="bg-gray-50 p-2 rounded mt-2 overflow-x-auto text-black">
                      {JSON.stringify(verificationResult.documentData, null, 2)}
                    </pre>
                  </div>
                )}
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={resetScanner}
                >
                  Scanner un autre document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 