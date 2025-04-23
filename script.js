// script.js

// Example JavaScript code for a real estate website

// Property data (example)
const properties = [
    {
        id: 1,
        title: "Luxury Apartment in Downtown",
        price: 250000,
        location: "Downtown",
        image: "images/apartment1.jpg",
        description: "A beautiful luxury apartment located in the heart of downtown."
    },
    {
        id: 2,
        title: "Cozy Suburban House",
        price: 180000,
        location: "Suburbs",
        image: "images/house1.jpg",
        description: "A cozy house perfect for families in a quiet suburban area."
    },
    {
        id: 3,
        title: "Modern Condo with Sea View",
        price: 300000,
        location: "Beachside",
        image: "images/condo1.jpg",
        description: "A modern condo with stunning sea views and premium amenities."
    }
];

// Function to display properties
function displayProperties() {
    const propertyList = document.getElementById("property-list");
    propertyList.innerHTML = "";

    properties.forEach(property => {
        const propertyCard = document.createElement("div");
        propertyCard.className = "property-card";

        propertyCard.innerHTML = `
            <img src="${property.image}" alt="${property.title}" class="property-image">
            <h3>${property.title}</h3>
            <p>Location: ${property.location}</p>
            <p>Price: $${property.price.toLocaleString()}</p>
            <p>${property.description}</p>
            <button onclick="inquire(${property.id})">Inquire</button>
        `;

        propertyList.appendChild(propertyCard);
    });
}

// Function to handle inquiries
function inquire(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        alert(`You have inquired about: ${property.title}`);
    } else {
        alert("Property not found.");
    }
}

// Initialize the property display on page load
document.addEventListener("DOMContentLoaded", displayProperties);