import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../store/eventSlice';
import { RootState, useAppDispatch} from '../store';
import { Event } from '../types/event';

const EventList: React.FC = () => {
  const dispatch = useAppDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    let result = [...events];
    
    if (filterDate) {
      result = result.filter(event => event.date.includes(filterDate));
    }
    if (filterCategory) {
      result = result.filter(event => event.category === filterCategory);
    }
    if (filterLocation) {
      result = result.filter(event => event.location.includes(filterLocation));
    }
    
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return b.popularity - a.popularity;
      }
    });

    setFilteredEvents(result);
  }, [events, filterDate, filterCategory, filterLocation, sortBy]);

  return (
    <div className="container mt-4">
      <h1>Upcoming Events</h1>
      <div className="row mb-3">
        <div className="col">
          <input
            type="date"
            className="form-control"
            placeholder="Filter by date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="popularity">Sort by Popularity</option>
          </select>
        </div>
      </div>
      <Link to="/add-event" className="btn btn-success mb-3">Add New Event</Link>
      <div className="row">
        {filteredEvents.map(event => (
          <div key={event.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.date} - {event.location}</p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
