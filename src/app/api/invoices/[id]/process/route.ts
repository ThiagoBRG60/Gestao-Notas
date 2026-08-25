import { NextResponse } from "next/server"
import { InvoiceStatus } from "@/types/invoices"
import sql from "@/lib/db"

async function PATCH(request: Request, { params }: { params: Promise<{id: string}> }) {
   const { id } = await params

   if (!id.trim() || Number.isNaN(Number(id.trim()))) return NextResponse.json({message: "O parâmetro 'id' enviado é inválido"}, {status: 400})

   try {
      const [invoice] = await sql`SELECT status FROM invoices WHERE id = ${id}`

      if (!invoice) return NextResponse.json({message: "A nota não foi encontrada"}, {status: 404})

      if (invoice.status !== InvoiceStatus.PENDING) return NextResponse.json({message: "A nota não pode ser processada novamente"}, {status: 409})

      const [updatedInvoice] = await sql`UPDATE invoices SET status = ${InvoiceStatus.PROCESSED} WHERE id = ${id} RETURNING id, number, status`

      return NextResponse.json(updatedInvoice, {status: 200})
   } catch (error) {
      return NextResponse.json({message: "Erro ao processar a nota"}, {status: 500})
   }
}

export { PATCH }