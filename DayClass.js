class Day{
    constructor(date, temperature, weather, icon) {
        this.date = new Date(date);
        this.temperature = temperature - 273.15;
        this.weather = weather;
        this.icon = icon;
    }

    getDayDataHtml() {

        var current_date = new Date();
        var date_title;
        
        if(current_date.getDate() === this.date.getDate()) {
            date_title = 'Today';
        } else if (current_date.getDate() + 1 === this.date.getDate()) {
            date_title = 'Tomorrow';
        } else {
            date_title = this.date.getDate() + '-' + this.date.getMonth() + '-' + this.date.getFullYear();
        }
        var html = `<div class="col-md-4 card day ">
                        <p class="fw-semibold text-center mt-2">${date_title}</p>
                        <p class="fw-light">Temperature: ${this.temperature.toFixed(1)}&deg;C</p>
                        <p class="fw-light text-capitalize">Weather: ${this.weather} <img src="https://openweathermap.org/img/wn/${this.icon}@2x.png"/></p>
                    </div>`;
        return html;
    }
}

module.exports = Day;