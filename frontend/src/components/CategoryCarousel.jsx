import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className="shell my-16">
            <div className="glass-panel px-6 py-8 sm:px-8">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8a5a13]">Focus Areas</p>
                        <h2 className="text-3xl font-bold text-slate-900">Explore by hiring lane</h2>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-slate-600">Jump directly into the categories candidates are searching most right now.</p>
                </div>
            <Carousel className="mx-auto w-full max-w-5xl">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="h-auto w-full rounded-[22px] border-[#e2d5bf] bg-[#fffaf2] px-5 py-5 text-left text-base font-semibold text-slate-800 hover:bg-[#f7ecdd] hover:text-slate-900">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel
