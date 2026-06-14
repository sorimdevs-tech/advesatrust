// Sorim.jsx
import React from "react";
import {
    GraduationCap,
    Users,
    HeartHandshake,
    Leaf,
    ShieldCheck,
    ArrowRight,
    Quote,
} from "lucide-react";

const giveBack = [
    { icon: GraduationCap, label: "Education &\nSkilling" },
    { icon: Users, label: "Community\nDevelopment" },
    { icon: HeartHandshake, label: "Social\nSupport" },
    { icon: Leaf, label: "Sustainability &\nEnvironment" },
];

const Sorim = () => {
    return (
        <section className="w-full bg-[#f7f7f7] py-10 px-5 pt-20">
            <div className="relative w-full min-h-[720px] rounded-[28px] overflow-hidden bg-[#075f25] shadow-2xl">

                {/* Background image */}
                <img
                    src="/community.png"
                    alt="Community"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* Dark green overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#075f25] via-[#0a7a32]/80 to-[#075f25]/95" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#064f22]/80" />
                <div className="absolute left-0 top-0 h-full w-[52%] bg-gradient-to-r from-[#08742d]/95 via-[#138c3b]/75 to-transparent" />

                {/* Soft bottom curve */}
                <div className="absolute left-[18%] bottom-[-120px] h-[290px] w-[680px] rounded-[50%] bg-lime-400/10 rotate-[-12deg]" />
                <div className="absolute left-[10%] bottom-[-150px] h-[270px] w-[760px] rounded-[50%] bg-lime-300/10 rotate-[-10deg]" />

                <div className="relative z-10 grid min-h-[720px] grid-cols-1 lg:grid-cols-[48%_52%]">

                    {/* Left content */}
                    <div className="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-16">
                        <div className="mb-16 flex items-center gap-4 text-white">
                            <ShieldCheck className="h-10 w-10 text-white" />
                            <span className="text-2xl font-medium">Trusted by</span>
                            <span className="text-4xl font-extrabold tracking-tight">
                                Sorim.ai
                                {/* <span className="ml-1 text-lime-400">⌁</span> */}
                            </span>
                        </div>

                        <h2 className="max-w-[840px] text-[42px] font-extrabold leading-[1.18] text-white md:text-[58px] lg:text-[64px]">
                            Technology with Purpose.
                            <br />
                            Impact that Lasts.
                        </h2>

                        <p className="mt-7 max-w-[680px] text-[22px] leading-[1.45] text-white/95">
                            At Sorim, we empower organizations and changemakers with
                            intelligent technology and digital solutions that create
                            meaningful impact and bring lasting change.
                        </p>

                        <div className="my-6 h-[3px] w-12 bg-white/80" />

                        <p className="max-w-[650px] text-[22px] leading-[1.45] text-white/95">
                            We believe in giving back to the community by enabling access,
                            opportunity, and dignity for all.
                            <br />
                            <span className="font-bold text-lime-300">
                                Better Communities. Stronger Tomorrow.
                            </span>
                        </p>

                        <a
                            href="https://sorim.ai/" // Replace with your actual URL
                            className="mt-8 flex w-fit items-center gap-10 rounded-md bg-white px-7 py-4 text-[18px] font-bold text-[#08742d] shadow-lg transition hover:scale-[1.03]"
                        >
                            About Sorim.ai
                            <ArrowRight size={26} />
                        </a>
                    </div>

                    {/* Right content */}
                    <div className="relative flex items-center justify-end px-8 py-12 md:px-16 lg:px-24">
                        <Quote className="absolute right-[28%] top-12 h-32 w-32 rotate-180 text-white/10" />
                        <Quote className="absolute bottom-64 right-24 h-24 w-24 text-white/10" />

                        <div className="w-full max-w-[520px]">
                            <p className="text-[28px] font-medium leading-[1.45] text-white md:text-[30px]">
                                We believe that when technology is used for good, it can uplift
                                lives, strengthen communities, and build a more equitable world.
                            </p>

                            <div className="mt-24">
                                <h3 className="mb-6 text-[21px] font-extrabold text-white">
                                    How we give back
                                </h3>

                                <div className="grid grid-cols-4 gap-7">
                                    {giveBack.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={item.label} className="text-center">
                                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-200">
                                                    <Icon className="h-10 w-10 text-[#08742d]" />
                                                </div>

                                                <p className="mt-4 whitespace-pre-line text-[16px] leading-tight text-white">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-14 flex items-start gap-4">
                                    <HeartHandshake className="mt-1 h-8 w-8 text-lime-400" />
                                    <p className="text-[20px] leading-[1.35] text-white">
                                        <span className="font-semibold">Built with compassion.</span>
                                        <br />
                                        Driven by impact. For the community,
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Sorim;