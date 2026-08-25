import { NextRequest, NextResponse } from "next/server"
import { InvoiceStatus, InvoiceStatusType } from "@/types/invoices"
import sql from "@/lib/db"

async function GET(request: NextRequest) {
   const params = request.nextUrl.searchParams
   const status: InvoiceStatusType | string = params.get("status") ?? ""

   if (status && !Object.values(InvoiceStatus).includes(status as any)) return NextResponse.json({message: "O status enviado é inválido"}, {status: 400})

   try {
      const data = await sql`SELECT * FROM invoices ${status ? sql`WHERE status = ${status}` : sql`ORDER BY status`}`
      return NextResponse.json(data, {status: 200})  
   } catch (error) {
      console.error("ERRO AO BUSCAR INVOICES:", error)
      return NextResponse.json({message: "Não foi possível buscar as notas fiscais"}, {status: 500})
   }
}

export { GET }