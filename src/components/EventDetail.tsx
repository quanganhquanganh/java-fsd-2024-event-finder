import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../store/eventSlice';
import { RootState, useAppDispatch} from '../store';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const event = useSelector((state: RootState) => state.events.currentEvent);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  if (!event) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{event.name}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{event.date}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{event.location}</h6>
          <p className="card-text">{event.description}</p>
          <p className="card-text"><small className="text-muted">Category: {event.category}</small></p>
          <p className="card-text"><small className="text-muted">Popularity: {event.popularity}</small></p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;