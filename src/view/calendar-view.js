import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class CalendarView {
  #config = {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    locale: {
      firstDayOfWeek: 1,
    },
    'time_24hr': true
  };

  constructor ({element,defaultDate,minDate = null,maxDate = null,onClose}) {
    this.#calendar = flatpickr(element, {
      ...this.#config,
      defaultDate,
      minDate,
      maxDate,
      onClose,
    });
  }

  #calendar;

  destroy = () => {
    this.#calendar.destroy();
  };

  set = (dateType, date) => {
    if(dateType === 'minDate' || dateType === 'maxDate'){
      this.#calendar.set(dateType, date);
    }
  };

}
