package org.pvklee.venues.reservations.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class Reservation {

    @Id
    @NotNull
    private ObjectId _id;
    @NotNull
    private String venue;
    @NotNull
    private Date resDate;
    @NotNull
    private String bookerId;
    @NotNull
    private String bookerEmail;

    public Reservation(ObjectId _id, String venue, String bookerId, String bookerEmail, Date resDate){
        this._id = _id;
        this.venue = venue;
        this.bookerId = bookerId;
        this.bookerEmail = bookerEmail;
        this.resDate = resDate;
    }

    @Override
    public String toString(){
        return String.format(
                "Reservation[_id=%s, venue=%s, bookerId=%s, bookerEmail=%s, resDate=%t",
                _id, venue, bookerId, bookerEmail, resDate
        );
    }

    public String getId() {
        return _id.toHexString();
    }

    public void setId(ObjectId _id) {
        this._id = _id;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public Date getResDate() {
        return resDate;
    }

    public void setResDate(Date resDate) {
        this.resDate = resDate;
    }

    public String getBookerId() {
        return bookerId;
    }

    public void setBookerId(String bookerId) {
        this.bookerId = bookerId;
    }

    public String getBookerEmail() {
        return bookerEmail;
    }

    public void setBookerEmail(String bookerEmail) {
        this.bookerEmail = bookerEmail;
    }
}
