const FeaturedComponent = () => {
    return (
        <section
            aria-labelledby="social-impact-heading"
            className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        >
            <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                    <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                        <h2 id="social-impact-heading"
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            <span className="block sm:inline">Level up</span>
                            <span className="block sm:inline"> your Shopping </span>
                        </h2>
                        <p className="mt-3 text-xl text-white">
                           We provide the best shopping experience for your workspace needs. you can find the best quality products at the best price.
                        </p>
                        <a
                            href="/shop"
                            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                        >
                            Shop Workspace
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedComponent;