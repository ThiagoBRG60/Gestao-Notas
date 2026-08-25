const InvoiceStatus = {
   PENDING: "PENDING",
   PROCESSED: "PROCESSED",
   CANCELED: "CANCELED"
} as const

const InvoiceType = {
   NFE: "NFE",
   NFSE: "NFSE"
} as const

type InvoiceStatusType = typeof InvoiceStatus[keyof typeof InvoiceStatus]

type InvoiceType = typeof InvoiceType[keyof typeof InvoiceType]

interface InvoiceProps {
	id: number
	number: number
	cnpj: string
	type: InvoiceType
	amount: number
	issued_at: string
	status: InvoiceStatusType
	created_at: string
}

export { InvoiceStatus, type InvoiceProps, type InvoiceStatusType, type InvoiceType }