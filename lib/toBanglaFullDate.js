// lib/toBanglaFullDate.js

export function toBanglaFullDate(engDateStr) {
    const engToBnDigits = (str) =>
      str.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
  
    const engMonths = {
      January: 'জানুয়ারি',
      February: 'ফেব্রুয়ারি',
      March: 'মার্চ',
      April: 'এপ্রিল',
      May: 'মে',
      June: 'জুন',
      July: 'জুলাই',
      August: 'আগস্ট',
      September: 'সেপ্টেম্বর',
      October: 'অক্টোবর',
      November: 'নভেম্বর',
      December: 'ডিসেম্বর',
    };
  
    try {
      // Split: "Thursday, 24 July 2025, 16:55"
      const [, dayPart, monthName, year, time24h] = engDateStr.split(/[\s,]+/);
  
      const hour = parseInt(time24h.split(':')[0], 10);
      const minute = time24h.split(':')[1];
      const isPM = hour >= 12;
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const banglaTime = `${engToBnDigits(hour12.toString())}:${engToBnDigits(minute)} ${isPM ? 'পিএম' : 'এএম'}`;
  
      const banglaDate = `${engToBnDigits(dayPart)} ${engMonths[monthName]}, ${engToBnDigits(year)}, ${banglaTime}`;
      return banglaDate;
    } catch (e) {
      return engDateStr; // fallback
    }
  }
  