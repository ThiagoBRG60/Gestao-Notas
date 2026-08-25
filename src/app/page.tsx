"use client"
import { getInvoices, processInvoice } from "@/services/invoices"
import { InvoiceProps, InvoiceStatus, InvoiceStatusType } from "@/types/invoices"
import { ChangeEvent, useEffect, useState } from "react"

function Home() {
	const [invoices, setInvoices] = useState<InvoiceProps[]>([])

	useEffect(() => {
		async function initializeInvoices() {
         try {
            const data = await getInvoices()
            setInvoices(data)
         } catch (error) {
            console.error(error)
         }
		}
		initializeInvoices()
	}, [])

	async function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
		const filter = e.currentTarget.value

      try {
         const data = !filter ? await getInvoices() : await getInvoices(filter as InvoiceStatusType)
         setInvoices(data)
      } catch (error) {
         console.error(error)
      }
	}

	async function handleClick(id: number) {
      try {
         await processInvoice(String(id))
         setInvoices((prev) => prev.map((item) => (item.id === id ? { ...item, status: InvoiceStatus.PROCESSED } : item)))
      } catch (error) {
         console.error(error)
      }
	}

	return (
		<div className="w-full flex flex-col gap-5 p-5 bg-slate-50">
			<div className="w-full flex flex-col gap-2">
				<label htmlFor="filter" className="font-medium text-sm text-slate-700">
					Filtro
				</label>

				<select onChange={handleFilter} id="filter" className="w-full h-11 px-3 border border-slate-200 rounded-lg font-normal text-sm text-slate-700 outline-none transition duration-200 bg-white focus:border-slate-400">
					<option value="">Selecione uma opção</option>
					<option value="PENDING">Pendentes</option>
					<option value="PROCESSED">Processadas</option>
					<option value="CANCELED">Canceladas</option>
				</select>
			</div>

			<ul className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white">
				{invoices.length > 0 ? (
					invoices.map((invoice) => (
						<li key={invoice.id} className="w-full flex flex-col gap-5 p-5 border-b border-slate-100 last:border-b-0 sm:grid sm:grid-cols-2 lg:grid-cols-7">
							<div className="flex flex-col gap-1">
								<span className="font-medium text-xs text-slate-500">Número</span>
								<span className="font-medium text-sm text-slate-900">{invoice.number}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="font-medium text-xs text-slate-500">CNPJ</span>
								<span className="font-medium text-sm text-slate-900">{invoice.cnpj}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="font-medium text-xs text-slate-500">Tipo</span>
								<span className="font-medium text-sm text-slate-900">{invoice.type}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="font-medium text-xs text-slate-500">Valor</span>
								<span className="font-medium text-sm text-slate-900">{invoice.amount}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="font-medium text-xs text-slate-500">Data</span>
								<span className="font-medium text-sm text-slate-900">{invoice.issued_at}</span>
							</div>

							<div className="flex flex-col gap-1">
								<span className="font-medium text-xs text-slate-500">Status</span>
								<span className="w-fit px-2 py-1 rounded-md font-medium text-xs text-amber-700 bg-amber-50">{invoice.status}</span>
							</div>

							{invoice.status === InvoiceStatus.PENDING && (
								<button onClick={() => handleClick(invoice.id)} className="w-full h-10 px-4 cursor-pointer border border-slate-200 rounded-lg font-medium text-sm text-slate-700 transition duration-200 bg-white hover:border-slate-300 hover:bg-slate-50 lg:w-auto">
									Processar
								</button>
							)}
						</li>
					))
				) : (
					<p className="px-3.75 py-2.5">Nenhuma nota fiscal encontrada</p>
				)}
			</ul>
		</div>
	)
}

export default Home