function rangeSlider(value) {
    //document.querySelector('#rangeValue').innerHTML = value;
    if (value < 35) {
        document.querySelector('#rangeValue').innerHTML = "BASICO";
    } else if ((value >= 35) && (value < 71)) {
        document.querySelector('#rangeValue').innerHTML = "INTERMEDIO";
    } else {
        document.querySelector('#rangeValue').innerHTML = "AVANZADO";
    }
}