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

import dzire from "./cars/dzire.png";
import amaze from "./cars/amaze.png";
import verna from "./cars/verna.png";
import city from "./cars/city.png";
import virtus from "./cars/virtus.png";
import slavia from "./cars/slavia.png";
import tigor from "./cars/tigor.png";

import punch from "./cars/punch.png";
import nexon from "./cars/nexon.png";
import brezza from "./cars/brezza.png";
import fronx from "./cars/fronx.png";
import venue from "./cars/venue.png";
import sonet from "./cars/sonet.png";
import xuv3xo from "./cars/xuv-3xo.png";
import kiger from "./cars/kiger.png";
import magnite from "./cars/magnite.png";

import creta from "./cars/creta.png";
import seltos from "./cars/seltos.png";
import scorpioN from "./cars/scorpio-n.png";
import xuv700 from "./cars/xuv700.png";
import harrier from "./cars/harrier.png";
import safari from "./cars/safari.png";
import thar from "./cars/thar.png";
import fortuner from "./cars/fortuner.png";

import ertiga from "./cars/ertiga.png";
import xl6 from "./cars/xl6.png";
import innovaCrysta from "./cars/innova-crysta.png";
import innovaHycross from "./cars/innova-hycross.png";

import nexonEV from "./cars/nexon-ev.png";
import punchEV from "./cars/punch-ev.png";
import windsorEV from "./cars/mg-windsor-ev.png";
import be6 from "./cars/be-6.png";

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
    },
];