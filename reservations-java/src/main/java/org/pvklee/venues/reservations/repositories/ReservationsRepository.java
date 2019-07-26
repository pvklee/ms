package org.pvklee.venues.reservations.repositories;

import org.bson.types.ObjectId;
import org.pvklee.venues.reservations.models.Reservation;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReservationsRepository extends MongoRepository<Reservation, String> {
    public Reservation findBy_id(ObjectId _id);
}
