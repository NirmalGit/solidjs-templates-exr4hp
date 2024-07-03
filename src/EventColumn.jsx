import { createSignal } from 'solid-js';
import { convertToReadableTime } from './utils'; // Import your utility function

const EventColumn = (props) => {
  const selectedCategory = props.selectedCategory;
  const [events, setEvents] = createSignal(
    selectedCategory ? selectedCategory.events : []
  );

  return (
    <div>
      <h2>{selectedCategory.category}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {events().map((event) => (
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
  );
};

export default EventColumn; // Correct export as default
