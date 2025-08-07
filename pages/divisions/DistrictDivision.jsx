import Link from 'next/link'
import React from 'react'

const DistrictDivision = () => {
  return (
    <div className="DDivisionNav my-4 mt-4">
    <div className="row">
        <div className="col-lg-12 d-flex justify-content-center">
            <div className="text-center">
                <ul className="nav">
                    <li className="dropdown">
                        <Link href="/divisions/dhaka" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">ঢাকা</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/dhaka/kishoreganj">কিশোরগঞ্জ</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/gazipur">গাজীপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/gopalganj">গোপালগঞ্জ</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/tangail">টাঙ্গাইল</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/dhaka">ঢাকা</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/narsingdi">নরসিংদী</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/narayanganj">নারায়ণগঞ্জ</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/faridpur">ফরিদপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/madaripur">মাদারীপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/manikganj">মানিকগঞ্জ</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/munshiganj">মুন্সিগঞ্জ</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/rajbari">রাজবাড়ী</Link>
                            <Link  className="dropdown-item" href="/divisions/dhaka/shariatpur">শরীয়তপুর</Link>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link  href="/divisions/chattogram" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">চট্টগ্রাম</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/chattogram/coxs-bazar">কক্সবাজার</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/cumilla">কুমিল্লা</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/khagrachari">খাগড়াছড়ি</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/chattogram">চট্টগ্রাম</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/chandpur">চাঁদপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/noakhali">নোয়াখালী</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/feni">ফেনী</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/bandarban">বান্দরবান</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/brahmanbaria">ব্রাহ্মণবাড়িয়া</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/rangamati">রাঙামাটি</Link>
                            <Link  className="dropdown-item" href="/divisions/chattogram/lakshmipur">লক্ষ্মীপুর</Link>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link  href="/divisions/barishal" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">বরিশাল</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/barishal/jhalokati">ঝালকাঠী</Link>
                            <Link  className="dropdown-item" href="/divisions/barishal/patuakhali">পটুয়াখালি</Link>
                            <Link  className="dropdown-item" href="/divisions/barishal/pirojpur">পিরোজপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/barishal/barguna">বরগুনা</Link>
                            <Link  className="dropdown-item" href="/divisions/barishal/barishal">বরিশাল</Link>
                            <Link  className="dropdown-item" href="/divisions/barishal/bhola">ভোলা</Link>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link  href="/divisions/khulna" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">খুলনা</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/khulna/kushtia">কুষ্টিয়া</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/khulna">খুলনা</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/chuadanga">চুয়াডাঙ্গা</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/jhenaidah">ঝিনাইদহ</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/narail">নড়াইল</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/bagerhat">বাগেরহাট</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/magura">মাগুরা</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/meherpur">মেহেরপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/jashore">যশোর</Link>
                            <Link  className="dropdown-item" href="/divisions/khulna/satkhira">সাতক্ষীরা</Link>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link  href="/divisions/rajshahi" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">রাজশাহী</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/rajshahi/chapai-nawabganj">চাঁপাইনবাবগঞ্জ</Link>
                            <Link  className="dropdown-item" href="/divisions/rajshahi/joypurhat">জয়পুরহাট</Link>
                            <Link  className="dropdown-item" href="/divisions/rajshahi/naogaon">নওগাঁ</Link>
                            <Link  className="dropdown-item" href="/divisions/rajshahi/natore">নাটোর</Link>
                            <Link  className="dropdown-item" href="/divisions/rajshahi/pabna">পাবনা</Link>
                            <Link  className="dropdown-item" href="/divisions/rajshahi/bogura">বগুড়া</Link>
                            <Link  className="dropdown-item" href="/divisions/rajshahi/rajshahi">রাজশাহী</Link>
                            <Link  className="dropdown-item" href="/divisions/rajshahi/sirajgonj">সিরাজগঞ্জ</Link>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link  href="/divisions/sylhet" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">সিলেট</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/sylhet/maulvibazar">মৌলভীবাজার</Link>
                            <Link  className="dropdown-item" href="/divisions/sylhet/sylhet">সিলেট</Link>
                            <Link  className="dropdown-item" href="/divisions/sylhet/sunamganj">সুনামগঞ্জ</Link>
                            <Link  className="dropdown-item" href="/divisions/sylhet/habiganj">হবিগঞ্জ</Link>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link  href="/divisions/rangpur" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">রংপুর</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/rangpur/kurigram">কুড়িগ্রাম</Link>
                            <Link  className="dropdown-item" href="/divisions/rangpur/gaibandha">গাইবান্ধা</Link>
                            <Link  className="dropdown-item" href="/divisions/rangpur/thakurgaon">ঠাকুরগাঁও</Link>
                            <Link  className="dropdown-item" href="/divisions/rangpur/dinajpur">দিনাজপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/rangpur/nilphamari">নীলফামারী</Link>
                            <Link  className="dropdown-item" href="/divisions/rangpur/panchagarh">পঞ্চগড়</Link>
                            <Link  className="dropdown-item" href="/divisions/rangpur/rangpur">রংপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/rangpur/lalmonirhat">লালমনিরহাট</Link>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link  href="/divisions/mymensingh" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">ময়মনসিংহ</Link>
                        <ul className="dropdown-menu">
                            <Link  className="dropdown-item" href="/divisions/mymensingh/jamalpur">জামালপুর</Link>
                            <Link  className="dropdown-item" href="/divisions/mymensingh/netrokona">নেত্রকোনা</Link>
                            <Link  className="dropdown-item" href="/divisions/mymensingh/mymensingh">ময়মনসিংহ</Link>
                            <Link  className="dropdown-item" href="/divisions/mymensingh/sherpur">শেরপুর</Link>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
  )
}

export default DistrictDivision