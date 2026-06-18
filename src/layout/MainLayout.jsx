import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = () => {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash) {
            const id = hash.slice(1)
            const element = document.getElementById(id)
            if (element) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                const isMobile = window.matchMedia('(max-width: 768px)').matches
                element.scrollIntoView({
                    behavior: prefersReducedMotion || isMobile ? 'auto' : 'smooth',
                    block: 'start',
                })
                return
            }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [pathname, hash])

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout