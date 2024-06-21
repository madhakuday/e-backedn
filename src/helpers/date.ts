import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

const TZ_ID = { locale: enUS } // Timezone India

const formatDate = (date: Date | number | string) => {
  return format(new Date(date), 'dd-MM-yyyy', TZ_ID)
}
const formatCommonDate = (date: Date | number | string) => {
  try {
    
  return format(new Date(date), 'do MMM y', TZ_ID)
    
  } catch (error) {
    return date
  }
}

const formatDateTime = (date: Date | number | string) => {
  return format(new Date(date), 'dd-MM-yyyy HH:mm:ss', TZ_ID)
}

const formatDateSystem = (date: Date | number | string) => {
  return format(new Date(date), 'yyyy-MM-dd', TZ_ID)
}

const formatDateTimeSystem = (date: Date | number | string) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss', TZ_ID)
}

const formatDateGenerateFile = (date: Date | number | string) => {
  return format(new Date(date), 'yyyyMMddHHmmss', TZ_ID)
}

const formatMonth = (date: Date | number | string) => {
  return format(new Date(date), 'MMMM', TZ_ID)
}

const formatYear = (date: Date | number | string) => {
  return format(new Date(date), 'yyyy', TZ_ID)
}

const formatTime = (date: Date | number | string) => {
  return format(new Date(date), 'HH:mm:ss', TZ_ID)
}

const convertTimeToMinutesSeconds = (duration: | string) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const formattedMinutes = totalMinutes.toString().padStart(2, '0'); // Pad minutes with leading zeros if needed
  const formattedSeconds = seconds.toString().padStart(2, '0'); // Pad seconds with leading zeros if needed
  return `${formattedMinutes}:${formattedSeconds}`;
}

export {
  formatDate,
  formatDateSystem,
  formatDateTime,
  formatDateTimeSystem,
  formatDateGenerateFile,
  formatMonth,
  formatYear,
  formatTime,
  formatCommonDate,
  convertTimeToMinutesSeconds
}