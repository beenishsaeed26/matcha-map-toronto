import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Filter} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const matchaIcon = new L.Icon({
  iconUrl: '/matcha-marker.png',
  iconRetinaUrl: '/matcha-marker.png',
  iconSize: [34, 44],
  iconAnchor: [17, 44],
  popupAnchor: [0, -38],
  shadowUrl: null,
});


// MATCHA PLACES DETAILS 
const matchaPlaces = [
  {
    id: 1,
    name: "Matcha Matcha",
    address: "294 Dundas St W",
    rating: 4.3,
    priceRange: "$$",
    lat: 43.6544,
    lng: -79.3901,
    hours: "8am - 8pm",
    popularDrink: "Cheesecake Matcha Latte"
  },
  {
    id: 2,
    name: "Matcha Haus",
    address: "324 Bathurst St",
    rating: 4.4,
    priceRange: "$",
    lat: 43.6545,
    lng: -79.4057,
    hours: "9am - 7pm",
    popularDrink: "Double Pistachio Matcha Latte"
  },
  {
    id: 3,
    name: "Icha Tea",
    address: "235 Spadina Ave Unit 4",
    rating: 4.5,
    priceRange: "$$",
    lat: 43.6533,
    lng: -79.3970,
    hours: "10am - 9pm",
    popularDrink: "Strawberry Matcha Latte"
  },
  {
    id: 4,
    name: "10 DEAN | Waverley",
    address: "484 Spadina Ave",
    rating: 4.6,
    priceRange: "$",
    lat: 43.6551,
    lng: -79.3998,
    hours: "9am - 6pm",
    popularDrink: "Strawberry Matcha Latte"
  },
  {
    id: 5,
    name: "TonTon Matcha + Coffee",
    address: "100 Western Battery Rd #1",
    rating: 4.6,
    priceRange: "$",
    lat: 43.6379,
    lng: -79.4186,
    hours: "8am - 7pm",
    popularDrink: "Coconut Pandan Matcha Latte"
  },
  {
    id: 6,
    name: "Project Seoul",
    address: "355 Spadina Ave",
    rating: 4.8,
    priceRange: "$$",
    lat: 43.6540,
    lng: -79.3983,
    hours: "11am - 8pm",
    popularDrink: "Mango Matcha Latte"
  },
  {
    id: 7,
    name: "M Chá Bar",
    address: "120 Dundas St W",
    rating: 5.0,
    priceRange: "$$",
    lat: 43.6556,
    lng: -79.3849,
    hours: "10am - 9pm",
    popularDrink: "Matcha Latte"
  },
  {
    id: 8,
    name: "NEO COFFEE BAR",
    address: "770 Bay St Unit 3",
    rating: 4.4,
    priceRange: "$",
    lat: 43.6617,
    lng: -79.3862,
    hours: "7am - 6pm",
    popularDrink: "Matcha Latte"
  },
  {
    id: 9,
    name: "Wu Wei Coffee | 无为",
    address: "44 Kensington Ave Lower Unit",
    rating: 4.6,
    priceRange: "$",
    lat: 43.6545,
    lng: -79.4017,
    hours: "9am - 7pm",
    popularDrink: "Blueberry Matcha Latte"
  },
  {
    id: 10,
    name: "Cotti Coffee",
    address: "374 Yonge St",
    rating: 4.4,
    priceRange: "$",
    lat: 43.6588,
    lng: -79.3817,
    hours: "8am - 10pm",
    popularDrink: "Matcha Coconut Latte"
  },
  {
    id: 11,
    name: "Cafe Forêt",
    address: "153 Dundas St W",
    rating: 4.4,
    priceRange: "$$",
    lat: 43.6555,
    lng: -79.3865,
    hours: "9am - 8pm",
    popularDrink: "Pistachio Cream Matcha Latte"
  }
];

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filterPrice, setFilterPrice] = useState('All');
  const [filterRating, setFilterRating] = useState('All');

  // FILTERS (RATING & PRICE)
  let filteredPlaces = matchaPlaces;

  if (filterPrice !== 'All') {
    filteredPlaces = filteredPlaces.filter(p => p.priceRange === filterPrice);
  }
  if (filterRating !== 'All') {
    if (filterRating === '4.5+') {
      filteredPlaces = filteredPlaces.filter(p => p.rating >= 4.5);
    } else if (filterRating === '4.0+') {
      filteredPlaces = filteredPlaces.filter(p => p.rating >= 4.0 && p.rating < 4.5);
    }
  }

  const torontoCenter = [43.6532, -79.3832];

  // COLOR PALETTE
  const COLORS = {
    headerBg: '#3a5a40',
    headerText: 'white',
    mainBg: '#dad7cd',
    welcomeBg: '#a3b18a',
    cardBg: '#adc178',
    selectedCardBg: '#6a994e',
    accentColor: '#3a5a40',
    textPrimary: '#333',
    textSecondary: '#666'
  };

  //  welcome page
  if (showWelcome) {
    return (
      <div style={{ 
        fontFamily: "'Lora', serif",
        margin: 0, 
        backgroundColor: COLORS.welcomeBg,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '700px', 
          padding: '35px 40px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          textAlign: 'center',
          margin: '20px'
        }}>

          <img 
            src="/logo.png" 
            alt="Matcha Toronto Logo" 
            style={{ 
              maxWidth: '300px',
              height: 'auto',
              marginBottom: '20px'
            }}
          />
          
          <p style={{ 
            fontSize: '18px', 
            color: COLORS.textSecondary, 
            lineHeight: '1.6',
            marginBottom: '25px'
          }}>
            Welcome to Matcha Map! It is a small guide I made to some of the best 
            matcha cafes in Toronto! Explore carefully curated spots through the 
            interactive map, filter by price and rating, and find your next favorite 
            matcha drink!
          </p>

          <button
            onClick={() => setShowWelcome(false)}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: COLORS.accentColor,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(45, 106, 79, 0.3)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 106, 79, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 106, 79, 0.3)';
            }}
          >
            Explore Matcha Spots →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "'Lora', serif",
      margin: 0, 
      backgroundColor: COLORS.mainBg,
      minHeight: '100vh' 
    }}>
      
      {/* HEADER */}
      <div style={{ 
        backgroundColor: COLORS.headerBg,
        color: COLORS.headerText, 
        padding: '30px 20px', 
        textAlign: 'center' 
      }}>
        <img 
          src="/logo.png" 
          alt="Matcha Toronto Logo" 
          style={{ 
            maxWidth: '250px',
            height: 'auto',
            margin: 0
          }}
        />
        <p style={{ margin: '10px 0 0 0', fontSize: '16px' }}>
          Discover the best matcha drinks in Toronto!
        </p>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* FILTER STYLE */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <Filter size={20} color={COLORS.accentColor} />
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Filter Results:</span>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
            
            {/* Price Filter */}
            <div>
              <label style={{ fontSize: '14px', marginRight: '8px', color: COLORS.textSecondary }}>
                Price:
              </label>
              <select 
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: '5px', 
                  border: `2px solid ${COLORS.accentColor}`,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Prices</option>
                <option value="$">$ ($1-$10)</option>
                <option value="$$">$$ ($10-$20)</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label style={{ fontSize: '14px', marginRight: '8px', color: COLORS.textSecondary }}>
                Rating:
              </label>
              <select 
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: '5px', 
                  border: `2px solid ${COLORS.accentColor}`,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Ratings</option>
                <option value="4.5+">4.5+</option>
                <option value="4.0-4.4">4.0+</option>
              </select>
            </div>

            <span style={{ fontSize: '14px', marginLeft: 'auto', backgroundColor: COLORS.accentColor, color: 'white', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
              Showing {filteredPlaces.length} place{filteredPlaces.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* MAP AND LIST*/}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '20px', 
          marginBottom: '20px' 
        }}>
          
          {/* Interactive Map */}
          <div style={{ 
            height: '600px',
            borderRadius: '10px', 
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <MapContainer 
              center={torontoCenter} 
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              
              {filteredPlaces.map(place => (
                <Marker 
                  key={place.id} 
                  position={[place.lat, place.lng]}
                  icon={matchaIcon}
                  eventHandlers={{
                    click: () => setSelectedPlace(place)
                  }}
                >
                  <Popup>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: COLORS.accentColor }}>
                        {place.name}
                      </h3>
                      <div style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                        📍 {place.address}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Places List */}
          <div style={{ 
            height: '600px', 
            overflowY: 'auto',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ 
              margin: '10px 0 20px 10px', 
              color: COLORS.accentColor
            }}>
              All Locations
            </h2>
            {filteredPlaces.map(place => (
              <div 
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                style={{ 
                  backgroundColor: selectedPlace?.id === place.id 
                    ? COLORS.selectedCardBg
                    : COLORS.cardBg,
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  border: selectedPlace?.id === place.id 
                    ? `2px solid ${COLORS.accentColor}` 
                    : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedPlace?.id !== place.id) {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPlace?.id !== place.id) {
                    e.currentTarget.style.backgroundColor = COLORS.cardBg;
                  }
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', color: COLORS.textPrimary }}>
                  {place.name}
                </h3>
                <div style={{ fontSize: '13px', color: COLORS.textSecondary }}>
                  📍 {place.address}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SELECTED PLACE DETAILS */}
        {selectedPlace && (
          <div style={{ 
            backgroundColor: COLORS.accentColor,
            color: 'white', 
            padding: '30px', 
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 15px 0', fontSize: '28px' }}>
                  {selectedPlace.name}
                </h2>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px', 
                  marginBottom: '20px' 
                }}>
                  <div>
                    <strong style={{ fontSize: '14px' }}>📍 Address:</strong>
                    <div style={{ marginTop: '5px' }}>{selectedPlace.address}</div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '14px' }}>🕰️ Hours:</strong>
                    <div style={{ marginTop: '5px' }}>{selectedPlace.hours}</div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '14px' }}>⭐ Rating:</strong>
                    <div style={{ marginTop: '5px' }}>{selectedPlace.rating} / 5.0</div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '14px' }}>💰 Price Range:</strong>
                    <div style={{ marginTop: '5px' }}>{selectedPlace.priceRange}</div>
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: 'rgba(255,255,255,0.15)', 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginTop: '20px'
                }}>
                  <strong style={{ fontSize: '16px' }}>🍵 Popular Drink:</strong>
                  <div style={{ fontSize: '20px', marginTop: '8px', fontWeight: 'bold' }}>
                    {selectedPlace.popularDrink}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedPlace(null)}
                style={{
                  marginLeft: '20px',
                  padding: '10px 20px',
                  backgroundColor: 'white',
                  color: COLORS.accentColor,
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ 
        textAlign: 'center', 
        padding: '30px 20px', 
        color: COLORS.textSecondary,
        borderTop: '1px solid #ddd',
        marginTop: '40px',
        backgroundColor: 'white'
      }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
         Beenish Saeed | 2026
        </p>
      </div>
    </div>
  );
}

export default App;