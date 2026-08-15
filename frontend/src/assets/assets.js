import logo from "logo.png"
import { welcome_image } from "welcome_image.png";

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
import xuv3xo from "./cars/compact_suvs/xuv-3xo.avif";
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
import innovaCrysta from "./cars/7_seaters/innova-crysta.jpg";
import innovaHycross from "./cars/7_seaters/innova-hycross.jpg";

import nexonEV from "./cars/electric/nexon-ev.webp";
import punchEV from "./cars/electric/punch-ev.webp";
import windsorEV from "./cars/electric/mg-windsor-ev.avif";
import be6 from "./cars/electric/be-6.webp";

export const assets = {
    logo,
    welcome_image,

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
        id: 1,
        name: "Maruti Suzuki Swift",
        image: swift,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 1800,
        description:
            "A stylish and fuel-efficient hatchback, perfect for city travel, short trips, and everyday rentals."
    },

    {
        id: 2,
        name: "Maruti Suzuki Baleno",
        image: baleno,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2000,
        description:
            "A spacious premium hatchback offering comfortable seating, smooth driving, and excellent city performance."
    },

    {
        id: 3,
        name: "Maruti Suzuki Wagon R",
        image: wagonR,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 1600,
        description:
            "A practical and economical city car with a spacious cabin, making it ideal for budget-friendly rentals."
    },

    {
        id: 4,
        name: "Hyundai Grand i10 Nios",
        image: grandI10,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 1700,
        description:
            "A compact and comfortable hatchback with modern features, suitable for daily commuting and city trips."
    },

    {
        id: 5,
        name: "Hyundai i20",
        image: i20,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2100,
        description:
            "A premium hatchback combining stylish design, comfortable interiors, and smooth automatic driving."
    },

    {
        id: 6,
        name: "Tata Tiago",
        image: tiago,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 1600,
        description:
            "A compact and reliable hatchback offering good fuel efficiency and comfortable city driving."
    },

    {
        id: 7,
        name: "Tata Altroz",
        image: altroz,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 1900,
        description:
            "A premium hatchback with a spacious cabin, attractive design, and comfortable ride quality."
    },

    {
        id: 8,
        name: "Toyota Glanza",
        image: glanza,
        category: "Hatchback",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2000,
        description:
            "A refined hatchback offering comfortable interiors, efficient performance, and a smooth automatic experience."
    },

    {
        id: 9,
        name: "Maruti Suzuki Dzire",
        image: dzire,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2200,
        description:
            "A practical sedan with excellent fuel efficiency, comfortable seating, and a spacious boot for luggage."
    },

    {
        id: 10,
        name: "Honda Amaze",
        image: amaze,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 2200,
        description:
            "A comfortable family sedan offering spacious interiors, smooth handling, and a large luggage compartment."
    },

    {
        id: 11,
        name: "Hyundai Verna",
        image: verna,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2800,
        description:
            "A premium sedan featuring a modern design, comfortable cabin, and powerful yet smooth performance."
    },

    {
        id: 12,
        name: "Honda City",
        image: city,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3000,
        description:
            "A premium family sedan known for its spacious interior, refined driving experience, and long-distance comfort."
    },

    {
        id: 13,
        name: "Volkswagen Virtus",
        image: virtus,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3000,
        description:
            "A stylish European sedan offering strong performance, premium interiors, and confident highway driving."
    },

    {
        id: 14,
        name: "Skoda Slavia",
        image: slavia,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3000,
        description:
            "A premium sedan combining elegant styling, spacious interiors, comfortable rides, and engaging performance."
    },

    {
        id: 15,
        name: "Tata Tigor",
        image: tigor,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 1900,
        description:
            "An affordable compact sedan with comfortable seating and a practical boot, ideal for city and family trips."
    },

    {
        id: 16,
        name: "Tata Punch",
        image: punch,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 2000,
        description:
            "A compact SUV with a high driving position, practical cabin, and strong city-friendly characteristics."
    },

    {
        id: 17,
        name: "Tata Nexon",
        image: nexon,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2400,
        description:
            "A versatile compact SUV offering comfortable interiors, modern features, and a confident driving experience."
    },

    {
        id: 18,
        name: "Maruti Suzuki Brezza",
        image: brezza,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2500,
        description:
            "A practical compact SUV offering comfortable seating, good road presence, and convenient automatic driving."
    },

    {
        id: 19,
        name: "Maruti Suzuki Fronx",
        image: fronx,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2300,
        description:
            "A stylish crossover with modern looks, comfortable interiors, and efficient performance for urban travel."
    },

    {
        id: 20,
        name: "Hyundai Venue",
        image: venue,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2400,
        description:
            "A feature-rich compact SUV with comfortable seating and a convenient driving experience for city journeys."
    },

    {
        id: 21,
        name: "Kia Sonet",
        image: sonet,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2500,
        description:
            "A modern compact SUV with premium styling, comfortable interiors, and convenient features for everyday travel."
    },

    {
        id: 22,
        name: "Mahindra XUV 3XO",
        image: xuv3xo,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2500,
        description:
            "A feature-packed compact SUV providing strong performance, spacious seating, and comfortable long-distance travel."
    },

    {
        id: 23,
        name: "Renault Kiger",
        image: kiger,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 2100,
        description:
            "A compact and affordable SUV with sporty styling, practical interiors, and good city driving characteristics."
    },

    {
        id: 24,
        name: "Nissan Magnite",
        image: magnite,
        category: "Compact SUV",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        pricePerDay: 2100,
        description:
            "A value-focused compact SUV offering spacious interiors, modern styling, and comfortable everyday driving."
    },

    {
        id: 25,
        name: "Hyundai Creta",
        image: creta,
        category: "SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3000,
        description:
            "A popular mid-size SUV offering premium comfort, spacious seating, modern features, and smooth performance."
    },

    {
        id: 26,
        name: "Kia Seltos",
        image: seltos,
        category: "SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3000,
        description:
            "A stylish mid-size SUV with a premium cabin, comfortable seats, and excellent features for road trips."
    },

    {
        id: 27,
        name: "Mahindra Scorpio-N",
        image: scorpioN,
        category: "SUV",
        fuel: "Diesel",
        transmission: "Automatic",
        seats: 7,
        pricePerDay: 3800,
        description:
            "A rugged seven-seater SUV offering strong road presence, spacious seating, and powerful performance."
    },

    {
        id: 28,
        name: "Mahindra XUV700",
        image: xuv700,
        category: "SUV",
        fuel: "Diesel",
        transmission: "Automatic",
        seats: 7,
        pricePerDay: 4000,
        description:
            "A premium seven-seater SUV with spacious interiors, advanced features, strong performance, and excellent highway comfort."
    },

    {
        id: 29,
        name: "Tata Harrier",
        image: harrier,
        category: "SUV",
        fuel: "Diesel",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3500,
        description:
            "A premium SUV offering a spacious cabin, commanding road presence, comfortable seating, and strong highway performance."
    },

    {
        id: 30,
        name: "Tata Safari",
        image: safari,
        category: "SUV",
        fuel: "Diesel",
        transmission: "Automatic",
        seats: 7,
        pricePerDay: 3800,
        description:
            "A spacious seven-seater SUV designed for family trips with comfortable interiors and long-distance capability."
    },

    {
        id: 31,
        name: "Mahindra Thar",
        image: thar,
        category: "SUV",
        fuel: "Diesel",
        transmission: "Manual",
        seats: 4,
        pricePerDay: 3500,
        description:
            "An iconic lifestyle SUV designed for adventurous journeys, offering rugged styling and strong off-road capability."
    },

    {
        id: 32,
        name: "Toyota Fortuner",
        image: fortuner,
        category: "Premium SUV",
        fuel: "Diesel",
        transmission: "Automatic",
        seats: 7,
        pricePerDay: 6000,
        description:
            "A premium seven-seater SUV offering powerful performance, spacious interiors, premium comfort, and excellent road presence."
    },

    {
        id: 33,
        name: "Maruti Suzuki Ertiga",
        image: ertiga,
        category: "7 Seater",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 7,
        pricePerDay: 2800,
        description:
            "A practical seven-seater MPV offering flexible seating, good cabin space, and comfortable family travel."
    },

    {
        id: 34,
        name: "Maruti Suzuki XL6",
        image: xl6,
        category: "7 Seater",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 6,
        pricePerDay: 3000,
        description:
            "A premium family MPV with captain seats, spacious interiors, and a comfortable experience for longer journeys."
    },

    {
        id: 35,
        name: "Toyota Innova Crysta",
        image: innovaCrysta,
        category: "7 Seater",
        fuel: "Diesel",
        transmission: "Manual",
        seats: 7,
        pricePerDay: 4500,
        description:
            "A premium family MPV known for its spacious cabin, comfortable seating, reliability, and long-distance comfort."
    },

    {
        id: 36,
        name: "Toyota Innova Hycross",
        image: innovaHycross,
        category: "7 Seater",
        fuel: "Hybrid",
        transmission: "Automatic",
        seats: 7,
        pricePerDay: 5000,
        description:
            "A premium hybrid MPV offering spacious interiors, comfortable seating, efficient performance, and modern features."
    },

    {
        id: 37,
        name: "Tata Nexon EV",
        image: nexonEV,
        category: "Electric",
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2800,
        description:
            "A practical electric SUV offering quiet driving, modern features, and an eco-friendly option for urban and highway travel."
    },

    {
        id: 38,
        name: "Tata Punch EV",
        image: punchEV,
        category: "Electric",
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 2400,
        description:
            "A compact electric SUV designed for city travel with a comfortable cabin, easy driving, and zero tailpipe emissions."
    },

    {
        id: 39,
        name: "MG Windsor EV",
        image: windsorEV,
        category: "Electric",
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3000,
        description:
            "A modern electric vehicle with a spacious cabin, premium comfort, and a smooth, quiet driving experience."
    },

    {
        id: 40,
        name: "Mahindra BE 6",
        image: be6,
        category: "Electric",
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        pricePerDay: 3500,
        description:
            "A futuristic electric SUV offering modern design, advanced technology, sporty performance, and a premium driving experience."
    }
];