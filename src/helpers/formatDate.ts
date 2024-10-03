import { format as fnsFormat, Locale } from 'date-fns'

import nlLocale from 'date-fns/locale/nl'

export type FormatDateOptions = {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  firstWeekContainsDate?: number
  useAdditionalWeekYearTokens?: boolean
  useAdditionalDayOfYearTokens?: boolean
}

export const formatDate = (date: Date | string, format: string, options: FormatDateOptions = {}) => {
  const dateObject = typeof date === 'string' ? new Date(date) : date

  return fnsFormat(dateObject, format, { locale: nlLocale, ...options })
}
