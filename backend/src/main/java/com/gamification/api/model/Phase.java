package com.gamification.api.model;

import java.util.List;

public class Phase {
    private int id;
    private String title;
    private String period;
    private String description;
    private List<String> missions;
    private List<String> loots;

    public Phase() {}

    public Phase(int id, String title, String period, String description, List<String> missions, List<String> loots) {
        this.id = id;
        this.title = title;
        this.period = period;
        this.description = description;
        this.missions = missions;
        this.loots = loots;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getMissions() {
        return missions;
    }

    public void setMissions(List<String> missions) {
        this.missions = missions;
    }

    public List<String> getLoots() {
        return loots;
    }

    public void setLoots(List<String> loots) {
        this.loots = loots;
    }
}
