import { InvoiceStatusType } from "@/types/invoices"

async function getInvoices(filter?: InvoiceStatusType) {
   const response = await fetch(filter ? `/api/invoices?status=${filter.trim()}` : "/api/invoices")

   if (!response.ok) throw new Error("Erro ao buscar as notas fiscais")

   return response.json()
}

async function processInvoice(id: string) {
   const response = await fetch(`/api/invoices/${id.trim()}/process`, {method: "PATCH"})

   if (!response.ok) throw new Error("Erro ao processar a nota fiscal")

   return response.json()
}

export { getInvoices, processInvoice }