package com.kolak.engineeringproject.model;

import java.util.Objects;

public class SubjectAverages {

    private Double averagesOfRate1;
    private Double averagesOfRate2;
    private Double averagesOfRate3;
    private Double percentageOfFilledSurveys;


    public Double getAveragesOfRate1() {
        return averagesOfRate1;
    }

    public void setAveragesOfRate1(Double averagesOfRate1) {
        this.averagesOfRate1 = averagesOfRate1;
    }

    public Double getAveragesOfRate2() {
        return averagesOfRate2;
    }

    public void setAveragesOfRate2(Double averagesOfRate2) {
        this.averagesOfRate2 = averagesOfRate2;
    }

    public Double getAveragesOfRate3() {
        return averagesOfRate3;
    }

    public void setAveragesOfRate3(Double averagesOfRate3) {
        this.averagesOfRate3 = averagesOfRate3;
    }

    public Double getPercentageOfFilledSurveys() {
        return percentageOfFilledSurveys;
    }

    public void setPercentageOfFilledSurveys(Double percentageOfFilledSurveys) {
        this.percentageOfFilledSurveys = percentageOfFilledSurveys;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubjectAverages that = (SubjectAverages) o;
        return Objects.equals(averagesOfRate1, that.averagesOfRate1) &&
                Objects.equals(averagesOfRate2, that.averagesOfRate2) &&
                Objects.equals(averagesOfRate3, that.averagesOfRate3) &&
                Objects.equals(percentageOfFilledSurveys, that.percentageOfFilledSurveys);
    }

    @Override
    public int hashCode() {
        return Objects.hash(averagesOfRate1, averagesOfRate2, averagesOfRate3, percentageOfFilledSurveys);
    }
}
