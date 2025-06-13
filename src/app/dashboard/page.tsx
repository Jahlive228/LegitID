import { AppSidebar } from "../../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import { Separator } from "../../components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar2"
import { countContract, Count } from "../../utils/db"

async function getCardsCount() {
  const cards = await countContract();
  return cards;
}

async function getCount(role: string) {
  return await Count(role);
}

export default async function Page() {
  const cardsCount = await getCardsCount();
  const issuerCount = await getCount('Issuer');
  const verifierCount = await getCount('Verifier');

  return (
    <SidebarProvider className="flex min-h-screen overflow-hidden bg-black">
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 bg-black transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-gray-800"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-gray-300 hover:text-white">
                    Tableau de bord
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-gray-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">Accueil</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-black">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-white shadow-lg hover:shadow-purple-500/10 transition-all duration-200 aspect-video rounded-xl p-6 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Nombre d&apos;agents de bureau</h3>
              <p className="text-4xl font-bold text-purple-600">{issuerCount}</p>
            </div>
            <div className="bg-white shadow-lg hover:shadow-purple-500/10 transition-all duration-200 aspect-video rounded-xl p-6 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Nombre d&apos;agents de vérification</h3>
              <p className="text-4xl font-bold text-purple-600">{verifierCount}</p>
            </div>
            <div className="bg-white shadow-lg hover:shadow-purple-500/10 transition-all duration-200 aspect-video rounded-xl p-6 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Nombre de cartes créées</h3>
              <p className="text-4xl font-bold text-purple-600">{cardsCount}</p>
            </div>
          </div>
          <div className="bg-white shadow-lg min-h-[calc(100vh-16rem)] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
