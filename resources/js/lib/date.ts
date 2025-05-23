import { format } from 'date-fns'

export function formatReadableDateTime(dateString: string | null): string {
  if (!dateString) return 'Not Verified Yet'
  const date = new Date(dateString)
  return format(date, "EEEE, dd MMMM yyyy HH:mm aa")
}
