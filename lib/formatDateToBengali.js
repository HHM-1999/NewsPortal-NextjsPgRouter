export function formatDateToBengali(dateString) {
    const date = new Date(dateString);
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
  
    // Convert numbers to Bangla
    const convertToBangla = (num) => num.toString().split('').map(d => banglaDigits[parseInt(d)]).join('');
  
    return `${dayName}, ${convertToBangla(day)} ${month} ${convertToBangla(year)}, ${convertToBangla(hour)}:${convertToBangla(minute)}`;
  }
  