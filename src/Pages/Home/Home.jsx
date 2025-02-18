import Accordion from "@/Shared/Accordion/Accordion";
import Banner from "@/Shared/Banner/Banner";
import DeliveryMenCard from "@/Shared/DeliveryMenCard/DeliveryMenCard";
import Featured from "@/Shared/Featured/Featured";
import HowItWorks from "@/Shared/HowItWorks/HowItWorks";
import LatestBlogNews from "@/Shared/LatestBlogNews/LatestBlogNews";
import StatsCard from "@/Shared/StatsCard/StatsCard"
import Testimonials from "@/Shared/Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            {/* Banner div here */}
            <div>
                <Banner></Banner>
            </div>
            {/* Banner div here */}

            <main className="max-w-[90%] mx-auto">
                {/* Featured section here */}
                <div className="mt-8">
                    <Featured></Featured>
                    <StatsCard></StatsCard>
                </div>
                {/* Featured section here */}

                {/* Top delivery men here */}
                <div>
                    <DeliveryMenCard></DeliveryMenCard>
                </div>
                {/* Top delivery men here */}

                {/* Faq Section here */}
                <div>
                    <Accordion></Accordion>
                </div>
                {/* Faq Section here */}

                {/* Testimonials Section */}
                <div>
                    <Testimonials></Testimonials>
                </div>
                {/* Testimonials Section */}

                {/* How it works section */}
                <div>
                    <HowItWorks></HowItWorks>
                </div>
                {/* How it works section */}

                {/* Latest Blog News Section */}
                <div>
                    <LatestBlogNews></LatestBlogNews>
                </div>
                {/* Latest Blog News Section */}
            </main>
        </div>
    );
};

export default Home;