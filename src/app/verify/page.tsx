'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [data, setData] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
    documentData?: any;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !data) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      const success = async (decodedText: string) => {
        if (!isVerifying) {
          setIsVerifying(true);
          setData(decodedText);
          try {
            // Décodage des données du QR code
            const decodedData = JSON.parse(decodedText);
            
            // TODO: Ajouter la logique de vérification avec le smart contract
            // Exemple de vérification (à adapter selon votre smart contract) :
            /*
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const isValid = await contract.verifyDocument(decodedData.id);
            */

            // Pour l'instant, simulation de la vérification
            setVerificationResult({
              isValid: true,
              message: "Document vérifié avec succès !",
              documentData: decodedData
            });

            // Arrêter le scanner après une lecture réussie
            scanner.clear();
          } catch (error) {
            setVerificationResult({
              isValid: false,
              message: "Erreur lors de la vérification du document."
            });
          } finally {
            setIsVerifying(false);
          }
        }
      };

      const error = (err: any) => {
        console.error(err);
      };

      scanner.render(success, error);

      // Cleanup function
      return () => {
        scanner.clear();
      };
    }
  }, [data, isVerifying]);

  const resetScanner = () => {
    setData(null);
    setVerificationResult(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Vérification de Document</h2>
          
          <div className="space-y-4">
            {!data && !verificationResult && (
              <div className="aspect-square max-w-sm mx-auto">
                <div id="reader" className="w-full"></div>
                <p className="text-center mt-4">Placez le QR code devant la caméra</p>
              </div>
            )}

            {isVerifying && (
              <div className="text-center">
                <p>Vérification en cours...</p>
              </div>
            )}

            {verificationResult && (
              <div className={`p-4 rounded-lg ${verificationResult.isValid ? 'bg-green-100' : 'bg-red-100'}`}>
                <h3 className="font-bold mb-2">
                  {verificationResult.isValid ? '✅ Document Authentique' : '❌ Vérification Échouée'}
                </h3>
                <p>{verificationResult.message}</p>
                {verificationResult.documentData && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Détails du document :</h4>
                    <pre className="bg-gray-50 p-2 rounded mt-2 overflow-x-auto">
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