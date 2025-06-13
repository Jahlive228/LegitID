import { useEffect, useState } from 'react'

// Définit la largeur d'écran en dessous de laquelle on considère qu'il s'agit d'un mobile
const MOBILE_BREAKPOINT = 768 // correspond à md: dans Tailwind

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Vérifie si window est défini (côté client)
    if (typeof window === 'undefined') return

    // Fonction pour mettre à jour l'état en fonction de la largeur de l'écran
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Appel initial
    handleResize()

    // Ajoute un écouteur d'événement pour le redimensionnement
    window.addEventListener('resize', handleResize)

    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}
