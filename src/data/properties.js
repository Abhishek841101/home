const dummyProperties = [
  {
    _id: "1",
    propertyName: "2BHK Luxury Flat",
    location: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    price: 25000,
    purpose: "Rent",
    propertyType: "Rent Flat",

    images: [
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
      { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
    ],

    overview: "Modern flat near IT park",
    aboutProperty: "Best for family",

    amenities: ["Lift", "Parking", "Security"],

    units: [
      { number: "A-101", status: "available" },
      { number: "A-102", status: "booked" },
    ],

    contact: {
      ownerName: "Ravi",
      phone: "9876543210",
      email: "ravi@gmail.com",
    },
  },
];

export default dummyProperties;