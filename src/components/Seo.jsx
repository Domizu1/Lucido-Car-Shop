import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_SITE_URL;
    if (envUrl) {
        return envUrl.replace(/\/$/, '');
    }

    if (typeof window !== 'undefined' && window.location?.origin) {
        return window.location.origin;
    }

    return '';
};

function Seo({
    title,
    description,
    keywords,
    canonical,
    image,
    type = 'website',
    robots = 'index,follow',
    structuredData,
}) {
    const { pathname } = useLocation();
    const baseUrl = getBaseUrl();
    const canonicalUrl = canonical || (baseUrl ? `${baseUrl}${pathname}` : undefined);

    return (
        <Helmet prioritizeSeoTags>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={robots} />

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            {image && <meta property="og:image" content={image} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}

export default Seo;
