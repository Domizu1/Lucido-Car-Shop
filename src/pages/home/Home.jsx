import Hero from './Hero'
import CarWash from './CarWash'
import Offer from './Offer'
import Coffee from './Coffee'
import Seo from '../../components/Seo'

function Home() {
    return (
        <>
            <Seo
                title="Lucido Detailing | Auto Detailing, Premium Pranje i Caffe"
                description="Lucido Detailing: premium pranje vozila, detailing usluge i caffe zona na jednoj lokaciji. Pogledajte ponude i zakazite termin."
                keywords="auto detailing, pranje vozila, dubinsko pranje, Lucido Detailing, caffe"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'AutoWash',
                    name: 'Lucido Detailing',
                    areaServed: 'Serbia',
                    knowsLanguage: ['sr', 'en'],
                }}
            />
            <Hero />
            <CarWash />
            <Offer />
            <Coffee />
        </>
    )
}

export default Home