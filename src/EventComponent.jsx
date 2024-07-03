import { createSignal, createEffect } from 'solid-js';

const convertToReadableTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const EventComponent = () => {
  const [categories, setCategories] = createSignal([]);
  const [selectedCategory, setSelectedCategory] = createSignal(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        'https://sp-stg-new-api.aws.playco.com/api/v1.1/epg/category/events/92f791cb77094c049feaf5b71c332859-sp?category=live-news,featured,sports,religious,playlist,lifestyle,testing2,svod,avod,svodavod,regression-category,drama,kids,factual,testing,entertainment&ts_start=1719271800&ts_end=1719354600&lang=en&profileType=EV&x-geo-country=AE&pg=18&page=1&limit=500'
      ); // Replace with the correct path or API endpoint
      const jsonData = await response.json();

      if (jsonData.status) {
        // Use a Map to ensure unique categories
        const categoryMap = new Map();

        jsonData.data.forEach((category) => {
          if (!categoryMap.has(category.category)) {
            categoryMap.set(category.category, {
              category: category.category,
              events: category.events
                .map((event) => ({
                  title: event.title,
                  tsStart: convertToReadableTime(event.tsStart),
                  tsEnd: convertToReadableTime(event.tsEnd),
                }))
                .sort((a, b) => a.tsStart - b.tsStart),
            });
          }
        });

        // Convert the Map back to an array
        setCategories([...categoryMap.values()]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  createEffect(() => {
    fetchEvents();
  });

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid #ccc' }}>
        <h2>Categories</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {categories().map((category) => (
            <li
              key={category.category}
              onClick={() => setSelectedCategory(category)}
              style={{
                cursor: 'pointer',
                padding: '0.5rem',
                borderBottom: '1px solid #ccc',
                backgroundColor:
                  selectedCategory()?.category === category.category
                    ? '#eee'
                    : 'transparent',
              }}
            >
              {category.category}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 2, padding: '1rem' }}>
        {selectedCategory() ? (
          <div>
            <h2>{selectedCategory().category}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedCategory().events.map((event) => (
                <div
                  key={event.tsStart}
                  style={{
                    minWidth: '200px',
                    marginBottom: '1rem',
                    marginRight: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <strong>{event.title}</strong>
                  <p>Start: {event.tsStart}</p>
                  <p>End: {event.tsEnd}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Please select a category to view events.</p>
        )}
      </div>
    </div>
  );
};

export default EventComponent;
