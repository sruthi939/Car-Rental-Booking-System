import welcome_image from "./welcome_image.png";
import car_video from "./okey_generate_the_video.mp4";

import swift from "./cars/hatchbacks/swift.png";
import baleno from "./cars/hatchbacks/baleno.png";
import wagonR from "./cars/hatchbacks/wagon-r.png";
import grandI10 from "./cars/hatchbacks/grand-i10.png";
import i20 from "./cars/hatchbacks/i20.png";
import tiago from "./cars/hatchbacks/tiago.png";
import altroz from "./cars/hatchbacks/altroz.png";
import glanza from "./cars/hatchbacks/glanza.png";

import dzire from "./cars/sedans/dzire.png";
import amaze from "./cars/sedans/amaze.webp";
import verna from "./cars/sedans/verna.avif";
import city from "./cars/sedans/city.jpg";
import virtus from "./cars/sedans/virtus.webp";
import slavia from "./cars/sedans/slavia.webp";
import tigor from "./cars/sedans/tigor.webp";

import punch from "./cars/compact_suvs/punch.webp";
import nexon from "./cars/compact_suvs/nexon.avif";
import brezza from "./cars/compact_suvs/brezza.webp";
import fronx from "./cars/compact_suvs/fronx.avif";
import venue from "./cars/compact_suvs/venue.webp";
import sonet from "./cars/compact_suvs/sonet.webp";
import xuv3xo from "./cars/compact_suvs/xuv3xo.avif";
import kiger from "./cars/compact_suvs/kiger.webp";
import magnite from "./cars/compact_suvs/magnite.jpg";

import creta from "./cars/suvs/creta.webp";
import seltos from "./cars/suvs/seltos.webp";
import scorpioN from "./cars/suvs/scorpioN.avif";
import xuv700 from "./cars/suvs/xuv700.webp";
import harrier from "./cars/suvs/harrier.avif";
import safari from "./cars/suvs/safari.avif";
import thar from "./cars/suvs/thar.webp";
import fortuner from "./cars/suvs/fortuner.webp";

import ertiga from "./cars/7_seaters/ertiga.webp";
import xl6 from "./cars/7_seaters/xl6.avif";
import innovaCrysta from "./cars/7_seaters/innovaCrysta.jpg";
import innovaHycross from "./cars/7_seaters/innovaHycross.jpg";

import nexonEV from "./cars/electric/nexonEV.webp";
import punchEV from "./cars/electric/punchEV.webp";
import windsorEV from "./cars/electric/windsorEV.avif";
import be6 from "./cars/electric/be6.webp";

export const assets = {
    welcome_image,
    car_video,

    // Hatchbacks
    swift, baleno, wagonR, grandI10, i20, tiago, altroz, glanza,

    // Sedans
    dzire, amaze, verna, city, virtus, slavia, tigor,

    // Compact SUVs
    punch, nexon, brezza, fronx, venue, sonet, xuv3xo, kiger, magnite,

    // SUVs
    creta, seltos, scorpioN, xuv700, harrier, safari, thar, fortuner,

    // 7 Seaters
    ertiga, xl6, innovaCrysta, innovaHycross,

    // Electric
    nexonEV, punchEV, windsorEV, be6,
}

export const cars = [
    {
        _id: "67ff5bc069c03d4e45f36",
        owner: "67fe3467ed8a8fe17d6",
        brand: "Maruti Suzuki",
        model: "Swift",
        image: swift,
        year: 2025,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 1800,
        location: "Chennai",
        description:
            "A stylish and fuel-efficient hatchback, perfect for city travel, short trips, and everyday rentals.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f37",
        owner: "67fe3467ed8a8fe17d7",
        brand: "Maruti Suzuki",
        model: "Baleno",
        image: baleno,
        year: 2025,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2000,
        location: "Chennai",
        description:
            "A spacious premium hatchback offering comfortable seating, smooth driving, and excellent city performance.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f38",
        owner: "67fe3467ed8a8fe17d8",
        brand: "Maruti Suzuki",
        model: "Wagon R",
        image: wagonR,
        year: 2024,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 1600,
        location: "Bangalore",
        description:
            "A practical and economical city car with a spacious cabin, ideal for budget-friendly rentals.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f39",
        owner: "67fe3467ed8a8fe17d9",
        brand: "Hyundai",
        model: "Grand i10 Nios",
        image: grandI10,
        year: 2024,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 1700,
        location: "Kochi",
        description:
            "A compact and comfortable hatchback with modern features, suitable for daily commuting and city trips.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f40",
        owner: "67fe3467ed8a8fe17e0",
        brand: "Hyundai",
        model: "i20",
        image: i20,
        year: 2025,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2100,
        location: "Chennai",
        description:
            "A premium hatchback combining stylish design, comfortable interiors, and smooth automatic driving.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f41",
        owner: "67fe3467ed8a8fe17e1",
        brand: "Tata",
        model: "Tiago",
        image: tiago,
        year: 2024,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 1600,
        location: "Kochi",
        description:
            "A compact and reliable hatchback offering good fuel efficiency and comfortable city driving.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f42",
        owner: "67fe3467ed8a8fe17e2",
        brand: "Tata",
        model: "Altroz",
        image: altroz,
        year: 2025,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 1900,
        location: "Bangalore",
        description:
            "A premium hatchback with a spacious cabin, attractive design, and comfortable ride quality.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f43",
        owner: "67fe3467ed8a8fe17e3",
        brand: "Toyota",
        model: "Glanza",
        image: glanza,
        year: 2025,
        category: "Hatchback",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2000,
        location: "Chennai",
        description:
            "A refined hatchback offering comfortable interiors, efficient performance, and a smooth automatic experience.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f44",
        owner: "67fe3467ed8a8fe17e4",
        brand: "Maruti Suzuki",
        model: "Dzire",
        image: dzire,
        year: 2025,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2200,
        location: "Chennai",
        description:
            "A practical sedan with excellent fuel efficiency, comfortable seating, and a spacious boot for luggage.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f45",
        owner: "67fe3467ed8a8fe17e5",
        brand: "Honda",
        model: "Amaze",
        image: amaze,
        year: 2024,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 2200,
        location: "Kochi",
        description:
            "A comfortable family sedan offering spacious interiors, smooth handling, and a large luggage compartment.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f46",
        owner: "67fe3467ed8a8fe17e6",
        brand: "Hyundai",
        model: "Verna",
        image: verna,
        year: 2025,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2800,
        location: "Bangalore",
        description:
            "A premium sedan featuring modern design, a comfortable cabin, and powerful yet smooth performance.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f47",
        owner: "67fe3467ed8a8fe17e7",
        brand: "Honda",
        model: "City",
        image: city,
        year: 2025,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 3000,
        location: "Chennai",
        description:
            "A premium family sedan known for its spacious interior, refined driving experience, and long-distance comfort.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f48",
        owner: "67fe3467ed8a8fe17e8",
        brand: "Volkswagen",
        model: "Virtus",
        image: virtus,
        year: 2025,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 3000,
        location: "Bangalore",
        description:
            "A stylish European sedan offering strong performance, premium interiors, and confident highway driving.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f49",
        owner: "67fe3467ed8a8fe17e9",
        brand: "Skoda",
        model: "Slavia",
        image: slavia,
        year: 2025,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 3000,
        location: "Chennai",
        description:
            "A premium sedan combining elegant styling, spacious interiors, comfortable rides, and engaging performance.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f50",
        owner: "67fe3467ed8a8fe17ea",
        brand: "Tata",
        model: "Tigor",
        image: tigor,
        year: 2024,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 1900,
        location: "Kochi",
        description:
            "An affordable compact sedan with comfortable seating and a practical boot, ideal for city and family trips.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f51",
        owner: "67fe3467ed8a8fe17eb",
        brand: "Tata",
        model: "Punch",
        image: punch,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 2000,
        location: "Chennai",
        description:
            "A compact SUV with a high driving position, practical cabin, and strong city-friendly characteristics.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f52",
        owner: "67fe3467ed8a8fe17ec",
        brand: "Tata",
        model: "Nexon",
        image: nexon,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2400,
        location: "Bangalore",
        description:
            "A versatile compact SUV offering comfortable interiors, modern features, and a confident driving experience.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f53",
        owner: "67fe3467ed8a8fe17ed",
        brand: "Maruti Suzuki",
        model: "Brezza",
        image: brezza,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2500,
        location: "Chennai",
        description:
            "A practical compact SUV offering comfortable seating, good road presence, and convenient automatic driving.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f54",
        owner: "67fe3467ed8a8fe17ee",
        brand: "Maruti Suzuki",
        model: "Fronx",
        image: fronx,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2300,
        location: "Kochi",
        description:
            "A stylish crossover with modern looks, comfortable interiors, and efficient performance for urban travel.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f55",
        owner: "67fe3467ed8a8fe17ef",
        brand: "Hyundai",
        model: "Venue",
        image: venue,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2400,
        location: "Bangalore",
        description:
            "A feature-rich compact SUV with comfortable seating and a convenient driving experience for city journeys.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f56",
        owner: "67fe3467ed8a8fe17f0",
        brand: "Kia",
        model: "Sonet",
        image: sonet,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2500,
        location: "Chennai",
        description:
            "A modern compact SUV with premium styling, comfortable interiors, and convenient features for everyday travel.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f57",
        owner: "67fe3467ed8a8fe17f1",
        brand: "Mahindra",
        model: "XUV 3XO",
        image: xuv3xo,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2500,
        location: "Bangalore",
        description:
            "A feature-packed compact SUV providing strong performance, spacious seating, and comfortable long-distance travel.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f58",
        owner: "67fe3467ed8a8fe17f2",
        brand: "Renault",
        model: "Kiger",
        image: kiger,
        year: 2024,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 2100,
        location: "Kochi",
        description:
            "A compact and affordable SUV with sporty styling, practical interiors, and good city driving characteristics.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f59",
        owner: "67fe3467ed8a8fe17f3",
        brand: "Nissan",
        model: "Magnite",
        image: magnite,
        year: 2024,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Manual",
        pricePerDay: 2100,
        location: "Chennai",
        description:
            "A value-focused compact SUV offering spacious interiors, modern styling, and comfortable everyday driving.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f60",
        owner: "67fe3467ed8a8fe17f4",
        brand: "Hyundai",
        model: "Creta",
        image: creta,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 3000,
        location: "Bangalore",
        description:
            "A popular mid-size SUV offering premium comfort, spacious seating, modern features, and smooth performance.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f61",
        owner: "67fe3467ed8a8fe17f5",
        brand: "Kia",
        model: "Seltos",
        image: seltos,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 3000,
        location: "Chennai",
        description:
            "A stylish mid-size SUV with a premium cabin, comfortable seats, and excellent features for road trips.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f62",
        owner: "67fe3467ed8a8fe17f6",
        brand: "Mahindra",
        model: "Scorpio-N",
        image: scorpioN,
        year: 2025,
        category: "SUV",
        seating_capacity: 7,
        fuel_type: "Diesel",
        transmission: "Automatic",
        pricePerDay: 3800,
        location: "Bangalore",
        description:
            "A rugged seven-seater SUV offering strong road presence, spacious seating, and powerful performance.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f63",
        owner: "67fe3467ed8a8fe17f7",
        brand: "Mahindra",
        model: "XUV700",
        image: xuv700,
        year: 2025,
        category: "SUV",
        seating_capacity: 7,
        fuel_type: "Diesel",
        transmission: "Automatic",
        pricePerDay: 4000,
        location: "Chennai",
        description:
            "A premium seven-seater SUV with spacious interiors, advanced features, strong performance, and excellent highway comfort.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f64",
        owner: "67fe3467ed8a8fe17f8",
        brand: "Tata",
        model: "Harrier",
        image: harrier,
        year: 2025,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Diesel",
        transmission: "Automatic",
        pricePerDay: 3500,
        location: "Kochi",
        description:
            "A premium SUV offering a spacious cabin, commanding road presence, comfortable seating, and strong highway performance.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f65",
        owner: "67fe3467ed8a8fe17f9",
        brand: "Tata",
        model: "Safari",
        image: safari,
        year: 2025,
        category: "SUV",
        seating_capacity: 7,
        fuel_type: "Diesel",
        transmission: "Automatic",
        pricePerDay: 3800,
        location: "Chennai",
        description:
            "A spacious seven-seater SUV designed for family trips with comfortable interiors and long-distance capability.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f66",
        owner: "67fe3467ed8a8fe17fa",
        brand: "Mahindra",
        model: "Thar",
        image: thar,
        year: 2025,
        category: "SUV",
        seating_capacity: 4,
        fuel_type: "Diesel",
        transmission: "Manual",
        pricePerDay: 3500,
        location: "Kochi",
        description:
            "An iconic lifestyle SUV designed for adventurous journeys, offering rugged styling and strong off-road capability.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f67",
        owner: "67fe3467ed8a8fe17fb",
        brand: "Toyota",
        model: "Fortuner",
        image: fortuner,
        year: 2025,
        category: "Premium SUV",
        seating_capacity: 7,
        fuel_type: "Diesel",
        transmission: "Automatic",
        pricePerDay: 6000,
        location: "Chennai",
        description:
            "A premium seven-seater SUV offering powerful performance, spacious interiors, premium comfort, and excellent road presence.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f68",
        owner: "67fe3467ed8a8fe17fc",
        brand: "Maruti Suzuki",
        model: "Ertiga",
        image: ertiga,
        year: 2025,
        category: "7 Seater",
        seating_capacity: 7,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 2800,
        location: "Bangalore",
        description:
            "A practical seven-seater MPV offering flexible seating, good cabin space, and comfortable family travel.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f69",
        owner: "67fe3467ed8a8fe17fd",
        brand: "Maruti Suzuki",
        model: "XL6",
        image: xl6,
        year: 2025,
        category: "7 Seater",
        seating_capacity: 6,
        fuel_type: "Petrol",
        transmission: "Automatic",
        pricePerDay: 3000,
        location: "Chennai",
        description:
            "A premium family MPV with captain seats, spacious interiors, and a comfortable experience for longer journeys.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f70",
        owner: "67fe3467ed8a8fe17fe",
        brand: "Toyota",
        model: "Innova Crysta",
        image: innovaCrysta,
        year: 2024,
        category: "7 Seater",
        seating_capacity: 7,
        fuel_type: "Diesel",
        transmission: "Manual",
        pricePerDay: 4500,
        location: "Kochi",
        description:
            "A premium family MPV known for its spacious cabin, comfortable seating, reliability, and long-distance comfort.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f71",
        owner: "67fe3467ed8a8fe17ff",
        brand: "Toyota",
        model: "Innova Hycross",
        image: innovaHycross,
        year: 2025,
        category: "7 Seater",
        seating_capacity: 7,
        fuel_type: "Hybrid",
        transmission: "Automatic",
        pricePerDay: 5000,
        location: "Bangalore",
        description:
            "A premium hybrid MPV offering spacious interiors, comfortable seating, efficient performance, and modern features.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f72",
        owner: "67fe3467ed8a8fe17fg",
        brand: "Tata",
        model: "Nexon EV",
        image: nexonEV,
        year: 2025,
        category: "Electric",
        seating_capacity: 5,
        fuel_type: "Electric",
        transmission: "Automatic",
        pricePerDay: 2800,
        location: "Chennai",
        description:
            "A practical electric SUV offering quiet driving, modern features, and an eco-friendly option for urban and highway travel.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f73",
        owner: "67fe3467ed8a8fe17fh",
        brand: "Tata",
        model: "Punch EV",
        image: punchEV,
        year: 2025,
        category: "Electric",
        seating_capacity: 5,
        fuel_type: "Electric",
        transmission: "Automatic",
        pricePerDay: 2400,
        location: "Kochi",
        description:
            "A compact electric SUV designed for city travel with a comfortable cabin, easy driving, and zero tailpipe emissions.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f74",
        owner: "67fe3467ed8a8fe17fi",
        brand: "MG",
        model: "Windsor EV",
        image: windsorEV,
        year: 2025,
        category: "Electric",
        seating_capacity: 5,
        fuel_type: "Electric",
        transmission: "Automatic",
        pricePerDay: 3000,
        location: "Bangalore",
        description:
            "A modern electric vehicle with a spacious cabin, premium comfort, and a smooth, quiet driving experience.",
        isAvailable: true,
    },

    {
        _id: "67ff5bc069c03d4e45f75",
        owner: "67fe3467ed8a8fe17fj",
        brand: "Mahindra",
        model: "BE 6",
        image: be6,
        year: 2025,
        category: "Electric",
        seating_capacity: 5,
        fuel_type: "Electric",
        transmission: "Automatic",
        pricePerDay: 3500,
        location: "Chennai",
        description:
            "A futuristic electric SUV offering modern design, advanced technology, sporty performance, and a premium driving experience.",
        isAvailable: true,
    },
];