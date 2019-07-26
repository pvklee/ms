package org.pvklee.venues.reservations.controllers;

import org.bson.types.ObjectId;
import org.pvklee.venues.reservations.models.Reservation;
import org.pvklee.venues.reservations.repositories.ReservationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ReservationsController {
    @Autowired
    private ReservationsRepository repository;

    @RequestMapping(value="/", method = RequestMethod.GET)
    public List getAllReservations(){
        return repository.findAll();
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Reservation getReservationById(@PathVariable("id") ObjectId id){
        return repository.findBy_id(id);
    }

    @RequestMapping(value="/", method = RequestMethod.POST)
    public Reservation createReservation(@Valid @RequestBody Reservation reservation){
        reservation.setId(ObjectId.get());
        repository.save(reservation);
        return reservation;
    }
}