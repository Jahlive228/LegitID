import DataTable, { Cards, columns } from "./datatable";
import { getContracts } from "../utils/db";

async function getData():Promise<Cards[]> {
  // Fetch data from your API here.
  const data = await getContracts();
  return data.map(contract => ({
    imgHash: contract.imageHash,
    docHash: contract.documentHash,
  }));
 
}

export default async function ListCard() {
  const data = await getData();
  return (
    <main className=" w-[55rem]  flex justify-center items-center flex-col">
      <h1 className="text-6xl text-black mb-8 font-bold ">Liste des cartes d&apos;identité</h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
