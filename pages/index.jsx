
import Lead from './Components/HomeContent/Lead'
import SpecialLead from './Components/HomeContent/SpecialLead'
import National from './Components/HomeContent/National'
import International from './Components/HomeContent/International'
import Sports from './Components/HomeContent/Sports'
import Finance from './Components/HomeContent/Finance'
import Entertainment from './Components/HomeContent/Entertainment'
import Education from './Components/HomeContent/Education'
import LifeStyle from './Components/HomeContent/LifeStyle'
export default function Page() {
    return (
        <div className="page-bangla">   
            <Lead />
            <div className="card-news-area">
                <SpecialLead />
            </div>
               {/* HOME CONTENT */}
               <National />
               <International />
               <Sports />
               <Finance />
               <Entertainment />
               <Education />
               <LifeStyle />

        </div>
    )
}