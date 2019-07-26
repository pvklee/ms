package org.pvklee.venues.reservations.models;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;


public class User {
    @Id
    @NotBlank
    private String id;
    @NotBlank
    private String email;

    public User(String id, String email){
        this.id = id;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
