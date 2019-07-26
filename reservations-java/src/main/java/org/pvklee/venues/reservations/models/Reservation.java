package org.pvklee.venues.reservations.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class Reservation {

    @Id
    private ObjectId _id;
    @NotBlank
    private String venue;
    @NotNull
    private Date resDate;
    @NotNull
    private User currentUser;

    public Reservation(ObjectId _id, String venue, Date resDate, User currentUser){
        this._id = _id;
        this.venue = venue;
        this.resDate = resDate;
        this.currentUser = currentUser;
    }

    @Override
    public String toString(){
        return String.format(
                "Reservation[_id=%s, venue=%s, resDate=%s, currentUserId=%s, currentUserEmail=%s]",
                _id, venue, resDate, currentUser.getId(), currentUser.getEmail()
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

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
    }
}
